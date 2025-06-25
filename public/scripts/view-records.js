/* DOM References */
const passwordScreen = document.getElementById('passwordScreen');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const passwordSubmitBtn = document.getElementById('passwordSubmitBtn');

const refreshContainer = document.getElementById('refreshContainer');
const refreshIcon = document.getElementById('refreshIcon');
const activeRecordDiv = document.getElementById('activeRecordDiv');
const historyTitle = document.getElementById('historyTitle');
const historyDiv = document.getElementById('historyDiv');
const mapContainer = document.getElementById('map');

let currentPassword = '';
let map; // Leaflet map instance
let redIcon; // Declare redIcon here

document.addEventListener('DOMContentLoaded', () => {
  // Define redIcon after DOM is ready, ensuring L (Leaflet) should be available
  redIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Try to retrieve password from localStorage on load
  const storedPassword = localStorage.getItem('alanRecordsPassword');
  if (storedPassword) {
    currentPassword = storedPassword;
    console.log('Loaded password from localStorage:', currentPassword ? 'exists' : 'does not exist');
    passwordScreen.classList.add('hidden');
    refreshContainer.classList.remove('hidden');
    fetchActiveRecord(currentPassword);
    fetchHistory(currentPassword);
  } else {
    console.log('No password found in localStorage on load.');
  }

  passwordInput.addEventListener('input', handlePasswordInput);
  passwordInput.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') handleSubmit();
  });
  passwordSubmitBtn.addEventListener('click', handleSubmit);

  refreshIcon.addEventListener('click', handleRefresh);
  attachMapButtonListeners(); // Call new function to attach listeners
});

function attachMapButtonListeners() {
  const mapButtons = document.querySelectorAll('.show-map-btn');
  mapButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const lat = parseFloat(button.dataset.lat);
      const lng = parseFloat(button.dataset.lng);
      showMap(lat, lng);
    });
  });
}

function handlePasswordInput() {
  passwordError.style.display = 'none';
  passwordSubmitBtn.disabled = passwordInput.value.trim() === '';
}

// Called when user clicks "Submit" on password screen
function handleSubmit() {
  const entered = passwordInput.value.trim();
  // 1) Validate + fetch the single active record from /api/fetch-records
  fetch('/api/fetch-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: entered }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Invalid password');
      currentPassword = entered;
      localStorage.setItem('alanRecordsPassword', currentPassword); // Store password
      passwordScreen.classList.add('hidden');
      return response.json();
    })
    .then((data) => {
      // data => single-element array
      showActiveRecord(data);
      refreshContainer.classList.remove('hidden');
      attachMapButtonListeners(); // Re-attach listeners after DOM update

      // 2) Also fetch full history from /fetch-history
      fetchHistory(currentPassword); // This will also call attachMapButtonListeners via showHistory
    })
    .catch(() => {
      showInvalidPassword();
    });
}

function showInvalidPassword() {
  passwordError.style.display = 'block';
  passwordInput.value = '';
  passwordSubmitBtn.disabled = true;
  setTimeout(() => {
    passwordError.style.display = 'none';
  }, 3000);
}

function handleRefresh() {
  if (!currentPassword) {
    alert('No valid password found.');
    return;
  }
  // Re-fetch single active record
  fetchActiveRecord(currentPassword);
  // Re-fetch entire history
  fetchHistory(currentPassword);
}

function fetchActiveRecord(password) {
  fetch('/api/fetch-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Invalid password');
      return response.json();
    })
    .then((data) => {
      showActiveRecord(data);
      attachMapButtonListeners(); // Re-attach listeners after DOM update
    })
    .catch((err) => {
      console.error('Error fetching single record:', err);
    });
}

function fetchHistory(password) {
  fetch('/api/fetch-history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Invalid password');
      return response.json();
    })
    .then((data) => {
      showHistory(data);
      attachMapButtonListeners(); // Re-attach listeners after DOM update
    })
    .catch((err) => {
      console.error('Error fetching history:', err);
    });
}

// Display the single active record
function showActiveRecord(data) {
  if (!Array.isArray(data) || data.length === 0) {
    activeRecordDiv.innerHTML = '<p>No active record found.</p>';
    return;
  }
  const record = data[0];

  // Build the single-record table with a red border row
  activeRecordDiv.innerHTML = `
  <table class="records-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>Session ID</th>
        <th>Name</th>
        <th>Aims</th>
        <th>Experience</th>
        <th>Contact</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Country (ISO2) [Classification]</th>
        <th>Area</th>
        <th>Date & Time</th>
        <th>Version & Agent</th>
        <th>Refresh Count</th>
        <th>Map</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr class="active-record">
        <td>1</td>
        <td>${record.sessionId || ''}</td>
        <td>${record.name || ''}</td>
        <td>${record.role || ''}</td>
        <td>${record.experience || ''}</td>
        <td>${record.contactInfo || ''}</td>
        <td>${record.latitude || ''}</td>
        <td>${record.longitude || ''}</td>
        <td>
          ${record.country || ''} (${record.iso2 || ''})
          [${record.classification || ''}]
        </td>
        <td>${record.area || ''}</td>
        <td>${record.dateTime || ''}</td>
        <td>${record.version || ''}, ${record.selectedAgent || ''}</td>
        <td>${record.refreshCount || 1}</td>
        <td>
          <button class="show-map-btn" data-lat="${parseFloat(record.latitude) || 0}" data-lng="${parseFloat(record.longitude) || 0}" style="display: flex; justify-content: center; align-items: center; padding: 5px 10px; min-width: 80px;">
            Show Map
          </button>
        </td>
        <td>
          <button class="delete-record-btn" data-session-id="${record.sessionId}" style="display: flex; justify-content: center; align-items: center; padding: 5px 10px; color: #ff0000; font-size: 20px; min-width: 40px;">
            &#x1F5D1; <!-- Bin/Trash Can Icon -->
          </button>
        </td>
      </tr>
    </tbody>
  </table>
`;
}

// Display the full history array
function showHistory(historyArray) {
  if (!Array.isArray(historyArray) || historyArray.length === 0) {
    historyTitle.style.display = 'none';
    historyDiv.innerHTML = '<p>No historical records found.</p>';
    return;
  }

  // Show the heading
  historyTitle.style.display = 'block';

  // Build a table listing all records from user-history.json
  let html = `
  <table class="records-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>Session ID</th>
        <th>Name</th>
        <th>Aims</th>
        <th>Experience</th>
        <th>Contact</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Country (ISO2) [Classification]</th>
        <th>Area</th>
        <th>Date & Time</th>
        <th>Version & Agent</th>
        <th>Refresh Count</th>
        <th>Map</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
`;

  historyArray.forEach((rec, idx) => {
    html += `
    <tr>
      <td>${idx + 1}</td>
      <td>${rec.sessionId || ''}</td>
      <td>${rec.name || ''}</td>
      <td>${rec.role || ''}</td>
      <td>${rec.experience || ''}</td>
      <td>${rec.contactInfo || ''}</td>
      <td>${rec.latitude || ''}</td>
      <td>${rec.longitude || ''}</td>
      <td>
        ${rec.country || ''} (${rec.iso2 || ''})
        [${rec.classification || ''}]
      </td>
      <td>${rec.area || ''}</td>
      <td>${rec.dateTime || ''}</td>
      <td>${rec.version || ''}, ${rec.selectedAgent || ''}</td>
        <td>${rec.refreshCount || 1}</td>
        <td>
          <button class="show-map-btn" data-lat="${parseFloat(rec.latitude) || 0}" data-lng="${parseFloat(rec.longitude) || 0}" style="display: flex; justify-content: center; align-items: center; padding: 5px 10px; min-width: 80px;">
            Show Map
          </button>
        </td>
        <td>
          <button class="delete-record-btn" data-session-id="${rec.sessionId}" style="display: flex; justify-content: center; align-items: center; padding: 5px 10px; color: #ff0000; font-size: 20px; min-width: 40px;">
            &#x1F5D1; <!-- Bin/Trash Can Icon -->
          </button>
        </td>
      </tr>
  `;
  });

  html += '</tbody></table>';
  historyDiv.innerHTML = html;
  attachDeleteButtonListeners(); // Attach listeners after history is rendered
}

function attachDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll('.delete-record-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const sessionIdToDelete = button.dataset.sessionId;
      if (confirm(`Are you sure you want to delete record with Session ID: ${sessionIdToDelete}?`)) {
        try {
          console.log('Attempting to delete record. currentPassword:', currentPassword ? 'exists' : 'does not exist');
          console.log('Sending Authorization header:', `Bearer ${currentPassword}`);
          const response = await fetch('/api/delete-record', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: sessionIdToDelete, password: currentPassword }), // Send password in body
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Delete response not OK:', response.status, errorText);
            throw new Error(`Failed to delete record: ${errorText}`);
          }

          alert('Record deleted successfully!');
          handleRefresh(); // Refresh records after deletion
        } catch (error) {
          console.error('Error deleting record:', error);
          alert(`Error deleting record: ${error.message}`);
        }
      }
    });
  });
}

function showMap(lat, lng) {
  mapContainer.style.display = 'block';
  mapContainer.innerHTML = '';
  if (map) map.remove();

  map = L.map('map').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  L.marker([lat, lng], { icon: redIcon }).addTo(map);
}
