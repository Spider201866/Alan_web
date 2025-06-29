/**
 * @jest-environment jsdom
 */

import { jest, describe, it, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock Leaflet
global.L = {
  Icon: jest.fn(() => ({})),
};

// Load the script content to be tested
const scriptPath = path.resolve(__dirname, '../../public/scripts/view-records.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

describe('View Records Script DOM Factories', () => {
  let createRecordsTableHeader, createRecordRow, renderEmptyMessage;

  beforeAll(() => {
    // Set up a basic DOM structure that the script expects
    document.body.innerHTML = `
      <div id="passwordScreen"></div>
      <div id="activeRecordDiv"></div>
      <div id="historyDiv"></div>
      <div id="historyTitle"></div>
      <div id="map"></div>
    `;

    // Evaluate the script within the JSDOM environment.
    const scriptToEval = `
      ${scriptContent}
      window.createRecordsTableHeader = createRecordsTableHeader;
      window.createRecordRow = createRecordRow;
      window.renderEmptyMessage = renderEmptyMessage;
    `;
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptToEval;
    document.body.appendChild(scriptEl);

    // Assign the functions from the window to local variables
    createRecordsTableHeader = window.createRecordsTableHeader;
    createRecordRow = window.createRecordRow;
    renderEmptyMessage = window.renderEmptyMessage;
  });

  describe('createRecordsTableHeader', () => {
    it('should create a THEAD element with the correct headers', () => {
      const thead = createRecordsTableHeader();
      expect(thead.tagName).toBe('THEAD');
      const headers = thead.querySelectorAll('th');
      expect(headers.length).toBe(15);
      expect(headers[0].textContent).toBe('No.');
      expect(headers[14].textContent).toBe('Delete');
      headers.forEach((th) => {
        expect(th.getAttribute('scope')).toBe('col');
      });
    });
  });

  describe('createRecordRow', () => {
    const mockRecord = {
      sessionId: 'sess_123',
      name: 'Test User',
      role: 'Tester',
      experience: 'Good',
      contactInfo: 'test@example.com',
      latitude: 40.7128,
      longitude: -74.006,
      country: 'United States',
      iso2: 'US',
      classification: 'High-income',
      area: 'New York',
      dateTime: '2025-06-29 10:00:00',
      version: '1.0.0',
      selectedAgent: 'Agent1',
      refreshCount: 2,
    };

    it('should create a TR element with the correct data using textContent', () => {
      const tr = createRecordRow(mockRecord, 1);
      const cells = tr.querySelectorAll('td');
      expect(cells.length).toBe(15);
      expect(cells[0].textContent).toBe('1');
      expect(cells[1].textContent).toBe('sess_123');
      // Test a cell to ensure HTML is not rendered
      const maliciousRecord = { ...mockRecord, name: '<h1>Malicious</h1>' };
      const maliciousTr = createRecordRow(maliciousRecord, 1);
      const maliciousCell = maliciousTr.querySelectorAll('td')[2];
      expect(maliciousCell.textContent).toBe('<h1>Malicious</h1>');
      expect(maliciousCell.innerHTML).not.toContain('<h1>');
    });

    it('should add the active-record class if isActive is true', () => {
      const tr = createRecordRow(mockRecord, 1, true);
      expect(tr.classList.contains('active-record')).toBe(true);
    });

    it('should create buttons with correct dataset and ARIA labels', () => {
      const tr = createRecordRow(mockRecord, 1);
      const mapButton = tr.querySelector('.show-map-btn');
      const deleteButton = tr.querySelector('.delete-record-btn');

      expect(mapButton).not.toBeNull();
      expect(mapButton.dataset.lat).toBe('40.7128');
      expect(mapButton.dataset.lng).toBe('-74.006');
      expect(mapButton.getAttribute('aria-label')).toBe('Show map for record sess_123');

      expect(deleteButton).not.toBeNull();
      expect(deleteButton.dataset.sessionId).toBe('sess_123');
      expect(deleteButton.getAttribute('aria-label')).toBe(
        'Delete record with session ID sess_123'
      );
    });
  });

  describe('renderEmptyMessage', () => {
    it('should clear the container and render a paragraph with the message', () => {
      const container = document.getElementById('activeRecordDiv');
      container.innerHTML = '<span>Old content</span>';
      renderEmptyMessage(container, 'Test message');
      expect(container.innerHTML).toBe('<p>Test message</p>');
      const p = container.querySelector('p');
      expect(p.textContent).toBe('Test message');
    });
  });
});
