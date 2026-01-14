/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeAll } from '@jest/globals';

import {
  createRecordRow,
  createRecordsTableHeader,
  renderEmptyMessage,
} from '../../public/scripts/view-records-dom.js';

describe('View Records Script DOM Factories', () => {
  beforeAll(() => {
    // Set up a basic DOM structure for renderEmptyMessage to target.
    document.body.innerHTML = `<div id="activeRecordDiv"></div>`;
  });

  describe('createRecordsTableHeader', () => {
    it('should create a THEAD element with the correct headers', () => {
      const thead = createRecordsTableHeader();
      expect(thead.tagName).toBe('THEAD');
      const headers = thead.querySelectorAll('th');
      expect(headers.length).toBe(14);
      expect(headers[0].textContent).toBe('No.');
      expect(headers[13].textContent).toBe('Delete');
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
      expect(cells.length).toBe(14);
      expect(cells[0].textContent).toBe('1');
      expect(cells[1].textContent).toBe('sess_123');
      // Test a cell to ensure HTML is not rendered
      const maliciousRecord = { ...mockRecord, name: '<h1>Malicious</h1>' };
      const maliciousTr = createRecordRow(maliciousRecord, 1);
      const maliciousCell = maliciousTr.querySelectorAll('td')[2];
      expect(maliciousCell.textContent).toBe('<h1>Malicious</h1>');
      // textContent results in the same literal string in innerHTML, but it should not
      // create real HTML elements.
      expect(maliciousCell.querySelector('h1')).toBeNull();
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

    it('should render Version & Agent without comma or trailing punctuation', () => {
      const tr = createRecordRow(mockRecord, 1);
      const cells = tr.querySelectorAll('td');
      // Version & Agent column is the 11th cell (0-based index 10)
      expect(cells[10].textContent).toBe('1.0.0 Agent1');

      const versionOnly = createRecordRow({ ...mockRecord, selectedAgent: '' }, 1);
      expect(versionOnly.querySelectorAll('td')[10].textContent).toBe('1.0.0');
    });

    it('should disable Show Map when coordinates are missing or 0,0', () => {
      const noCoords = createRecordRow({ ...mockRecord, latitude: null, longitude: null }, 1);
      const noCoordsBtn = noCoords.querySelector('.show-map-btn');
      expect(noCoordsBtn.disabled).toBe(true);
      expect(noCoordsBtn.textContent).toBe('No location');

      const zeroCoords = createRecordRow({ ...mockRecord, latitude: 0, longitude: 0 }, 1);
      const zeroCoordsBtn = zeroCoords.querySelector('.show-map-btn');
      expect(zeroCoordsBtn.disabled).toBe(true);
      expect(zeroCoordsBtn.textContent).toBe('No location');
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
