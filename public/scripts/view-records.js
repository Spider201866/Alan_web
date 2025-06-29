/**
 * @typedef {object} Record
 * @property {string} sessionId - The unique session identifier.
 * @property {string} [name] - The user's name.
 * @property {string} [role] - The user's stated aims or role.
 * @property {string} [experience] - The user's described experience.
 * @property {string} [contactInfo] - The user's contact information.
 * @property {number} [latitude] - The user's latitude.
 * @property {number} [longitude] - The user's longitude.
 * @property {string} [country] - The user's country name.
 * @property {string} [iso2] - The user's country ISO2 code.
 * @property {string} [classification] - The income classification of the country.
 * @property {string} [area] - The geographical area.
 * @property {string} [dateTime] - The timestamp of the record.
 * @property {string} [version] - The application version.
 * @property {string} [selectedAgent] - The agent used for the session.
 * @property {number} [refreshCount] - The number of times the record has been refreshed.
 */

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

// --- Event Handlers ---

/**
 * Handles the click event for the 'Show Map' button.
 * @param {MouseEvent} event - The click event.
 */
function handleShowMapClick(event) {
  const button = event.currentTarget;
  const lat = parseFloat(button.dataset.lat);
  const lng = parseFloat(button.dataset.lng);
  showMap(lat, lng);
}

/**
 * Handles the click event for the 'Delete' button.
 * @param {MouseEvent} event - The click event.
 */
async function handleDeleteClick(event) {
  const button = event.currentTarget;
  const sessionIdToDelete = button.dataset.sessionId;
  if (confirm(`Are you sure you want to delete record with Session ID: ${sessionIdToDelete}?`)) {
    try {
      const response = await fetch('/api/delete-record', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: sessionIdToDelete, password: currentPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete record: ${errorText}`);
      }

      alert('Record deleted successfully!');
      handleRefresh(); // Refresh records after deletion
    } catch (error) {
      console.error('Error deleting record:', error);
      alert(`Error deleting record: ${error.message}`);
    }
  }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  // Define redIcon after DOM is ready
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

  const storedPassword = localStorage.getItem('alanRecordsPassword');
  if (storedPassword) {
    currentPassword = storedPassword;
    passwordScreen.classList.add('hidden');
    refreshContainer.classList.remove('hidden');
    fetchActiveRecord(currentPassword);
    fetchHistory(currentPassword);
  }

  passwordInput.addEventListener('input', handlePasswordInput);
  passwordInput.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') handleSubmit();
  });
  passwordSubmitBtn.addEventListener('click', handleSubmit);
  refreshIcon.addEventListener('click', handleRefresh);
});

// --- Core Logic ---

function handlePasswordInput() {
  passwordError.style.display = 'none';
  passwordSubmitBtn.disabled = passwordInput.value.trim() === '';
}

function handleSubmit() {
  const entered = passwordInput.value.trim();
  fetch('/api/fetch-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: entered }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Invalid password');
      currentPassword = entered;
      localStorage.setItem('alanRecordsPassword', currentPassword);
      passwordScreen.classList.add('hidden');
      refreshContainer.classList.remove('hidden');
      return response.json();
    })
    .then((data) => {
      showActiveRecord(data);
      fetchHistory(currentPassword);
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
  fetchActiveRecord(currentPassword);
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
    .then(showActiveRecord)
    .catch((err) => {
      console.error('Error fetching single record:', err);
      renderEmptyMessage(activeRecordDiv, 'Error fetching active record.');
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
    .then(showHistory)
    .catch((err) => {
      console.error('Error fetching history:', err);
      renderEmptyMessage(historyDiv, 'Error fetching history.');
    });
}

// --- DOM Rendering Factories ---

/**
 * Renders a standard message in a container.
 * @param {HTMLElement} container - The container element.
 * @param {string} text - The message to display.
 */
function renderEmptyMessage(container, text) {
  container.innerHTML = ''; // Clear previous content
  const p = document.createElement('p');
  p.textContent = text;
  container.appendChild(p);
}

/**
 * Creates and returns the table header element.
 * @returns {HTMLTableSectionElement} The fully constructed thead element.
 */
function createRecordsTableHeader() {
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = [
    'No.',
    'Session ID',
    'Name',
    'Aims',
    'Experience',
    'Contact',
    'Latitude',
    'Longitude',
    'Country (ISO2) [Classification]',
    'Area',
    'Date & Time',
    'Version & Agent',
    'Refresh Count',
    'Map',
    'Delete',
  ];

  headers.forEach((text) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  return thead;
}

/**
 * Creates and returns a table row element for a given record.
 * @param {Record} record - The record object.
 * @param {number} index - The display index of the record.
 * @param {boolean} [isActive=false] - Whether the record is the active one.
 * @returns {HTMLTableRowElement} The fully constructed tr element.
 */
function createRecordRow(record, index, isActive = false) {
  const tr = document.createElement('tr');
  if (isActive) {
    tr.classList.add('active-record');
  }

  const cells = [
    index,
    record.sessionId,
    record.name,
    record.role,
    record.experience,
    record.contactInfo,
    record.latitude,
    record.longitude,
    `${record.country || ''} (${record.iso2 || ''}) [${record.classification || ''}]`,
    record.area,
    record.dateTime,
    `${record.version || ''}, ${record.selectedAgent || ''}`,
    record.refreshCount || 1,
  ];

  cells.forEach((cellData) => {
    const td = document.createElement('td');
    td.textContent = cellData || '';
    tr.appendChild(td);
  });

  // Map button cell
  const mapTd = document.createElement('td');
  const mapButton = document.createElement('button');
  mapButton.className = 'show-map-btn';
  mapButton.textContent = 'Show Map';
  mapButton.dataset.lat = parseFloat(record.latitude) || 0;
  mapButton.dataset.lng = parseFloat(record.longitude) || 0;
  mapButton.setAttribute('aria-label', `Show map for record ${record.sessionId}`);
  mapButton.style.cssText =
    'display: flex; justify-content: center; align-items: center; padding: 5px 10px; min-width: 80px;';
  mapButton.addEventListener('click', handleShowMapClick);
  mapTd.appendChild(mapButton);
  tr.appendChild(mapTd);

  // Delete button cell
  const deleteTd = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-record-btn';
  deleteButton.innerHTML = '&#x1F5D1;'; // Bin/Trash Can Icon
  deleteButton.dataset.sessionId = record.sessionId;
  deleteButton.setAttribute('aria-label', `Delete record with session ID ${record.sessionId}`);
  deleteButton.style.cssText =
    'display: flex; justify-content: center; align-items: center; padding: 5px 10px; color: #ff0000; font-size: 20px; min-width: 40px;';
  deleteButton.addEventListener('click', handleDeleteClick);
  deleteTd.appendChild(deleteButton);
  tr.appendChild(deleteTd);

  return tr;
}

/**
 * Renders the single active record into its designated table.
 * @param {Array<Record>} data - An array containing the single active record.
 */
function showActiveRecord(data) {
  activeRecordDiv.innerHTML = ''; // Clear previous content
  try {
    if (!Array.isArray(data) || data.length === 0) {
      renderEmptyMessage(activeRecordDiv, 'No active record found.');
      return;
    }
    const record = data[0];
    const table = document.createElement('table');
    table.className = 'records-table';
    table.setAttribute('role', 'table');

    const tbody = document.createElement('tbody');
    const row = createRecordRow(record, 1, true);

    table.appendChild(createRecordsTableHeader());
    tbody.appendChild(row);
    table.appendChild(tbody);
    activeRecordDiv.appendChild(table);
  } catch (error) {
    console.error('Failed to render active record:', error);
    renderEmptyMessage(activeRecordDiv, 'Could not display active record due to an error.');
  }
}

/**
 * Renders the full history of records into its designated table.
 * @param {Array<Record>} historyArray - An array of all historical records.
 */
function showHistory(historyArray) {
  historyDiv.innerHTML = ''; // Clear previous content
  try {
    if (!Array.isArray(historyArray) || historyArray.length === 0) {
      historyTitle.style.display = 'none';
      renderEmptyMessage(historyDiv, 'No historical records found.');
      return;
    }

    historyTitle.style.display = 'block';
    const table = document.createElement('table');
    table.className = 'records-table';
    table.setAttribute('role', 'table');
    const tbody = document.createElement('tbody');
    const fragment = document.createDocumentFragment();

    historyArray.forEach((rec, idx) => {
      const row = createRecordRow(rec, idx + 1);
      fragment.appendChild(row);
    });

    table.appendChild(createRecordsTableHeader());
    tbody.appendChild(fragment);
    table.appendChild(tbody);
    historyDiv.appendChild(table);
  } catch (error) {
    console.error('Failed to render history:', error);
    historyTitle.style.display = 'block';
    renderEmptyMessage(historyDiv, 'Could not display history due to an error.');
  }
}

/**
 * Displays a Leaflet map with a marker at the specified coordinates.
 * @param {number} lat - The latitude for the map marker.
 * @param {number} lng - The longitude for the map marker.
 */
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
