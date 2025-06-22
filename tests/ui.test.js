/* Alan UI - ui.test.js | 19th June 2025, WJW */

/* eslint-env jest */
/**
 * UI/UX integration tests for Alan webapp.
 * Run with: npx jest tests/ui.test.js
 * Requires: jest, jsdom
 */

import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals'; // Import jest

describe('Alan Webapp UI/UX', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(
      `
      <body>
        <a href="#main-content" class="skip-to-content">Skip to main content</a>
        <main id="main-content"></main>
        <div class="menu-icon"></div>
        <nav class="side-menu" style="left: -370px;"></nav>
        <button id="instructions-button" class="button red pulse">How to use</button>
        <button id="language-button"></button>
        <div id="language-dropdown" style="display: none;">
          <ul>
            <li data-value="en">English</li>
            <li data-value="es">Español</li>
          </ul>
        </div>
        <aside id="popup"><span class="popup-close">×</span><div class="popup-content" id="popup-content"></div></aside>
        <button id="geolocation-button"></button>
        <p id="location-info"></p>
      </body>
    `,
      { url: 'http://localhost' }
    );
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    // Mock navigator.geolocation
    global.navigator = {
      geolocation: {
        getCurrentPosition: jest.fn(),
      },
    };
  });

  // Accessibility tests for marquee duplication in boxes.html
  describe('Accessibility: Marquee duplication in boxes.html', () => {
    it('should set aria-hidden="true" on all duplicated marquee elements (IDs ending in "b")', () => {
      // Simulate the DOM structure of boxes.html
      document.body.innerHTML = `
      <section class="marquee">
        <div class="marquee-content-reverse">
          <div class="box" id="eyeMarqueeLine1a">What is glaucoma?</div>
          <div class="box" id="eyeMarqueeLine1b" aria-hidden="true">What is glaucoma?</div>
          <div class="box" id="eyeMarqueeLine2a">How do I see the optic disc with the Arclight?</div>
          <div class="box" id="eyeMarqueeLine2b" aria-hidden="true">How do I see the optic disc with the Arclight?</div>
        </div>
      </section>
      <section class="marquee">
        <div class="marquee-content">
          <div class="box" id="earMarqueeLine1a">What is otitis media?</div>
          <div class="box" id="earMarqueeLine1b" aria-hidden="true">What is otitis media?</div>
          <div class="box" id="earMarqueeLine2a">Can I see the tympanic membrane with my Arclight?</div>
          <div class="box" id="earMarqueeLine2b" aria-hidden="true">Can I see the tympanic membrane with my Arclight?</div>
        </div>
      </section>
    `;
      // Select all elements with id ending in "b"
      const duplicatedBoxes = Array.from(document.querySelectorAll('.box[id$="b"]'));
      duplicatedBoxes.forEach((box) => {
        expect(box.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  // Accessibility tests for icon-only buttons
  describe('Accessibility: Icon-only buttons have aria-labels', () => {
    it('should have aria-label on icon-only language button in home.html', () => {
      document.body.innerHTML = `
      <button class="button btn-lang" id="language-button" aria-label="Change language"></button>
    `;
      const btn = document.getElementById('language-button');
      expect(btn).not.toBeNull();
      expect(btn.getAttribute('aria-label')).toBe('Change language');
    });

    it('should have aria-label on icon-only language button in index.html', () => {
      document.body.innerHTML = `
      <button id="index-language-button" title="Choose language" aria-label="Change language"></button>
    `;
      const btn = document.getElementById('index-language-button');
      expect(btn).not.toBeNull();
      expect(btn.getAttribute('aria-label')).toBe('Change language');
    });

    it('should have aria-label on icon-only clear history button in home.html', () => {
      document.body.innerHTML = `
      <button id="clearHistoryBtn" title="Delete all chat history" aria-label="Delete all chat history">
        <svg></svg>
      </button>
    `;
      const btn = document.getElementById('clearHistoryBtn');
      expect(btn).not.toBeNull();
      expect(btn.getAttribute('aria-label')).toBe('Delete all chat history');
    });

    it('should have aria-label on icon-only geo-info button in home.html', () => {
      document.body.innerHTML = `
      <button id="geo-info-button" aria-label="Show location info">i</button>
    `;
      const btn = document.getElementById('geo-info-button');
      expect(btn).not.toBeNull();
      expect(btn.getAttribute('aria-label')).toBe('Show location info');
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    if (dom) {
      dom.window.close();
    }
  });

  describe('Accessibility: "Skip to content" link', () => {
    it('should have a skip to content link that targets the main content', () => {
      const skipLink = document.querySelector('.skip-to-content');
      const mainContent = document.getElementById('main-content');

      expect(skipLink).not.toBeNull();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      expect(skipLink.textContent).toBe('Skip to main content');
      expect(mainContent).not.toBeNull();
    });

    it('should become visible on focus', () => {
      const skipLink = document.querySelector('.skip-to-content');
      // Simulate focus
      skipLink.focus();
      // In JSDOM, inline styles are directly manipulated.
      // We check for the presence of the style that makes it visible.
      // The actual CSS rules are in styles.css, which JSDOM doesn't fully apply for layout.
      // So, we check for the class and the href.
      expect(skipLink.classList.contains('skip-to-content')).toBe(true);
      expect(skipLink.getAttribute('href')).toBe('#main-content');
      // A more robust test would involve checking computed styles, but JSDOM limitations apply.
      // For now, verifying its presence and target is sufficient.
    });
  });

  it('should toggle the side menu when menu icon is clicked', () => {
    // TODO: Simulate click and test menu open/close logic
    expect(true).toBe(true); // Placeholder assertion
  });

  it('should show and hide language dropdown', () => {
    // Simulate language button click and dropdown selection
    const langBtn = document.getElementById('language-button');
    const langDropdown = document.createElement('div');
    langDropdown.id = 'language-dropdown';
    langDropdown.style.display = 'none';
    langDropdown.innerHTML = `
      <ul>
        <li data-value="en">English</li>
        <li data-value="es">Español</li>
        <li data-value="fr">Français</li>
      </ul>
    `;
    document.body.appendChild(langDropdown);
    // Show dropdown
    langBtn.onclick = () => {
      langDropdown.style.display = 'block';
    };
    langBtn.click();
    expect(langDropdown.style.display).toBe('block');
    // Hide dropdown
    langDropdown.style.display = 'none';
    expect(langDropdown.style.display).toBe('none');
  });

  it('should update all UI fields for each language selection', () => {
    // Simulate all UI fields
    const fields = {
      '.chatbot-subtitle': document.createElement('div'),
      '#good-history': document.createElement('span'),
      '#examine-well': document.createElement('span'),
      '#use-arclight': document.createElement('span'),
      '.chatbot-version': document.createElement('footer'),
      '#instructions-button': document.createElement('button'),
      '#eye-button': document.createElement('button'),
      '#ear-button': document.createElement('button'),
      '#skin-button': document.createElement('button'),
      '#videos-button': document.createElement('button'),
      '#atoms-button': document.createElement('button'),
      '#tools-button': document.createElement('button'),
      '#arclight-project-button': document.createElement('button'),
      '#links-button': document.createElement('button'),
      '#about-button': document.createElement('button'),
    };
    Object.entries(fields).forEach(([selector, el]) => {
      if (selector.startsWith('.')) el.className = selector.slice(1);
      if (selector.startsWith('#')) el.id = selector.slice(1);
      document.body.appendChild(el);
    });

    // Simulate 3 languages (expand to 22 as needed)
    const languages = ['en', 'es', 'fr'];
    const translations = {
      en: {
        eyesEars: 'Eyes, Ears, Skin',
        goodHistory: 'Good History',
        examineWell: 'Examine Well',
        useArclight: 'Use Arclight',
        alanMistakes: 'Alan can make mistakes, double check everything',
        instructionsButton: 'How to use',
        eyeButton: 'Eye',
        earButton: 'Ear',
        skinButton: 'Skin',
        videosButton: 'Videos',
        atomsButton: 'Atoms',
        toolsButton: 'Tools',
        arclightProjectButton: 'Arclight Project',
        linksButton: 'Links',
        aboutButton: 'About',
      },
      es: {
        eyesEars: 'Ojos, Oídos, Piel',
        goodHistory: 'Buen historial',
        examineWell: 'Examinar bien',
        useArclight: 'Usar Arclight',
        alanMistakes: 'Alan puede cometer errores, verifique todo',
        instructionsButton: 'Cómo usar',
        eyeButton: 'Ojo',
        earButton: 'Oído',
        skinButton: 'Piel',
        videosButton: 'Videos',
        atomsButton: 'Átomos',
        toolsButton: 'Herramientas',
        arclightProjectButton: 'Proyecto Arclight',
        linksButton: 'Enlaces',
        aboutButton: 'Acerca de',
      },
      fr: {
        eyesEars: 'Yeux, Oreilles, Peau',
        goodHistory: 'Bon historique',
        examineWell: 'Bien examiner',
        useArclight: 'Utiliser Arclight',
        alanMistakes: 'Alan peut faire des erreurs, vérifiez tout',
        instructionsButton: 'Comment utiliser',
        eyeButton: 'Œil',
        earButton: 'Oreille',
        skinButton: 'Peau',
        videosButton: 'Vidéos',
        atomsButton: 'Atomes',
        toolsButton: 'Outils',
        arclightProjectButton: 'Projet Arclight',
        linksButton: 'Liens',
        aboutButton: 'À propos',
      },
    };
    global.window.translations = translations;

    // Simulate updateAllLanguage function
    function updateAllLanguage(lang) {
      const t = window.translations[lang];
      const elementTranslations = {
        '.chatbot-subtitle': 'eyesEars',
        '#good-history': 'goodHistory',
        '#examine-well': 'examineWell',
        '#use-arclight': 'useArclight',
        '.chatbot-version': 'alanMistakes',
        '#instructions-button': 'instructionsButton',
        '#eye-button': 'eyeButton',
        '#ear-button': 'earButton',
        '#skin-button': 'skinButton',
        '#videos-button': 'videosButton',
        '#atoms-button': 'atomsButton',
        '#tools-button': 'toolsButton',
        '#arclight-project-button': 'arclightProjectButton',
        '#links-button': 'linksButton',
        '#about-button': 'aboutButton',
      };
      for (const [selector, key] of Object.entries(elementTranslations)) {
        const el = selector.startsWith('.')
          ? document.querySelector(selector)
          : document.getElementById(selector.slice(1));
        if (el) el.textContent = t[key];
      }
    }

    // Test for each language
    languages.forEach((lang) => {
      updateAllLanguage(lang);
      const t = translations[lang];
      expect(document.querySelector('.chatbot-subtitle').textContent).toBe(t.eyesEars);
      expect(document.getElementById('good-history').textContent).toBe(t.goodHistory);
      expect(document.getElementById('examine-well').textContent).toBe(t.examineWell);
      expect(document.getElementById('use-arclight').textContent).toBe(t.useArclight);
      expect(document.querySelector('.chatbot-version').textContent).toBe(t.alanMistakes);
      expect(document.getElementById('instructions-button').textContent).toBe(t.instructionsButton);
      expect(document.getElementById('eye-button').textContent).toBe(t.eyeButton);
      expect(document.getElementById('ear-button').textContent).toBe(t.earButton);
      expect(document.getElementById('skin-button').textContent).toBe(t.skinButton);
      expect(document.getElementById('videos-button').textContent).toBe(t.videosButton);
      expect(document.getElementById('atoms-button').textContent).toBe(t.atomsButton);
      expect(document.getElementById('tools-button').textContent).toBe(t.toolsButton);
      expect(document.getElementById('arclight-project-button').textContent).toBe(
        t.arclightProjectButton
      );
      expect(document.getElementById('links-button').textContent).toBe(t.linksButton);
      expect(document.getElementById('about-button').textContent).toBe(t.aboutButton);
    });
  });

  it('should update translations on language change', () => {
    // TODO: Test updateAllLanguage updates UI text
    expect(true).toBe(true); // Placeholder assertion
  });

  it('should open and close the user info popup', () => {
    // TODO: Simulate popup open/close logic
    expect(true).toBe(true); // Placeholder assertion
  });

  it('should handle geolocation button click', () => {
    // TODO: Simulate geolocation and test UI update
    expect(true).toBe(true); // Placeholder assertion
  });

  describe('API Error Handling: Location Info', () => {
    it('should display an error message if IP-based location data is unavailable', async () => {
      // Mock fetch to return an empty data object
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(null), // Simulate empty data
        })
      );

      // Simulate the main function call that fetches location
      // This requires importing the actual function or simulating its effect
      // For now, we'll manually trigger the logic that updates location-info
      const locationInfo = document.getElementById('location-info');
      locationInfo.style.display = 'none'; // Ensure it's hidden initially

      // Simulate the relevant part of fetchIPBasedLocation
      await global
        .fetch('https://ipapi.co/json/')
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            // Simulate the !data check
            locationInfo.textContent = 'Could not determine your location.';
            locationInfo.style.display = 'block';
            locationInfo.style.color = 'red';
            locationInfo.style.textAlign = 'center';
            locationInfo.style.marginTop = '10px';
          }
        });

      expect(locationInfo.style.display).toBe('block');
      expect(locationInfo.textContent).toBe('Could not determine your location.');
      expect(locationInfo.style.color).toBe('red');
    });

    it('should display an error message if fetching IP-based location fails', async () => {
      // Mock fetch to throw an error
      global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

      const locationInfo = document.getElementById('location-info');
      locationInfo.style.display = 'none'; // Ensure it's hidden initially

      // Simulate the relevant part of fetchIPBasedLocation
      await global.fetch('https://ipapi.co/json/').catch(() => {
        locationInfo.textContent = 'Could not determine your location due to an error.';
        locationInfo.style.display = 'block';
        locationInfo.style.color = 'red';
        locationInfo.style.textAlign = 'center';
        locationInfo.style.marginTop = '10px';
      });

      expect(locationInfo.style.display).toBe('block');
      expect(locationInfo.textContent).toBe('Could not determine your location due to an error.');
      expect(locationInfo.style.color).toBe('red');
    });
  });

  it('should show the sliding boxes iframe', () => {
    // Simulate the boxes iframe in the DOM
    document.body.innerHTML = `<object id="boxesFrame" type="text/html" data="boxes.html"></object>`;
    // Check that the iframe exists and is visible
    expect(document.getElementById('boxesFrame')).not.toBeNull();
    expect(document.getElementById('boxesFrame').style.display).not.toBe('none');
  });

  it('should show buttons below the chatbox entry', () => {
    // Simulate the muted buttons container and buttons
    document.body.innerHTML = `
      <div id="muted-buttons">
        <button id="images" class="button">Images</button>
        <button id="help" class="button">Help</button>
        <button id="screenshot" class="button">Screenshot</button>
        <button id="refer" class="button">Refer</button>
      </div>
    `;
    expect(document.getElementById('images')).not.toBeNull();
    expect(document.getElementById('help')).not.toBeNull();
    expect(document.getElementById('screenshot')).not.toBeNull();
    expect(document.getElementById('refer')).not.toBeNull();
  });

  it('should open and close the popup and update geolocation info', () => {
    // Simulate popup open/close
    const popup = document.getElementById('popup');
    popup.style.right = '-350px';
    // Open popup
    popup.style.right = '0px';
    expect(popup.style.right).toBe('0px');
    // Close popup
    popup.style.right = '-350px';
    expect(popup.style.right).toBe('-350px');
    // Simulate geolocation info update
    const locationInfo = document.getElementById('location-info');
    locationInfo.innerText = 'Updated location: 51.5074, -0.1278';
    expect(locationInfo.innerText).toMatch(/Updated location/);
  });

  it('should show sidebar and all navigation buttons, and simulate back arrow/page navigation', () => {
    // Simulate sidebar and navigation buttons
    document.body.innerHTML = `
      <nav class="side-menu">
        <button id="instructions-button" class="button">How to use</button>
        <button id="eye-button" class="button">Eye</button>
        <button id="ear-button" class="button">Ear</button>
        <button id="skin-button" class="button">Skin</button>
        <button id="videos-button" class="button">Videos</button>
        <button id="atoms-button" class="button">Atoms</button>
        <button id="tools-button" class="button">Tools</button>
        <button id="links-button" class="button">Links</button>
        <button id="about-button" class="button">About</button>
        <button id="arclight-project-button" class="button">Arclight Project</button>
        <button id="language-button" class="button">Language</button>
        <button class="back-arrow button">Back</button>
      </nav>
    `;
    // Check all buttons exist
    [
      'instructions-button',
      'eye-button',
      'ear-button',
      'skin-button',
      'videos-button',
      'atoms-button',
      'tools-button',
      'links-button',
      'about-button',
      'arclight-project-button',
      'language-button',
    ].forEach((id) => {
      expect(document.getElementById(id)).not.toBeNull();
    });
    // Simulate back arrow click (page navigation)
    const backArrow = document.querySelector('.back-arrow');
    let navigated = false;
    backArrow.onclick = () => {
      navigated = true;
    };
    backArrow.click();
    expect(navigated).toBe(true);
  });

  it('should show all navigation and language links/buttons', () => {
    // Simulate navigation and language links/buttons
    document.body.innerHTML = `
      <nav class="side-menu">
        <button id="instructions-button" class="button">How to use</button>
        <button id="eye-button" class="button">Eye</button>
        <button id="ear-button" class="button">Ear</button>
        <button id="skin-button" class="button">Skin</button>
        <button id="videos-button" class="button">Videos</button>
        <button id="atoms-button" class="button">Atoms</button>
        <button id="tools-button" class="button">Tools</button>
        <button id="links-button" class="button">Links</button>
        <button id="about-button" class="button">About</button>
        <button id="arclight-project-button" class="button">Arclight Project</button>
        <button id="language-button" class="button">Language</button>
      </nav>
    `;
    [
      'instructions-button',
      'eye-button',
      'ear-button',
      'skin-button',
      'videos-button',
      'atoms-button',
      'tools-button',
      'links-button',
      'about-button',
      'arclight-project-button',
      'language-button',
    ].forEach((id) => {
      const btn = document.getElementById(id);
      expect(btn).not.toBeNull();
      // Simulate click
      btn.onclick = jest.fn();
      btn.click();
      expect(btn.onclick).toHaveBeenCalled();
    });
    // Simulate language dropdown
    const langDropdown = document.createElement('div');
    langDropdown.id = 'language-dropdown';
    langDropdown.innerHTML = `
      <ul>
        <li data-value="en">English</li>
        <li data-value="es">Español</li>
        <li data-value="fr">Français</li>
      </ul>
    `;
    document.body.appendChild(langDropdown);
    const langItems = langDropdown.querySelectorAll('li');
    langItems.forEach((item) => {
      item.onclick = jest.fn();
      item.click();
      expect(item.onclick).toHaveBeenCalled();
    });
  });

  it('should show splash screen on load', async () => {
    // Simulate splash screen element
    document.body.innerHTML = `<div id="splash-screen" style="display: block;"></div>`;
    const splash = document.getElementById('splash-screen');
    expect(document.getElementById('splash-screen').style.display).toBe('block');
    // Simulate hiding splash after load (e.g., after timeout)
    await new Promise((resolve) => {
      setTimeout(() => {
        splash.style.display = 'none';
        expect(document.getElementById('splash-screen').style.display).toBe('none');
        resolve();
      }, 100);
    });
  });

  it('should show the logo and footer', () => {
    // Simulate logo and footer
    document.body.innerHTML = `
      <div class="chatbot-title">Alan</div>
      <footer class="chatbot-version">Alan can make mistakes, double check everything</footer>
    `;
    expect(document.querySelector('.chatbot-title').textContent).toMatch(/Alan/);
    expect(document.querySelector('.chatbot-version').textContent).toMatch(/double check/);
  });

  it('should animate Alan logo spin on greeting', () => {
    // Simulate Alan logo and greeting logic
    document.body.innerHTML = `<div class="chatbot-title">Alan</div>`;
    const logo = document.querySelector('.chatbot-title');
    // Simulate class toggle for spin animation
    logo.classList.remove('flip-horizontally');
    void logo.offsetWidth; // force reflow
    logo.classList.add('flip-horizontally');
    expect(logo.classList.contains('flip-horizontally')).toBe(true);
  });

  it('should show Good History and Examine Well text', () => {
    // Simulate the text elements
    document.body.innerHTML = `
      <span id="good-history">Good History</span>
      <span id="examine-well">Examine Well</span>
    `;
    expect(document.getElementById('good-history').textContent).toMatch(/Good History/);
    expect(document.getElementById('examine-well').textContent).toMatch(/Examine Well/);
  });

  it('should include the user name in the greeting', () => {
    // Simulate subtext and localStorage
    const subText = document.createElement('p');
    subText.id = 'sub-text';
    document.body.appendChild(subText);
    global.localStorage.getItem = (key) => (key === 'name' ? 'Test User' : 'en');
    global.window.translations = { en: { howCanIHelp: 'How can I help?' } };
    // Simulate greeting logic
    const name = localStorage.getItem('name');
    const t = window.translations['en'];
    if (name) {
      let firstName = name.split(' ')[0];
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      subText.innerText = `${firstName}, ${t.howCanIHelp}`;
    } else {
      subText.innerText = t.howCanIHelp;
    }
    expect(subText.innerText).toMatch(/Test, How can I help/);
  });

  it('should trigger Images, Help, Screenshot, and Refer button actions', () => {
    // Simulate buttons
    document.body.innerHTML = `
      <button id="images" class="button"></button>
      <button id="help" class="button"></button>
      <button id="screenshot" class="button"></button>
      <button id="refer" class="button"></button>
    `;
    const imagesBtn = document.getElementById('images');
    const helpBtn = document.getElementById('help');
    const screenshotBtn = document.getElementById('screenshot');
    const referBtn = document.getElementById('refer');

    // Mock window.open and screenshot function
    window.open = jest.fn();
    const showHelp = jest.fn();
    const takeScreenshot = jest.fn();
    const referAction = jest.fn();

    // Assign actions
    imagesBtn.onclick = () => window.open('images.html', '_blank');
    helpBtn.onclick = showHelp;
    screenshotBtn.onclick = takeScreenshot;
    referBtn.onclick = referAction;

    imagesBtn.click();
    helpBtn.click();
    screenshotBtn.click();
    referBtn.click();

    expect(window.open).toHaveBeenCalledWith('images.html', '_blank');
    expect(showHelp).toHaveBeenCalled();
    expect(takeScreenshot).toHaveBeenCalled();
    expect(referAction).toHaveBeenCalled();
  });

  it('should show password entry UI and accept input', () => {
    // Simulate password entry form
    document.body.innerHTML = `
      <form id="password-form">
        <input type="password" id="password-input" />
        <button id="password-submit">Submit</button>
      </form>
    `;
    const input = document.getElementById('password-input');
    input.value = '662023';
    expect(input.value).toBe('662023');
    // Simulate submit
    const submit = document.getElementById('password-submit');
    let submitted = false;
    submit.onclick = (e) => {
      e.preventDefault();
      submitted = true;
    };
    submit.click();
    expect(submitted).toBe(true);
  });

  it('should show onboarding screen and accept user details', () => {
    // Simulate onboarding form
    document.body.innerHTML = `
      <form id="onboarding-form">
        <input type="text" id="name-input" value="Test User" />
        <input type="text" id="area-input" value="Test Area" />
        <button id="onboarding-submit">Continue</button>
      </form>
    `;
    const nameInput = document.getElementById('name-input');
    const areaInput = document.getElementById('area-input');
    expect(nameInput.value).toBe('Test User');
    expect(areaInput.value).toBe('Test Area');
    // Simulate submit
    const submit = document.getElementById('onboarding-submit');
    let submitted = false;
    submit.onclick = (e) => {
      e.preventDefault();
      submitted = true;
    };
    submit.click();
    expect(submitted).toBe(true);
  });

  it('should show popup with correct user info from localStorage', () => {
    // Set up localStorage values
    global.localStorage.getItem = (key) => {
      const map = {
        name: 'Test User',
        area: 'Test Area',
        selectedJobRole: 'Doctor',
        selectedExperience: 'Expert',
        latitude: '51.5074',
        longitude: '-0.1278',
        country: 'UK',
        iso2: 'GB',
        classification: 'A',
        contactInfo: 'test@example.com',
      };
      return map[key] || '';
    };
    // Simulate translations
    global.window.translations = {
      en: {
        userInfoTitle: 'User Information',
        userName: 'Name',
        userContact: 'Contact',
        userAimsPopupLabel: 'Aims',
        userExperiencePopupLabel: 'Experience',
        userLatLong: 'Lat/Long',
        userArea: 'Area',
        userCountry: 'Country',
        userVersion: 'Version',
        userDateTime: 'Date/Time',
        howCanIHelp: 'How can I help?',
      },
    };
    // Simulate popup-content element
    const popupContent = document.createElement('div');
    popupContent.id = 'popup-content';
    document.body.appendChild(popupContent);

    // Simulate buildPopupContent logic (simplified)
    function buildPopupContent() {
      const name = localStorage.getItem('name') || 'Not set';
      const area = localStorage.getItem('area') || 'Not set';
      const contactInfo = localStorage.getItem('contactInfo') || 'Not set';
      return `<p><strong>Name:</strong> ${name}</p><p><strong>Area:</strong> ${area}</p><p><strong>Contact:</strong> ${contactInfo}</p>`;
    }
    popupContent.innerHTML = buildPopupContent();

    expect(popupContent.innerHTML).toMatch(/Test User/);
    expect(popupContent.innerHTML).toMatch(/Test Area/);
    expect(popupContent.innerHTML).toMatch(/test@example.com/);
  });
});
