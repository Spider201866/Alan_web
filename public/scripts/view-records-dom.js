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

  cells.forEach((cellData, i) => {
    const td = document.createElement('td');
    // The dateTime field is at index 10
    if (i === 10) {
      td.innerHTML = cellData || '';
    } else {
      td.textContent = cellData || '';
    }
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
  mapButton.addEventListener('click', handlers.onShowMapClick || (() => {}));
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
  deleteButton.addEventListener('click', handlers.onDeleteClick || (() => {}));
  deleteTd.appendChild(deleteButton);
  tr.appendChild(deleteTd);

  return tr;
}
