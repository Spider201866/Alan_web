/**
 * translations.js
 * ------------------------------------------------------------
 * Provides an object containing translations for multiple 
 * languages (e.g., English, French, Spanish, etc.). 
 * Each language code (e.g., 'en', 'fr') maps to an object 
 * holding key-value pairs of translatable strings.
 * 
 * Usage:
 *   1) Import this module wherever needed:
 *        import { translations } from './translations.js';
 *   2) Access a language object by its code, 
 *      e.g., translations.en.eyesEars => "Eyes, Ears, Skin"
 * 
 * Note: Each language object contains the same keys, 
 * ensuring consistent usage across multiple locales.
 * ------------------------------------------------------------
 */
export const translations = {
  // English
  en: {
    eyesEars: "Eyes, Ears, Skin",
    goodHistory: "Good History",
    examineWell: "Examine Well",
    useArclight: "Use Arclight",
    howCanIHelp: "what can I help with?",
    alanMistakes: "Alan can make mistakes. Use clinical judgement. 1/25",
    login: "Login",
    enterPassword: "Enter Password",
    register: "Register",
    name: "Name",
    healthWorker: "Health worker",
    nurse: "Nurse",
    ophthalmicOfficer: "Ophthalmic clinical officer",
    medicalStudent: "Medical student",
    generalPractitioner: "General practitioner",
    hospitalDoctor: "Hospital doctor",
    ophthalmologist: "Ophthalmologist",
    optometrist: "Optometrist",
    orthoptist: "Orthoptist",
    entSpecialist: "ENT specialist",
    pharmacist: "Pharmacist",
    audiologist: "Audiologist",
    earCarePractitioner: "Ear care practitioner",
    password: "Password (4-digit number)",
  },

  // Français
  fr: {
    eyesEars: "Yeux & Oreilles",
    goodHistory: "Bonne Anamnèse",
    examineWell: "Bien Examiner",
    useArclight: "Utiliser Arclight",
    howCanIHelp: "Comment puis-je vous aider aujourd'hui ?",
    alanMistakes:
      "Alan peut se tromper. Utilisez votre jugement clinique. 1/25",
    login: "Connexion",
    enterPassword: "Entrez le mot de passe",
    register: "S'inscrire",
    name: "Nom",
    healthWorker: "Agent de santé",
    nurse: "Infirmier/Infirmière",
    ophthalmicOfficer: "Officier clinique ophtalmique",
    medicalStudent: "Étudiant en médecine",
    generalPractitioner: "Médecin généraliste",
    hospitalDoctor: "Médecin hospitalier",
    ophthalmologist: "Ophtalmologiste",
    optometrist: "Optométriste",
    orthoptist: "Orthoptiste",
    entSpecialist: "Spécialiste ORL",
    pharmacist: "Pharmacien",
    audiologist: "Audiologiste",
    earCarePractitioner: "Praticien soins de l'oreille",
    password: "Mot de passe (4 chiffres)",
  },

  // Español
  es: {
    eyesEars: "Ojos & Oídos",
    goodHistory: "Historia Clínica",
    examineWell: "Examinar Cuidadosamente",
    useArclight: "Usar Arclight",
    howCanIHelp: "¿Cómo puedo ayudarte hoy?",
    alanMistakes: "Alan puede cometer errores. Usa el juicio clínico. 1/25",
    login: "Iniciar sesión",
    enterPassword: "Ingrese contraseña",
    register: "Registrarse",
    name: "Nombre",
    healthWorker: "Trabajador de la salud",
    nurse: "Enfermero/Enfermera",
    ophthalmicOfficer: "Oficial clínico oftálmico",
    medicalStudent: "Estudiante de medicina",
    generalPractitioner: "Médico general",
    hospitalDoctor: "Médico hospitalario",
    ophthalmologist: "Oftalmólogo",
    optometrist: "Optometrista",
    orthoptist: "Ortoptista",
    entSpecialist: "Especialista en Otorrinolaringología",
    pharmacist: "Farmacéutico",
    audiologist: "Audiólogo",
    earCarePractitioner: "Practicante de cuidado del oído",
    password: "Contraseña (4 dígitos)",
  },

  // Português
  pt: {
    eyesEars: "Olhos & Ouvidos",
    goodHistory: "Boa História",
    examineWell: "Examinar Bem",
    useArclight: "Usar Arclight",
    howCanIHelp: "Como posso ajudá-lo hoje?",
    alanMistakes: "Alan pode cometer erros. Use o julgamento clínico. 1/25",
    login: "Entrar",
    enterPassword: "Digite a senha",
    register: "Registrar",
    name: "Nome",
    healthWorker: "Trabalhador da saúde",
    nurse: "Enfermeiro",
    ophthalmicOfficer: "Oficial clínico oftálmico",
    medicalStudent: "Estudante de Medicina",
    generalPractitioner: "Clínico geral",
    hospitalDoctor: "Médico hospitalar",
    ophthalmologist: "Oftalmologista",
    optometrist: "Optometrista",
    orthoptist: "Orthoptist",
    entSpecialist: "Especialista em Otorrinolaringologia",
    pharmacist: "Farmacêutico",
    audiologist: "Audiologista",
    earCarePractitioner: "Praticante de cuidados auditivos",
    password: "Senha (4 dígitos)",
  },

  // Arabic
  ar: {
    eyesEars: "العيون والأذنين",
    goodHistory: "تاريخ جيد",
    examineWell: "فحص جيد",
    useArclight: "استخدم Arclight",
    howCanIHelp: "كيف يمكنني مساعدتك اليوم؟",
    alanMistakes: "آلان يمكن أن يخطئ. استخدم الحكم السريري. 1/25",
    login: "تسجيل الدخول",
    enterPassword: "أدخل كلمة المرور",
    register: "تسجيل",
    name: "اسم",
    healthWorker: "العاملين في مجال الصحة",
    nurse: "ممرضة",
    ophthalmicOfficer: "ضابط سريري بصري",
    medicalStudent: "طالب طب",
    generalPractitioner: "طبيب عام",
    hospitalDoctor: "طبيب المستشفى",
    ophthalmologist: "طبيب عيون",
    optometrist: "أخصائي بصريات",
    orthoptist: "معالج بصري",
    entSpecialist: "أخصائي أنف وأذن وحنجرة",
    pharmacist: "صيدلي",
    audiologist: "أخصائي سمعيات",
    earCarePractitioner: "ممارس العناية بالأذن",
    password: "كلمة السر (4 أرقام)",
  },

  // Kiswahili/Swahili
  sw: {
    eyesEars: "Macho na Masikio",
    goodHistory: "Historia Nzuri",
    examineWell: "Chunguza Vizuri",
    useArclight: "Tumia Arclight",
    howCanIHelp: "Ninawezaje kukusaidia leo?",
    alanMistakes: "Alan anaweza kukosea. Tumia hukumu ya kliniki. 1/25",
    login: "Ingia",
    enterPassword: "Weka Nenosiri",
    register: "Jisajili",
    name: "Jina",
    healthWorker: "Mfanyakazi wa Afya",
    nurse: "Muuguzi",
    ophthalmicOfficer: "Afisa wa Macho",
    medicalStudent: "Mwanafunzi wa Tiba",
    generalPractitioner: "Daktari wa Familia",
    hospitalDoctor: "Daktari wa Hospitali",
    ophthalmologist: "Daktari wa Macho",
    optometrist: "Mtaalamu wa Miwani",
    orthoptist: "Mtaalamu wa Orthoptics",
    entSpecialist: "Mtaalamu wa ENT",
    pharmacist: "Famasia",
    audiologist: "Mtaalamu wa Usikivu",
    earCarePractitioner: "Mtaalamu wa Utunzaji wa Masikio",
    password: "Nenosiri (nambari 4)",
  },

  // Chichewa (Malawi)
  ny: {
    eyesEars: "Masomphenya & Makutu",
    goodHistory: "Mbiri Yabwino",
    examineWell: "Fufuzani Mwachidwi",
    useArclight: "Gwiritsani Ntchito Arclight",
    howCanIHelp: "Ndingakuthandizeni bwanji lero?",
    alanMistakes:
      "Alan angalakwitse. Gwiritsani ntchito chiweruzo cha zamankhwala. 1/25",
    login: "Lowani",
    enterPassword: "Lowetsani Chinsinsi",
    register: "Lembetsani",
    name: "Dzina",
    healthWorker: "Wogwira Ntchito Zaumoyo",
    nurse: "Namwino",
    ophthalmicOfficer: "Ofesi ya Maso",
    medicalStudent: "Wophunzira Zachipatala",
    generalPractitioner: "Dokotala Woyamba",
    hospitalDoctor: "Dokotala wa Chipatala",
    ophthalmologist: "Dokotala wa Maso",
    optometrist: "Optometrist",
    orthoptist: "Orthoptist",
    entSpecialist: "Katswiri wa ENT",
    pharmacist: "Wofufuza Mankhwala",
    audiologist: "Katswiri wa Kumva",
    earCarePractitioner: "Wosamalira Khutu",
    password: "Achinsinsi (manambala 4)",
  },

  // Kinyarwanda (Rwanda)
  rw: {
    eyesEars: "Amaso n'Amatwi",
    goodHistory: "Amateka Meza",
    examineWell: "Suzuma Neza",
    useArclight: "Koresha Arclight",
    howCanIHelp: "Nakora iki kugufasha uyu munsi?",
    alanMistakes: "Alan ashobora gukosa. Koresha ubushishozi bw'ubuvuzi. 1/25",
    login: "Injira",
    enterPassword: "Tanga Ijambo ry'Ibanga",
    register: "Iyandikishe",
    name: "Izina",
    healthWorker: "Umukozi w'Ubuzima",
    nurse: "Umuforomo",
    ophthalmicOfficer: "Ushinzwe Ubuvuzi bw'Amaso",
    medicalStudent: "Umunyeshuri mu Buvuzi",
    generalPractitioner: "Umuganga Rusange",
    hospitalDoctor: "Umuganga w'Ibitaro",
    ophthalmologist: "Umuganga w'Amaso",
    optometrist: "Umuganga w'Amaso",
    orthoptist: "Orthoptist",
    entSpecialist: "Impuguke mu Ndwi, Izuru n'Ijosi",
    pharmacist: "Umuforomokazi",
    audiologist: "Impuguke mu By'Umutwe",
    earCarePractitioner: "Uwitaho Amatwi",
    password: "Ijambo ry'Ibanga (imibare 4)",
  },

  // Luganda (Uganda)
  lg: {
    eyesEars: "Amaso n'Amatwi",
    goodHistory: "Ebyafaayo Ebirungi",
    examineWell: "Kebera Bulungi",
    useArclight: "Kozesa Arclight",
    howCanIHelp: "Nnyinza kukuyamba ntya leero?",
    alanMistakes:
      "Alan ayinza okukola ensobi. Kozesa okusalirira okw'ekinnansi. 1/25",
    login: "Yingira",
    enterPassword: "Wandiika Ekigambo ky'Ekisumuluzo",
    register: "Sajjala",
    name: "Erinnya",
    healthWorker: "Omusawo",
    nurse: "Omukugu w'ebyobulamu",
    ophthalmicOfficer: "Omusawo w'amaaso",
    medicalStudent: "Omusomi w'eby'obulamu",
    generalPractitioner: "Omusawo Ogw'okuddamu",
    hospitalDoctor: "Omusawo w'eddwaaliro",
    ophthalmologist: "Omusawo w'amaaso",
    optometrist: "Omugezi w'amaaso",
    orthoptist: "Orthoptist",
    entSpecialist: "Omusawo w'amatwi, amamwa n'omumiro",
    pharmacist: "Omuwanika w'eddagala",
    audiologist: "Omusawo w'okutu",
    earCarePractitioner: "Omusawo w'amatwi",
    password: "Ekigambo ky'Ekisumuluzo (ebinnya 4)",
  },

  // Cymraeg/Welsh
  cy: {
    eyesEars: "Llygaid a Chlustiau",
    goodHistory: "Hanes Da",
    examineWell: "Archwilio'n Dda",
    useArclight: "Defnyddio Arclight",
    howCanIHelp: "Sut gallai helpu chi heddiw?",
    alanMistakes:
      "Gall Alan wneud camgymeriadau. Defnyddiwch farn glinigol. 1/25",
    login: "Mewngofnodi",
    enterPassword: "Rhowch Cyfrinair",
    register: "Cofrestru",
    name: "Enw",
    healthWorker: "Gweithiwr Iechyd",
    nurse: "Nyrs",
    ophthalmicOfficer: "Swyddog Clinigol Llygaid",
    medicalStudent: "Myfyriwr Meddygol",
    generalPractitioner: "Ymarferydd Cyffredinol",
    hospitalDoctor: "Doctor Ysbyty",
    ophthalmologist: "Ophthalmolegydd",
    optometrist: "Optometrydd",
    orthoptist: "Orthoptist",
    entSpecialist: "Arbenigwr ENT",
    pharmacist: "Fferyllydd",
    audiologist: "Awdiolegydd",
    earCarePractitioner: "Ymarferydd Gofal Clust",
    password: "Cyfrinair (4 rhif)",
  },
};
