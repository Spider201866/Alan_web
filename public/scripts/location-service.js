// Alan UI - location-service.js | 14th January 2026, WJW
// public/scripts/location-service.js
// Fetches IP-based location and determines user classification.

import log from './log.js';
const classificationLookup = {
  HI: [
    'QA',
    'MO',
    'LU',
    'SG',
    'BN',
    'IE',
    'NO',
    'KW',
    'AE',
    'CH',
    'HK',
    'SM',
    'US',
    'SA',
    'NL',
    'IS',
    'BH',
    'SE',
    'DE',
    'AU',
    'TW',
    'DK',
    'AT',
    'CA',
    'BE',
    'OM',
    'FI',
    'GB',
    'FR',
    'JP',
    'MT',
    'KR',
    'NZ',
    'ES',
    'IT',
    'PR',
    'CY',
    'IL',
    'CZ',
  ],
  MI: [
    'GQ',
    'SI',
    'SK',
    'LT',
    'EE',
    'TT',
    'PT',
    'PL',
    'HU',
    'MY',
    'SC',
    'RU',
    'GR',
    'LV',
    'KN',
    'AG',
    'TR',
    'KZ',
    'BS',
    'CL',
    'PA',
    'HR',
    'RO',
    'UY',
    'MU',
    'BG',
    'AR',
    'IR',
    'MX',
    'LB',
    'GA',
    'MV',
    'TM',
    'BY',
    'BW',
    'TH',
    'CN',
    'BR',
    'ZA',
    'IN',
  ],
  LI: [
    'BB',
    'ME',
    'AZ',
    'CR',
    'IQ',
    'DO',
    'PW',
    'MK',
    'RS',
    'DZ',
    'GD',
    'CO',
    'SR',
    'LC',
    'PE',
    'LK',
    'EG',
    'MN',
    'JO',
    'AL',
    'VE',
    'ID',
    'DM',
    'XK',
    'NR',
    'TN',
    'VC',
    'NA',
    'BA',
    'EC',
    'GE',
    'SZ',
    'FJ',
    'LY',
    'PY',
    'JM',
    'AM',
    'SV',
    'BT',
    'UA',
    'MA',
    'BZ',
    'GY',
    'PH',
    'GT',
    'BO',
    'LA',
    'UZ',
    'CV',
    'VN',
    'PK',
  ],
  VLI: [
    'AO',
    'CG',
    'MM',
    'NG',
    'NI',
    'WS',
    'MD',
    'TO',
    'HN',
    'TL',
    'GH',
    'SD',
    'BD',
    'MR',
    'KH',
    'ZM',
    'LS',
    'CI',
    'TV',
    'PG',
    'KG',
    'DJ',
    'KE',
    'MH',
    'FM',
    'CM',
    'TZ',
    'ST',
    'TJ',
    'VU',
    'NP',
    'SN',
    'TD',
    'UG',
    'YE',
    'ZW',
    'BJ',
    'ML',
    'SB',
    'ET',
    'RW',
    'GN',
    'KI',
    'AF',
    'BF',
    'HT',
    'GW',
    'SL',
    'GM',
    'SS',
    'TG',
    'KM',
    'MG',
    'ER',
    'MZ',
    'MW',
    'NE',
    'LR',
    'BI',
    'CD',
    'CF',
  ],
};

/**
 * Determines and stores the user's location classification based on their country's ISO code.
 * @param {string} iso2 - The two-letter ISO country code.
 */
function storeClassifications(iso2) {
  let classification = 'Unknown';
  if (iso2 && typeof iso2 === 'string') {
    const upperIso2 = iso2.toUpperCase();
    for (const [key, values] of Object.entries(classificationLookup)) {
      if (values.includes(upperIso2)) {
        classification = key;
        break;
      }
    }
  }
  localStorage.setItem('classification', classification);
}

/**
 * Fetches the user's approximate location based on their IP address using the ipinfo.io service.
 * It stores the location data and classification in local storage.
 */
async function fetchIPBasedLocation() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    if (!response.ok) {
      throw new Error(`IP API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (data) {
      const [latitude, longitude] = data.loc ? data.loc.split(',') : ['Not set', 'Not set'];
      localStorage.setItem('latitude', latitude || 'Not set');
      localStorage.setItem('longitude', longitude || 'Not set');
      localStorage.setItem('country', data.country || 'Not set'); // ipinfo.io returns country code in 'country' field
      localStorage.setItem('area', data.city || 'Not set'); // 'area' often refers to city in this context
      const iso2 = data.country || 'Not set';
      localStorage.setItem('iso2', iso2);
      storeClassifications(iso2);
    } else {
      log.warn('IP-based location data was empty.');
      // Set defaults if data is missing to avoid nulls in localStorage
      localStorage.setItem('latitude', 'Not set');
      localStorage.setItem('longitude', 'Not set');
      localStorage.setItem('country', 'Not set');
      localStorage.setItem('area', 'Not set');
      localStorage.setItem('iso2', 'Not set');
      storeClassifications('Not set');
    }
  } catch (error) {
    log.error('Error fetching IP-based location:', error);
    // Set defaults on error
    localStorage.setItem('latitude', 'Not set');
    localStorage.setItem('longitude', 'Not set');
    localStorage.setItem('country', 'Not set');
    localStorage.setItem('area', 'Not set');
    localStorage.setItem('iso2', 'Not set');
    storeClassifications('Not set');
    // Optionally, display a message to the user via a DOM element if this module had access to it
    // For now, just console logging. The orchestrator could handle UI feedback.
  }
}

/**
 * Initializes the location service by triggering the IP-based location fetch.
 */
export function initializeLocation() {
  fetchIPBasedLocation(); // Fire and forget, no need to await in the orchestrator for this.
}
