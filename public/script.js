import { translations } from './language.js';

// Function to update page content based on selected language
function updateContent(lang) {
    // Updating text content based on selected language
    document.querySelector('.login-box input[type="password"]').placeholder = translations[lang]['enterPassword'];
    document.getElementById('register').textContent = translations[lang]['register'];
    document.querySelectorAll('.register-box input')[0].placeholder = translations[lang]['name'];
    document.querySelectorAll('.register-box input')[1].placeholder = translations[lang]['password'];

    // Update professions dropdown
    updateProfessionsDropdown(lang);
}

function updateProfessionsDropdown(lang) {
    const dropdown = document.getElementById('profession-dropdown');
    dropdown.innerHTML = ''; // Clear existing options

    // Define an array of keys that correspond to professions in your translations object
    const professionKeys = [
        'healthWorker', 'nurse', 'ophthalmicOfficer', 'medicalStudent',
        'generalPractitioner', 'hospitalDoctor', 'ophthalmologist', 'optometrist',
        'orthoptist', 'entSpecialist', 'pharmacist', 'audiologist', 'earCarePractitioner'
    ];
    
    // Iterate over the profession keys and create dropdown options
    professionKeys.forEach(key => {
        if (translations[lang][key]) { // Check if the translation exists for the current language
            const option = document.createElement('option');
            option.value = key; // Adjust if the value attribute should be different
            option.textContent = translations[lang][key];
            dropdown.appendChild(option);
        } else {
            console.error(`Missing translation for ${key} in language: ${lang}`);
        }
    });
}




document.getElementById('language-dropdown').addEventListener('change', function() {
    updateContent(this.value);
});

document.getElementById('register').addEventListener('click', function() {
    const registerBox = document.getElementById('register-box');
    registerBox.style.display = registerBox.style.display === 'none' || registerBox.style.display === '' ? 'block' : 'none';
});



// Initial setup to load the default language translations
document.addEventListener('DOMContentLoaded', () => {
    updateContent(document.getElementById('language-dropdown').value);
    document.getElementById('register-box').style.display = 'none';
});
