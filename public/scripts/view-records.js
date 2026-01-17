// Alan UI - view-records.js | 14th January 2026, WJW
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

import {
  createRecordRow,
  createRecordsTableHeader,
  renderEmptyMessage,
} from './view-records-dom.js';
import { getCsrfToken, withCsrfHeaders } from './csrf.js';

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

let map; // Leaflet map instance

async function ensureCsrfToken() {
  // Only needed when ENABLE_CSRF=true on the server.
  // Safe to call regardless; if CSRF is disabled, this returns null.
  const existingToken = getCsrfToken();
  if (existingToken) return existingToken;

  const resp = await fetch('/api/admin/csrf', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (resp.status === 401) throw new Error('AUTH_REQUIRED');
  if (!resp.ok) return null;

  const data = await resp.json().catch(() => ({}));
  return data?.csrfToken || getCsrfToken() || null;
}

async function adminFetch(url, options = {}) {
  let headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Add CSRF token if server requires it.
  try {
    await ensureCsrfToken();
    headers = withCsrfHeaders(headers);
  } catch (err) {
    if (err?.message === 'AUTH_REQUIRED') throw err;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

async function adminLogin(password) {
  const resp = await fetch('/api/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });

  if (!resp.ok) throw new Error('Invalid password');
  return resp.json().catch(() => ({}));
}

async function adminFetchActiveRecord() {
  const resp = await adminFetch('/api/admin/fetch-records', {
    method: 'POST',
  });
  if (resp.status === 401) throw new Error('AUTH_REQUIRED');
  if (!resp.ok) throw new Error('FETCH_ACTIVE_FAILED');
  return resp.json();
}

async function adminFetchHistory() {
  const resp = await adminFetch('/api/admin/fetch-history', {
    method: 'POST',
  });
  if (resp.status === 401) throw new Error('AUTH_REQUIRED');
  if (!resp.ok) throw new Error('FETCH_HISTORY_FAILED');
  return resp.json();
}

async function adminDeleteRecord(sessionId) {
  const resp = await adminFetch('/api/admin/delete-record', {
    method: 'DELETE',
    body: JSON.stringify({ sessionId }),
  });
  if (resp.status === 401) throw new Error('AUTH_REQUIRED');
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(text || 'DELETE_FAILED');
  }
}

function resetToPasswordScreen({ showError = false } = {}) {
  passwordScreen.classList.remove('hidden');
  refreshContainer.classList.add('hidden');

  historyTitle.style.display = 'none';
  activeRecordDiv.innerHTML = '';
  historyDiv.innerHTML = '';

  if (map) {
    try {
      map.remove();
    } catch {
      // no-op
    }
    map = undefined;
  }

  mapContainer.style.display = 'none';
  mapContainer.innerHTML = '';

  if (showError) {
    passwordError.style.display = 'block';
    setTimeout(() => {
      passwordError.style.display = 'none';
    }, 3000);
  }
}

function handlePasswordInput() {
  passwordError.style.display = 'none';
  passwordSubmitBtn.disabled = passwordInput.value.trim() === '';
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
  adminFetchActiveRecord()
    .then(showActiveRecord)
    .catch((err) => {
      console.error('Error fetching active record:', err);
      if (err?.message === 'AUTH_REQUIRED') {
        resetToPasswordScreen({ showError: true });
        return;
      }
      renderEmptyMessage(activeRecordDiv, 'Error fetching active record.');
    });

  adminFetchHistory()
    .then(showHistory)
    .catch((err) => {
      console.error('Error fetching history:', err);
      if (err?.message === 'AUTH_REQUIRED') {
        resetToPasswordScreen({ showError: true });
        return;
      }
      renderEmptyMessage(historyDiv, 'Error fetching history.');
    });
}

function handleSubmit() {
  const entered = passwordInput.value.trim();
  adminLogin(entered)
    .then(() => {
      passwordScreen.classList.add('hidden');
      refreshContainer.classList.remove('hidden');
      handleRefresh();
    })
    .catch(() => showInvalidPassword());
}

// --- Event Handlers ---

/**
 * Handles the click event for the 'Show Map' button.
 * @param {MouseEvent} event - The click event.
 */
function handleShowMapClick(event) {
  const button = event.currentTarget;
  const lat = parseFloat(button.dataset.lat);
  const lng = parseFloat(button.dataset.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    alert('No location available for this record.');
    return;
  }
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
      await adminDeleteRecord(sessionIdToDelete);
      alert('Record deleted successfully!');
      handleRefresh();
    } catch (error) {
      console.error('Error deleting record:', error);
      if (error?.message === 'AUTH_REQUIRED') {
        resetToPasswordScreen({ showError: true });
        return;
      }
      alert(`Error deleting record: ${error.message}`);
    }
  }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  passwordInput.addEventListener('input', handlePasswordInput);

  const passwordForm = document.getElementById('passwordForm');
  if (passwordForm) {
    passwordForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleSubmit();
    });
  }

  refreshIcon.addEventListener('click', handleRefresh);
});

// --- DOM Rendering Factories ---

/**
 * Renders the single active record into its designated table.
 * @param {Array<Record>} data - An array containing the single active record.
 */
function showActiveRecord(data) {
  activeRecordDiv.innerHTML = '';
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
    const row = createRecordRow(record, 1, true, {
      onShowMapClick: handleShowMapClick,
      onDeleteClick: handleDeleteClick,
    });

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
  historyDiv.innerHTML = '';
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
      const row = createRecordRow(rec, idx + 1, false, {
        onShowMapClick: handleShowMapClick,
        onDeleteClick: handleDeleteClick,
      });
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
  mapContainer.style.position = 'relative';
  if (map) map.remove();

  map = L.map('map').setView([lat, lng], 13);

  const showTileErrorOverlay = (text) => {
    const existing = mapContainer.querySelector('[data-map-error="1"]');
    if (existing) {
      existing.textContent = text;
      return;
    }

    const msg = document.createElement('div');
    msg.dataset.mapError = '1';
    msg.textContent = text;
    msg.style.cssText =
      'position:absolute;left:10px;right:10px;top:10px;z-index:10000;background:#fff;border:2px solid #f00;padding:8px;border-radius:8px;font-size:14px;white-space:pre-wrap;';
    mapContainer.appendChild(msg);
  };

  const createTileLayer = (template) =>
    L.tileLayer(template, {
      attribution: '&copy; OpenStreetMap contributors',
    });

  // Prefer same-origin tiles to avoid CSP / CORS / extension blockers.
  const primaryTemplate = '/osm-tiles/{z}/{x}/{y}.png';
  const fallbackTemplate = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

  let usingFallback = false;
  let tileLayer = createTileLayer(primaryTemplate).addTo(map);

  const attachTileErrorHandler = (layer) => {
    layer.on('tileerror', (err) => {
      const failingUrl = err?.tile?.src ? `\n${err.tile.src}` : '';
      console.error('Map tile failed to load:', err);

      if (!usingFallback) {
        usingFallback = true;
        try {
          map.removeLayer(layer);
        } catch {
          // no-op
        }
        tileLayer = createTileLayer(fallbackTemplate).addTo(map);
        attachTileErrorHandler(tileLayer);
        showTileErrorOverlay(
          `Primary map tiles failed to load. Trying backup server...${failingUrl}`
        );
        return;
      }

      showTileErrorOverlay(`Map tiles failed to load. Please check network/CSP.${failingUrl}`);
    });
  };

  attachTileErrorHandler(tileLayer);

  // Use a circle marker to avoid external icon image dependencies.
  L.circleMarker([lat, lng], {
    radius: 8,
    color: '#ff0000',
    fillColor: '#ff0000',
    fillOpacity: 0.9,
  }).addTo(map);

  setTimeout(() => {
    try {
      map.invalidateSize();
      mapContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      // no-op
    }
  }, 50);
}
