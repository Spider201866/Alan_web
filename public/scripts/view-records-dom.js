// Alan UI - view-records-dom.js | 14th January 2026, WJW
/**
 * DOM factory helpers for the View Records page.
 *
 * This file exists so that the DOM-building logic can be tested directly
 * (without eval'ing the full page script).
 */

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

/**
 * Renders a standard message in a container.
 * @param {HTMLElement} container - The container element.
 * @param {string} text - The message to display.
 */
export function renderEmptyMessage(container, text) {
  container.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = text;
  container.appendChild(p);
}

/**
 * Creates and returns the table header element.
 * @returns {HTMLTableSectionElement} The fully constructed thead element.
 */
export function createRecordsTableHeader() {
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = [
    'No.',
    'Session ID',
    'Name',
    'Interests',
    'Experience',
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
 * @typedef {object} RecordRowHandlers
 * @property {(event: MouseEvent) => void} [onShowMapClick]
 * @property {(event: MouseEvent) => void} [onDeleteClick]
 */

/**
 * Creates and returns a table row element for a given record.
 * @param {Record} record - The record object.
 * @param {number} index - The display index of the record.
 * @param {boolean} [isActive=false] - Whether the record is the active one.
 * @param {RecordRowHandlers} [handlers]
 * @returns {HTMLTableRowElement} The fully constructed tr element.
 */
export function createRecordRow(record, index, isActive = false, handlers = {}) {
  const tr = document.createElement('tr');
  if (isActive) {
    tr.classList.add('active-record');
  }

  const version = (record.version || '').trim();
  const agent = (record.selectedAgent || '').trim();
  const versionAgentText = version && agent ? `${version} ${agent}` : version || agent || '';

  const cells = [
    index,
    record.sessionId,
    record.name,
    record.role,
    record.experience,
    record.latitude,
    record.longitude,
    `${record.country || ''} (${record.iso2 || ''}) [${record.classification || ''}]`,
    record.area,
    record.dateTime,
    versionAgentText,
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

  const lat = parseFloat(record.latitude);
  const lng = parseFloat(record.longitude);
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);

  mapButton.className = 'show-map-btn';
  mapButton.textContent = hasCoords ? 'Show Map' : 'No location';
  if (hasCoords) {
    mapButton.dataset.lat = String(lat);
    mapButton.dataset.lng = String(lng);
    mapButton.setAttribute('aria-label', `Show map for record ${record.sessionId}`);
  } else {
    mapButton.disabled = true;
    mapButton.setAttribute('aria-label', `No location available for record ${record.sessionId}`);
  }
  mapButton.style.cssText =
    'display: flex; justify-content: center; align-items: center; padding: 5px 10px; min-width: 80px;';
  mapButton.addEventListener('click', handlers.onShowMapClick || (() => {}));
  mapTd.appendChild(mapButton);
  tr.appendChild(mapTd);

  // Delete button cell
  const deleteTd = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-record-btn';
  deleteButton.textContent = '🗑'; // Bin/Trash Can Icon
  deleteButton.dataset.sessionId = record.sessionId;
  deleteButton.setAttribute('aria-label', `Delete record with session ID ${record.sessionId}`);
  deleteButton.style.cssText =
    'display: flex; justify-content: center; align-items: center; padding: 5px 10px; color: #ff0000; font-size: 20px; min-width: 40px;';
  deleteButton.addEventListener('click', handlers.onDeleteClick || (() => {}));
  deleteTd.appendChild(deleteButton);
  tr.appendChild(deleteTd);

  return tr;
}
