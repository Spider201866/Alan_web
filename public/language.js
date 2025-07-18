/**
 * translations.js
 * ------------------------------------------------------------
 * Provides an object containing translations for multiple
 * languages (e.g., English, French, Spanish, etc.).
 * Each language code (e.g. 'en', 'fr') maps to an object
 * holding key-value pairs of translatable strings.
 *
 * This example shows how to include 22 languages, each with
 * updated job roles: Physician associate & Dermatologist.
 *
 * Usage:
 *   import { translations } from './translations.js';
 *   const t = translations[currentLanguage];
 *   element.textContent = t.eyesEars; // for instance
 *
 * Adjust or refine any translations as needed!
 * ------------------------------------------------------------
 */
export const translations = {
  // 1) English
  en: {
    eyesEars: 'Eyes, Ears, Skin',
    goodHistory: 'Good History',
    examineWell: 'Examine Well',
    useArclight: 'Use Arclight',
    howCanIHelp: 'what can I help with?',
    alanMistakes: `Alan can make mistakes. Use clinical judgement. ${new Date().getMonth() + 1}/25,`,
    login: 'Login',
    enterPassword: 'Enter Password',
    register: 'Register',
    name: 'Name',
    password: 'Password (4-digit number)',

    // --- NEW "Aims" Dropdown Translations ---
    aimsPlaceholder: 'Aims',
    aimsEyes: 'Eyes',
    aimsEars: 'Ears',
    aimsSkin: 'Skin',
    aimsVeterinary: 'Veterinary',
    aimsChildMaternal: 'Child/Maternal',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Health worker',
    nurse: 'Nurse',
    ophthalmicOfficer: 'Ophthalmic clinical officer',
    medicalStudent: 'Medical student',
    physicianAssociate: 'Physician associate',
    generalPractitioner: 'General practitioner',
    hospitalDoctor: 'Hospital doctor',
    ophthalmologist: 'Ophthalmologist',
    optometrist: 'Optometrist',
    orthoptist: 'Orthoptist',
    entSpecialist: 'ENT specialist',
    pharmacist: 'Pharmacist',
    audiologist: 'Audiologist',
    earCarePractitioner: 'Ear care practitioner',
    dermatologist: 'Dermatologist',
    */

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

    passwordTitle: 'Enter your Alan invitation password',
    passwordPlaceholder: 'Password',
    passwordErrorMsg: 'Invalid password. Please try again',
    passwordSubmitBtn: 'Submit',
    noCodeLine: "No or incorrect code? Contact us <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>here</a>",

    eyeMarqueeLine1: 'What is glaucoma?',
    eyeMarqueeLine2: 'How do I see the optic disc with the Arclight?',
    eyeMarqueeLine3: 'Man 25, red eye, 3 day, photophobia, VA down a little',
    eyeMarqueeLine4: 'Tell me about Iritis',
    eyeMarqueeLine5: 'Do I refer congenital cataract urgently?',
    eyeMarqueeLine6: 'Woman 65, vision poor, no glasses. Front eye OK, cloudy pupil',
    eyeMarqueeLine7: 'Mother worried about baby as noticed white pupil, no vision in eye.',

    earMarqueeLine1: 'What is otitis media?',
    earMarqueeLine2: 'Can I see the tympanic membrane with my Arclight?',
    earMarqueeLine3: 'Lad 16, sore pinna, 2 day, itchy, hearing is good',
    earMarqueeLine4: 'Tell me about syringing',
    earMarqueeLine5: 'Do I refer mastoiditis urgently?',
    earMarqueeLine6: 'Man 73yr, hearing poor. Poor view of canal. I just see wax',
    earMarqueeLine7: 'Infant no response to voice. Been months',

    userInfoTitle: 'User Info',
    userName: 'Name',
    userContact: 'Contact',
    userRole: 'Role',
    userAimsPopupLabel: "Aims",
    // userAims: 'Aims',
    userLatLong: 'Lat & Long',
    userArea: 'Area',
    userCountry: 'Country',
    userVersion: 'Version',
    userDateTime: 'Date & Time',
    geolocationButton: 'Geolocation',
    geoInfoText: 'Clicking "Geolocation" will share a more accurate location (lat/long). This helps offer better guidance and choices.',

    pageTitle_howToExamineEye: 'How to examine the eye',
    frontOfEyeHeading: 'Front of Eye',
    frontOfEyeText:
      "Observe and compare eyes: <em>straight,</em> <em>right,</em> <em>left,</em> <em>up,</em> down<br><strong><u>Hold &amp; get close</u></strong>. Examine: <em>lids,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Use with <span style='color: orange;'>fluro</span> for corneal ulcers or scratches",
    fundalReflexHeading: 'Fundal Reflex',
    fundalReflexText:
      '<em>Dim</em> room, baby happy; at arms-length – compare reflexes<br>Equal: <em>Brightness,</em> <em>Colour,</em> <em>Shape</em><br>Go closer for details: <em>Scar, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Back of Eye',
    backOfEyeText:
      "Use right eye to view patient's right eye; left for left<br>Patient must look straight NOT at light; get close and find optic disc (Dilate = best view)<br>Study disc: <em>Margin,</em> <em>Colour,</em> <em>Cup</em>. Track big vessels, then ask patient to look directly into the light to see macula",
    additionalText_eye:
      "Know your discs: normal, <span style='color:red; font-weight:bold;'>swollen,</span> <span style='color:red;'>new vessels,</span> <span style='color:orange;'>cupped,</span> <span style='color:green;'>pale</span><br>&gt;Practice often&lt;",

    pageTitle_howToExamineEar: 'How to examine the ear',
    allAroundEarHeading: 'All around ear',
    allAroundEarText:
      'Check: <em>pinna, </em><em>tragus, </em><em>mastoid</em> for lumps, tenderness or discharge<br>Gently move pinna, note any pain',
    earCanalHeading: 'Ear canal',
    earCanalText:
      'Tilt head, <strong><u>hold Arclight like a pen</u></strong><br>Pull pinna up/back (adults) or down/back (children)<br>Insert speculum (4.5mm adult, 2.5mm infant), push past hairs, rotate if needed<br>Look for: <em>wax,</em> <em>debris,</em> <em>infection</em>',
    tympanicMembraneHeading: 'Tympanic membrane',
    tympanicMembraneText:
      'Identify handle of malleus, light reflex, attic<br>Note: <em>colour</em>, <em>position</em>, <em>translucency</em><br>Look for perforation, fluid or scarring',
    additionalText_ear:
      "Know your TM's: normal, <span style='color:red; font-weight:bold;'>red</span>, <span style='color:orange;'>bulging</span>, <span style='color:green;'>retracted</span>, <span style='color:purple;'>perforated</span><br>&gt;Practice often&lt;",

    pageTitle_howToExamineSkin: 'How to examine the skin',
    generalObservationHeading: 'General observation',
    generalObservationText: 'Inspect lumps, <em>colour changes</em>, distribution<br>Gently palpate for texture, temperature or tenderness',
    uvLightHeading: 'UV (Wood’s) light',
    uvLightText:
      "In a blacked-out room check for characteristic fluorescence:<br><span style='color:teal;'>tinea (blue-green)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (coppery-orange)</span>, <span style='color:#FF4040;'>erythrasma (coral-red)</span>, <span style='color:blue;'>vitiligo (blue-white)</span>, <span style='color:orange;'>acne (orange-red)</span>, <span style='color:#BFEFFF;'>head lice nits (pale-blue)</span>",
    dermoscopyHeading: 'Dermoscopy',
    dermoscopyText:
      '<strong><u>Hold Arclight polariser like a pen</u></strong>, check: <strong>ABCDE</strong> (<em>Asymmetry</em>, <em>Border</em>, <em>Colour</em>, <em>Diameter &gt;6mm</em>, <em>Evolving</em>)<br>Study: PDSBV (<em>Pigment network</em>, <em>Dots</em>, <em>Streaks</em>, <em>Blue-white</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Know your lesion: normal, <span style='color:red;'>suspicious</span>, <span style='color:orange;'>inflamed</span><br>&gt;Practice often&lt;",

    pageTitle_aboutAlan: 'About Alan',
    aboutAlanText:
      'Alan is an AI eye, ear and skin diagnostic assistant, comprising: a foundation language model and symbolic logic. Smart. Serious. State of the art.<br><br>Clinical, local knowledge and images, are tailored to different roles such as health workers and general practitioners. Concise dialogue generates a diagnosis and management plan. Use of the arclight is embedded throughout.<br>',
    aboutAlanListItem1: 'Expert base – tropical/hot climate',
    aboutAlanListItem2: 'Arclight aware',
    aboutAlanEfficient: '<strong>Efficient</strong> – concise, plain language',
    aboutAlanEasy: '<strong>Easy-to-use</strong> – app, voice, vision',
    aboutAlanExplainable: '<strong>Explainable</strong> – facts/rules, images',
    aboutAlanEncouraging: '<strong>Encouraging</strong> – empathy, teacher',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Instructions',
    instructionsIntro:
      'Alan is an AI assistant for students and those who only occasionally see eye, ear or skin cases. Write or speak clearly and avoid identifying names or details. Look fully around head/face/body part and examine both eyes/ears. Good luck!',
    instructionsPatientPrompt: "Tell Alan about your patient's:",
    instructionsPatientDetail1: 'problem & onset',
    instructionsPatientDetail2: 'what you see',
    instructionsPatientDetail3: 'vision & pupils',
    instructionsPatientDetail4: 'age, sex, medication',
    instructionsUseArclight_default: 'Use Arclight: front, fundal reflex, back of eye.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Use Arclight:</strong> <strong><em>front, fundal reflex, back of eye.</em></strong>',
    instructionsTooLittle_eye: 'man red eye what?',
    instructionsJustRight_eye:
      'Man 25yr, red eye 3 day. No meds or eye prob before. Pain, watering, White cornea dot. Pupils OK, Vision 6/12 6/6 other',
    instructionsTooMuch_eye:
      'This man came into clinics today. He drove into the building with a red eye, now he thinks the food he ate is affecting his eye. I see watering, red edges, you know? He wants help. Tall man, watery eyes, worried about cornea and pain. He says, "What is this?"',
    instructionsAdditionalQuery_eye: 'Alan also answers eye teaching/learning queries: What is Iritis? How do I see the retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Use Arclight:</strong> <strong><em>all around ear, canal, drum.</em></strong>',
    instructionsTooLittle_ear: 'man red ear what?',
    instructionsJustRight_ear:
      'Man 25yr, red ear 3 day. No meds or ear prob before. Pain, ear discharge. Red drum, hearing muffled in bad ear but OK other.',
    instructionsTooMuch_ear:
      'This man came into clinics today. He drove into the building with red ears, now he thinks the food he ate is affecting his ear. I see discharge and red edges. He wants help. Tall man, watery ears, worried about hearing and pain. He says, "What is this?"',
    instructionsAdditionalQuery_ear: 'Alan also answers ear teaching/learning queries: What is Otitis Media? How do I clean an ear?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Use Arclight:</strong> <strong><em>UV light, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'man red skin what?',
    instructionsJustRight_skin: 'Man 25yr, red skin patch 3 day. No meds or skin prob before. Sore and itchy.',
    instructionsTooMuch_skin:
      'This man came into clinics today. He drove into the building with red skin, now he thinks the food he ate is affecting his skin. I see watering, red edges. He wants help. Tall man, red skin, worried about pigment and irritation. He says, "What is this?"',
    instructionsAdditionalQuery_skin: 'Alan also answers skin teaching/learning queries: What is Eczema? How do I see the pigment network?',
    instructionsLabelTooLittle: 'Too little',
    instructionsLabelJustRight: 'Just right',
    instructionsLabelTooMuch: 'Too much',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan is an AI assistant for students and those who only occasionally see eye, ear or skin cases. Write or speak clearly and avoid identifying names or details.',
    goodLuck: 'Good luck!',
    namePlaceholder: 'Name',
    // rolePlaceholder: 'Role', 

    // --- NEW "Experience" Dropdown Translations ---
    experiencePlaceholder: 'Experience',
    experienceStudentRefresher: 'Student / refresher',
    experienceConfidentCore: 'Confident core knowledge',
    experienceExpert: 'Expert',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 yr',
    experienceOption2: '1-3 yr',
    experienceOption3: '3-7 yr',
    experienceOption4: '>7 yr',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Aims',
    aimsOption1: 'Second opinion',
    aimsOption2: 'Condition lookup',
    aimsOption3: 'Communicate better',
    */
    contactPlaceholder: 'Contact (email/phone)',
    acceptButton: 'Accept',

    images: "Images",
    help: "Help",
    screenshot: "Screenshot",
    refer: "Refer",
    comingSoon: "Coming Soon...",
  },

  // 2) Chinese (Simplified) - zh
  zh: {
    eyesEars: '眼、耳、皮肤',
    goodHistory: '良好病史',
    examineWell: '认真检查',
    useArclight: '使用 Arclight',
    howCanIHelp: '我能帮你做什么？',
    alanMistakes: `Alan 可能会出错。请使用临床判断。${new Date().getMonth() + 1}/25,`,
    login: '登录',
    enterPassword: '输入密码',
    register: '注册',
    name: '姓名',
    password: '密码 (4位数字)',

    // --- NEW "Aims" Dropdown Translations ---
    aimsPlaceholder: '目标',
    aimsEyes: '眼科',
    aimsEars: '耳科',
    aimsSkin: '皮肤科',
    aimsVeterinary: '兽医',
    aimsChildMaternal: '儿童/母婴',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: '医务人员',
    nurse: '护士',
    ophthalmicOfficer: '眼科临床官',
    medicalStudent: '医学生',
    physicianAssociate: '医生助理',
    generalPractitioner: '全科医生',
    hospitalDoctor: '医院医生',
    ophthalmologist: '眼科医生',
    optometrist: '验光师',
    orthoptist: '视光矫正师',
    entSpecialist: '耳鼻喉专家',
    pharmacist: '药剂师',
    audiologist: '听力学家',
    earCarePractitioner: '耳部护理人员',
    dermatologist: '皮肤科医生',
    */

    instructionsButton: '如何使用',
    eyeButton: '眼睛',
    earButton: '耳朵',
    skinButton: '皮肤',
    videosButton: '视频',
    atomsButton: '原子',
    toolsButton: '工具',
    arclightProjectButton: 'Arclight 项目',
    linksButton: '链接',
    aboutButton: '关于',

    passwordTitle: '请输入您的 Alan 邀请密码',
    passwordPlaceholder: '密码',
    passwordErrorMsg: '密码无效，请重试',
    passwordSubmitBtn: '提交',
    noCodeLine: "没有或错误的代码？请在此处与我们联系 <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>这里</a>",

    eyeMarqueeLine1: '什么是青光眼？',
    eyeMarqueeLine2: '如何使用 Arclight 查看视神经盘？',
    eyeMarqueeLine3: '男性，25岁，红眼3天，畏光，视力略有下降',
    eyeMarqueeLine4: '告诉我关于虹膜炎的信息',
    eyeMarqueeLine5: '先天性白内障需要紧急转诊吗？',
    eyeMarqueeLine6: '女性65岁，视力差，没有眼镜。前眼正常，但晶状体混浊',
    eyeMarqueeLine7: '母亲担心婴儿有白色瞳孔，似乎没有视觉',

    earMarqueeLine1: '什么是中耳炎？',
    earMarqueeLine2: '我可以用 Arclight 看到鼓膜吗？',
    earMarqueeLine3: '16岁男孩，耳廓疼痛2天，瘙痒，听力正常',
    earMarqueeLine4: '告诉我关于冲洗耳朵（洗耳）',
    earMarqueeLine5: '急需转诊乳突炎吗？',
    earMarqueeLine6: '男性73岁，听力差。耳道视野不好，只看到耳垢',
    earMarqueeLine7: '婴儿对声音无反应，已有几个月了',

    userInfoTitle: '用户信息',
    userName: '姓名',
    userContact: '联系方式',
    userRole: '角色',
    userAimsPopupLabel: "目标",
    // userAims: '目标',
    userLatLong: '经纬度',
    userArea: '区域',
    userCountry: '国家',
    userVersion: '版本',
    userDateTime: '日期 & 时间',
    geolocationButton: '定位',
    geoInfoText: '点击“定位”将共享更准确的位置（经度/纬度）。这有助于提供更好的指导和选择。',

    pageTitle_howToExamineEye: '如何检查眼睛',
    frontOfEyeHeading: '眼前部',
    frontOfEyeText:
      "观察并比较眼睛：<em>正视,</em> <em>向右,</em> <em>向左,</em> <em>向上,</em> 向下<br><strong><u>靠近观察</u></strong>。检查：<em>眼睑,</em> <em>结膜,</em> <em>角膜,</em> <em>瞳孔</em><br>使用<span style='color: orange;'>荧光素</span>检查角膜溃疡或刮伤",
    fundalReflexHeading: '底部反射',
    fundalReflexText:
      '<em>昏暗</em>的房间, 宝宝安静; 远距离比较反射<br>均等: <em>亮度,</em> <em>颜色,</em> <em>形状</em><br>靠近观察细节: <em>疤痕, 白内障, RB, 玻璃体出血</em>',
    backOfEyeHeading: '眼后部',
    backOfEyeText:
      '右眼观察病人右眼; 左眼观察左侧<br>病人须直视而非看光; 靠近寻找视神经盘（散瞳视野最佳）<br>检查视盘：<em>边缘,</em> <em>颜色,</em> <em>杯状</em>。观察大血管，然后请病人直视光源以观察黄斑',
    additionalText_eye:
      "了解你的视盘：正常, <span style='color:red; font-weight:bold;'>水肿,</span> <span style='color:red;'>新生血管,</span> <span style='color:orange;'>杯状,</span> <span style='color:green;'>苍白</span><br>&gt;多加练习&lt;",

    pageTitle_howToExamineEar: '如何检查耳朵',
    allAroundEarHeading: '耳周检查',
    allAroundEarText: '检查：<em>外耳廓, </em><em>耳屏, </em><em>乳突</em>是否有肿块、压痛或分泌物<br>轻轻活动外耳廓，注意是否有疼痛',
    earCanalHeading: '耳道检查',
    earCanalText:
      '倾斜头部，<strong><u>像握笔般握住 Arclight</u></strong><br>成人上拉/后拉外耳廓，儿童下拉/后拉<br>插入检耳镜（成人4.5mm，婴儿2.5mm），推开耳毛，必要时旋转<br>观察：<em>耳垢,</em> <em>杂质,</em> <em>感染</em>',
    tympanicMembraneHeading: '鼓膜检查',
    tympanicMembraneText: '识别锤骨柄、光反射及鼓室上部<br>注意：<em>颜色,</em> <em>位置,</em> <em>半透明性</em><br>检查是否有穿孔、积液或瘢痕',
    additionalText_ear:
      "了解你的鼓膜：正常, <span style='color:red; font-weight:bold;'>红</span>, <span style='color:orange;'>鼓胀</span>, <span style='color:green;'>凹陷</span>, <span style='color:purple;'>穿孔</span><br>&gt;多加练习&lt;",

    pageTitle_howToExamineSkin: '如何检查皮肤',
    generalObservationHeading: '一般观察',
    generalObservationText: '检查肿块，<em>颜色变化</em>，分布<br>轻轻触诊质地、温度或压痛',
    uvLightHeading: '紫外线（伍德灯）',
    uvLightText:
      "在全黑的房间内检查特征性荧光：<br><span style='color:teal;'>皮癣菌感染（蓝绿色）</span>, <span style='color:#FF7F50;'>花斑癣（铜橙色）</span>, <span style='color:#FF4040;'>红皮症（珊瑚红）</span>, <span style='color:blue;'>白癜风（蓝白色）</span>, <span style='color:orange;'>痤疮（橙红色）</span>, <span style='color:#BFEFFF;'>头虱卵（淡蓝色）</span>",
    dermoscopyHeading: '皮肤镜检查',
    dermoscopyText:
      '<strong><u>像握笔一样握住 Arclight 偏振镜</u></strong>，检查：<strong>ABCDE</strong>（<em>不对称</em>，<em>边界</em>，<em>颜色</em>，<em>直径&gt;6mm</em>，<em>变化中</em>）<br>观察：PDSBV（<em>色素网络</em>，<em>小点</em>，<em>条纹</em>，<em>蓝白色</em>，<em>血管</em>）',
    additionalText_skin:
      "了解你的病变：正常，<span style='color:red; font-weight:bold;'>可疑</span>，<span style='color:orange;'>发炎</span><br>&gt;多加练习&lt;",

    pageTitle_aboutAlan: '关于 Alan',
    aboutAlanText:
      'Alan 是一款 AI 眼、耳和皮肤诊断助手，融合了基础语言模型与符号逻辑。聪明、严肃、前沿。<br><br>临床、本地知识和图像针对不同角色（如卫生工作者和全科医生）量身定制。简洁的对话生成诊断和管理方案。Arclight 的使用贯穿始终。<br>',
    aboutAlanListItem1: '专家基地 – 热带/炎热气候',
    aboutAlanListItem2: '了解 Arclight',
    aboutAlanEfficient: '<strong>高效</strong> – 简洁、通俗的语言',
    aboutAlanEasy: '<strong>易于使用</strong> – 应用、语音、视觉',
    aboutAlanExplainable: '<strong>可解释</strong> – 事实/规则、图像',
    aboutAlanEncouraging: '<strong>鼓励性</strong> – 同理心、导师',
    aboutAlanDate: 'wjw 1月25日',

    instructionsPageTitle: '操作说明',
    instructionsIntro:
      'Alan 是一款 AI 助手，适用于学生和偶尔遇到眼、耳或皮肤案例的人。请清晰书写或讲话，并避免泄露姓名或细节。请全面检查头部/面部/相关部位，并检查两只眼睛/耳朵。祝您好运！',
    instructionsPatientPrompt: '请告诉 Alan 您患者的情况：',
    instructionsPatientDetail1: '问题及发病时间',
    instructionsPatientDetail2: '您所见',
    instructionsPatientDetail3: '视力与瞳孔',
    instructionsPatientDetail4: '年龄、性别、用药情况',
    instructionsUseArclight_default: '使用 Arclight：前部、底部反射、眼后部。',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>使用 Arclight：</strong> <strong><em>前部、底部反射、眼后部。</em></strong>',
    instructionsTooLittle_eye: '男：红眼，怎么回事？',
    instructionsJustRight_eye: '男 25岁，红眼持续3天。之前无用药或眼疾。疼痛、流泪、白色角膜点。瞳孔正常，视力分别为6/12和6/6。',
    instructionsTooMuch_eye:
      '今日有男患者来诊，他驾驶车辆进入楼内，眼睛呈红色，他认为食物可能影响了眼睛。请看：流泪和红边。患者求助，高个子男，眼泪汪汪，担心角膜和疼痛。他问：“这是怎么回事？”',
    instructionsAdditionalQuery_eye: 'Alan 还回答关于眼科教学的问题：什么是虹膜炎？如何观察视网膜？',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>使用 Arclight：</strong> <strong><em>全方位检查耳朵、耳道、鼓膜。</em></strong>',
    instructionsTooLittle_ear: '男：红耳，怎么回事？',
    instructionsJustRight_ear: '男 25岁，红耳持续3天。之前无用药或耳疾。疼痛、耳部分泌物。鼓膜发红，问题耳听力较弱，但另一侧正常。',
    instructionsTooMuch_ear:
      '今日有男患者来诊，他驾驶车辆进入楼内，耳朵呈红色，他认为食物可能影响了耳朵。请看：分泌物和红边。患者求助，高个子男，耳朵泪流满面，担心听力和疼痛。他问：“这是怎么回事？”',
    instructionsAdditionalQuery_ear: 'Alan 还回答关于耳科教学的问题：什么是中耳炎？如何清洁耳朵？',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>使用 Arclight：</strong> <strong><em>紫外线照射，皮肤镜检查。</em></strong>',
    instructionsTooLittle_skin: '男：红皮肤，怎么回事？',
    instructionsJustRight_skin: '男 25岁，红皮肤斑块持续3天。之前无用药或皮肤问题。皮肤酸痛、发痒。',
    instructionsTooMuch_skin:
      '今日有男患者来诊，他驾驶车辆进入楼内，皮肤呈红色，他认为食物可能影响了皮肤。请看：流泪和红边。患者求助，高个子男，皮肤发红，担心色素和刺激。他问：“这是怎么回事？”',
    instructionsAdditionalQuery_skin: 'Alan 还回答关于皮肤教学的问题：什么是湿疹？如何观察色素网络？',
    instructionsLabelTooLittle: '太少',
    instructionsLabelJustRight: '正合适',
    instructionsLabelTooMuch: '太多',

    // --- Onboarding Page Translations ---
    instructionText: 'Alan 是一款 AI 助手，适用于学生和偶尔遇到眼、耳或皮肤病例的人。请清晰书写或表达，并避免透露姓名或详细信息。',
    goodLuck: '祝你好运！',
    namePlaceholder: '姓名',
    // rolePlaceholder: '角色',

    // --- NEW "Experience" Dropdown Translations ---
    experiencePlaceholder: '经验',
    experienceStudentRefresher: '学生/复习者',
    experienceConfidentCore: '核心知识扎实',
    experienceExpert: '专家',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 年',
    experienceOption2: '1-3 年',
    experienceOption3: '3-7 年',
    experienceOption4: '>7 年',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: '目标',
    aimsOption1: '第二意见',
    aimsOption2: '病情查询',
    aimsOption3: '更好沟通',
    */
    contactPlaceholder: '联系方式（电子邮件/电话）',
    acceptButton: '接受',

    images: "图片",
    help: "帮助",
    screenshot: "截屏",
    refer: "转介",
    comingSoon: "敬请期待...",
  },

  // 3) Hindi - hi
  hi: {
    eyesEars: 'आंख, कान, त्वचा',
    goodHistory: 'अच्छा इतिहास',
    examineWell: 'अच्छी तरह जांचें',
    useArclight: 'Arclight का उपयोग करें',
    howCanIHelp: 'मैं आपकी किस तरह मदद कर सकता/सकती हूं?',
    alanMistakes: `Alan गलतियां कर सकता है। कृपया नैदानिक निर्णय का उपयोग करें।${new Date().getMonth() + 1}/25,`,
    login: 'लॉगिन',
    enterPassword: 'पासवर्ड दर्ज करें',
    register: 'रजिस्टर करें',
    name: 'नाम',
    password: 'पासवर्ड (4 अंकों का)',

    // --- NEW "Aims" Dropdown Translations ---
    aimsPlaceholder: 'लक्ष्य',
    aimsEyes: 'आंखें',
    aimsEars: 'कान',
    aimsSkin: 'त्वचा',
    aimsVeterinary: 'पशु चिकित्सा',
    aimsChildMaternal: 'बाल/मातृ',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'स्वास्थ्यकर्मी',
    nurse: 'नर्स',
    ophthalmicOfficer: 'नेत्र चिकित्सा अधिकारी',
    medicalStudent: 'चिकित्सा छात्र',
    physicianAssociate: 'चिकित्सक सहायक',
    generalPractitioner: 'सामान्य चिकित्सक',
    hospitalDoctor: 'अस्पताल चिकित्सक',
    ophthalmologist: 'नेत्र रोग विशेषज्ञ',
    optometrist: 'ऑप्टोमेट्रिस्ट',
    orthoptist: 'ऑर्थोप्टिस्ट',
    entSpecialist: 'ईएनटी विशेषज्ञ',
    pharmacist: 'फार्मासिस्ट',
    audiologist: 'श्रवण विशेषज्ञ',
    earCarePractitioner: 'कान देखभाल करने वाला',
    dermatologist: 'त्वचा विशेषज्ञ',
    */

    instructionsButton: 'कैसे इस्तेमाल करें',
    eyeButton: 'आंख',
    earButton: 'कान',
    skinButton: 'त्वचा',
    videosButton: 'वीडियो',
    atomsButton: 'परमाणु',
    toolsButton: 'उपकरण',
    arclightProjectButton: 'Arclight प्रोजेक्ट',
    linksButton: 'लिंक',
    aboutButton: 'के बारे में',

    passwordTitle: 'Alan का आमंत्रण पासवर्ड दर्ज करें',
    passwordPlaceholder: 'पासवर्ड',
    passwordErrorMsg: 'अमान्य पासवर्ड। कृपया पुनः प्रयास करें',
    passwordSubmitBtn: 'सबमिट',
    noCodeLine: "कोई या गलत कोड? हमसे <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>यहाँ</a> संपर्क करें",

    eyeMarqueeLine1: 'ग्लूकोमा क्या है?',
    eyeMarqueeLine2: 'Arclight से ऑप्टिक डिस्क कैसे देखें?',
    eyeMarqueeLine3: 'पुरुष 25 वर्ष, लाल आँख, 3 दिन से, प्रकाश-संवेदनशीलता, दृष्टि थोड़ी कम',
    eyeMarqueeLine4: 'इरिटिस के बारे में बताएं',
    eyeMarqueeLine5: 'जन्मजात मोतियाबिंद को तुरंत रेफर करना चाहिए?',
    eyeMarqueeLine6: 'महिला 65 वर्ष, दृष्टि कम, चश्मा नहीं. सामने की आँख ठीक, लेकिन लेंस धुँधला',
    eyeMarqueeLine7: 'माँ चिंतित है, बच्चे की पुतली सफेद दिखती है, आँख में दृष्टि नहीं',

    earMarqueeLine1: 'ओटिटिस मीडिया क्या है?',
    earMarqueeLine2: 'क्या मैं Arclight से झिल्ली (टायम्पेनिक मेम्ब्रेन) देख सकता/सकती हूँ?',
    earMarqueeLine3: '16 वर्षीय लड़का, कान का बाहरी हिस्सा 2 दिनों से दर्द व खुजली, सुनाई ठीक',
    earMarqueeLine4: 'कान की सिंचाई (सिरिंजिंग) के बारे में बताएं',
    earMarqueeLine5: 'क्या मुझे मास्टॉइडाइटिस को तुरंत रेफर करना चाहिए?',
    earMarqueeLine6: '73 वर्षीय पुरुष, सुनाई कम. कान नहर साफ़ दिखती नहीं, बस वैक्स',
    earMarqueeLine7: 'शिशु आवाज़ पर प्रतिक्रिया नहीं करता, कई महीनों से',

    userInfoTitle: 'उपयोगकर्ता जानकारी',
    userName: 'नाम',
    userContact: 'संपर्क',
    userRole: 'भूमिका',
    userAimsPopupLabel: "लक्ष्य",
    // userAims: 'उद्देश्य',
    userLatLong: 'अक्षांश व देशांतर',
    userArea: 'क्षेत्र',
    userCountry: 'देश',
    userVersion: 'संस्करण',
    userDateTime: 'तारीख व समय',
    geolocationButton: 'स्थान निर्धारण',
    geoInfoText: '“स्थान निर्धारण” पर क्लिक करने से अधिक सटीक स्थान (अक्षांश/देशांतर) साझा होगा। इससे बेहतर मार्गदर्शन और विकल्प मिलते हैं।',

    pageTitle_howToExamineEye: 'आँख की जांच कैसे करें',
    frontOfEyeHeading: 'आँख का सामने का भाग',
    frontOfEyeText:
      "आँखों का निरीक्षण और तुलना करें: <em>सीधे,</em> <em>दाएं,</em> <em>बाएं,</em> <em>ऊपर,</em> नीचे<br><strong><u>निकट आकर देखें</u></strong>। जाँच करें: <em>पलकें,</em> <em>कॉन्जक्टिवा,</em> <em>कॉर्निया,</em> <em>पुतलियाँ</em><br><span style='color: orange;'>फ्लूरो</span> के साथ कॉर्नियल अल्सर या खरोंच के लिए उपयोग करें",
    fundalReflexHeading: 'फंडल रिफ्लेक्स',
    fundalReflexText:
      '<em>अंधेरा</em> कमरा, बच्चा खुश; बाहरी दूरी पर – रिफ्लेक्स की तुलना करें<br>समान: <em>चमक,</em> <em>रंग,</em> <em>आकार</em><br>विस्तार से देखने के लिए: <em>दाग, मोतियाबिंद, आरबी, विट हेएम</em>',
    backOfEyeHeading: 'आँख का पीछे का भाग',
    backOfEyeText:
      'दाहिनी आँख से मरीज की दाहिनी आँख देखें; बायीं से बायीं<br>मरीज को सीधे देखना चाहिए, प्रकाश की ओर नहीं; पास जाकर ऑप्टिक डिस्क खोजें (डाइलेट = सर्वश्रेष्ठ दृश्य)<br>डिस्क का अध्ययन करें: <em>किनारा,</em> <em>रंग,</em> <em>कप</em>. बड़ी नाड़ियों का पता लगाएं, फिर मरीज से सीधे प्रकाश में देखने के लिए कहें ताकि मैकुला दिखाई दे',
    additionalText_eye:
      "अपने डिस्क्स को जानें: सामान्य, <span style='color:red; font-weight:bold;'>सूजे हुए,</span> <span style='color:red;'>नई नाड़ियाँ,</span> <span style='color:orange;'>कपयुक्त,</span> <span style='color:green;'>फीका</span><br>&gt;अधिक अभ्यास करें&lt;",

    pageTitle_howToExamineEar: 'कान का परीक्षण कैसे करें',
    allAroundEarHeading: 'कान के चारों ओर',
    allAroundEarText:
      'जांचें: <em>पिन्ना, </em><em>ट्रैगस, </em><em>मास्टॉइड</em> में गाँठ, संवेदनशीलता या स्राव<br>पिन्ना को धीरे से हिलाएं, किसी दर्द का ध्यान रखें',
    earCanalHeading: 'कान का नलिका',
    earCanalText:
      'सर झुकाएं, <strong><u>Arclight को कलम की तरह पकड़ें</u></strong><br>वयस्कों में पिन्ना को ऊपर/पीछे और बच्चों में नीचे/पीछे खींचें<br>स्पेकुलम डालें (वयस्क: 4.5 मिमी, शिशु: 2.5 मिमी), बालों को हटाएं, आवश्यकता अनुसार घुमाएं<br>देखें: <em>मोम,</em> <em>मलबा,</em> <em>संक्रमण</em>',
    tympanicMembraneHeading: 'कान की झिल्ली',
    tympanicMembraneText:
      'मैल्यस का हैंडल, प्रकाश परावर्तन, अट्टी की पहचान करें<br>ध्यान दें: <em>रंग,</em> <em>स्थिति,</em> <em>अर्धपारदर्शिता</em><br>छिद्र, तरल या निशान देखें',
    additionalText_ear:
      "अपने कान की झिल्ली को जानें: सामान्य, <span style='color:red; font-weight:bold;'>लाल</span>, <span style='color:orange;'>फूली हुई</span>, <span style='color:green;'>संकोचित</span>, <span style='color:purple;'>छिद्रित</span><br>&gt;अभ्यास करते रहें&lt;",

    pageTitle_howToExamineSkin: 'त्वचा का परीक्षण कैसे करें',
    generalObservationHeading: 'सामान्य निरीक्षण',
    generalObservationText: 'गठ्ठों, <em>रंग परिवर्तन</em> और वितरण का निरीक्षण करें<br>मुलायमता, तापमान या संवेदनशीलता के लिए धीरे से छूएँ',
    uvLightHeading: 'यूवी (वुड्स) लाइट',
    uvLightText:
      "एक अंधेरे कमरे में विशिष्ट फ्लोरोसेंस की जांच करें:<br><span style='color:teal;'>टीना (नीला-हरा)</span>, <span style='color:#FF7F50;'>पिटिरियासिस वर्सिकोलर (तांबे-नारंगी)</span>, <span style='color:#FF4040;'>एरिथ्रास्मा (मछली-लाल)</span>, <span style='color:blue;'>विटिलिगो (नीला-सफेद)</span>, <span style='color:orange;'>मुँहासे (नारंगी-लाल)</span>, <span style='color:#BFEFFF;'>हेड लाइस निट्स (हल्का नीला)</span>",
    dermoscopyHeading: 'डर्मोस्कोपी',
    dermoscopyText:
      '<strong><u>Arclight पोलराइजर को कलम की तरह पकड़ें</u></strong>, जांचें: <strong>ABCDE</strong> (<em>असाममिति</em>, <em>सीमा</em>, <em>रंग</em>, <em>6mm से बड़ा व्यास</em>, <em>विकसित</em>)<br>अध्ययन करें: PDSBV (<em>पिगमेंट नेटवर्क</em>, <em>बिंदु</em>, <em>रेखा</em>, <em>नीला-सफेद</em>, <em>रक्तवाहिनी</em>)',
    additionalText_skin:
      "अपने घाव को जानें: सामान्य, <span style='color:red;'>संदिग्ध</span>, <span style='color:orange;'>सूजा हुआ</span><br>&gt;अभ्यास करते रहें&lt;",

    pageTitle_aboutAlan: 'एबाउट एलन',
    aboutAlanText:
      'Alan एक AI आंख, कान और त्वचा निदान सहायक है, जिसमें एक आधार भाषा मॉडल और प्रतीकात्मक लॉजिक शामिल है। स्मार्ट। गंभीर। अत्याधुनिक।<br><br>क्लिनिकल, स्थानीय ज्ञान और छवियाँ स्वास्थ्यकर्मियों और सामान्य चिकित्सकों जैसे विभिन्न पदों के अनुरूप बनाई जाती हैं। संक्षिप्त वार्तालाप निदान और प्रबंधन योजना उत्पन्न करता है। Arclight का उपयोग हर जगह निहित है।<br>',
    aboutAlanListItem1: 'विशेषज्ञ आधार – उष्णकटिबंधीय/गर्म जलवायु',
    aboutAlanListItem2: 'Arclight से अवगत',
    aboutAlanEfficient: '<strong>प्रभावी</strong> – संक्षिप्त, सरल भाषा',
    aboutAlanEasy: '<strong>उपयोग में आसान</strong> – ऐप, आवाज़, दृश्य',
    aboutAlanExplainable: '<strong>व्याख्येय</strong> – तथ्यों/नियम, छवियाँ',
    aboutAlanEncouraging: '<strong>प्रोत्साहक</strong> – सहानुभूति, शिक्षक',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'निर्देश',
    instructionsIntro:
      'Alan एक AI सहायक है जो छात्रों और उन लोगों के लिए है जिन्हें कभी-कभी आंख, कान या त्वचा के मामलों का सामना करना पड़ता है। स्पष्ट लिखें या बोलें और नाम या विवरण न बताएं। सिर/चेहरे/शरीर के हिस्से को पूरी तरह देखें और दोनों आंखें/कान जांचें। शुभकामनाएं!',
    instructionsPatientPrompt: 'अपने मरीज के बारे में Alan से बताएं:',
    instructionsPatientDetail1: 'समस्या और शुरुआत',
    instructionsPatientDetail2: 'जो आप देखते हैं',
    instructionsPatientDetail3: 'दृष्टि और पुतलियाँ',
    instructionsPatientDetail4: 'आयु, लिंग, दवा',
    instructionsUseArclight_default: 'Arclight का उपयोग करें: सामने, फंडल रिफ्लेक्स, पीछे की आंख।',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Arclight का उपयोग करें:</strong> <strong><em>सामने, फंडल रिफ्लेक्स, पीछे की आंख।</em></strong>',
    instructionsTooLittle_eye: 'आदमी लाल आंख, क्या?',
    instructionsJustRight_eye:
      'आदमी 25 वर्ष, लाल आंख 3 दिन। पहले कोई दवा या आंख की समस्या नहीं थी। दर्द, आंख से पानी, सफेद कॉर्निया डॉट। पुतलियाँ ठीक, दृष्टि 6/12 और 6/6 बाकी।',
    instructionsTooMuch_eye:
      "आज एक आदमी क्लिनिक आया। उसने कार से बिल्डिंग में प्रवेश किया और उसकी आंख लाल है, अब वह समझता है कि खाया हुआ भोजन उसकी आंख को प्रभावित कर रहा है। मैं आंख से पानी और लाल किनारे देखता हूँ। वह मदद चाहता है—लंबा आदमी, आंखें पानी वाली, कॉर्निया और दर्द को लेकर चिंतित। वह पूछता है, 'यह क्या है?'",
    instructionsAdditionalQuery_eye: 'Alan आंख से संबंधित शिक्षण/सीखने के प्रश्नों का भी उत्तर देता है: इरिटिस क्या है? मैं रेटिना कैसे देखूं?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Arclight का उपयोग करें:</strong> <strong><em>पूरे कान, नलिका, ड्रम।</em></strong>',
    instructionsTooLittle_ear: 'आदमी लाल कान, क्या?',
    instructionsJustRight_ear:
      'आदमी 25 वर्ष, लाल कान 3 दिन। पहले कोई दवा या कान की समस्या नहीं थी। दर्द, कान से स्राव। लाल ड्रम, खराब कान में सुनवाई मंद लेकिन अन्य सामान्य।',
    instructionsTooMuch_ear:
      "आज एक आदमी क्लिनिक आया। उसने कार से बिल्डिंग में प्रवेश किया और उसके कान लाल हैं, अब वह समझता है कि खाया हुआ भोजन उसके कान को प्रभावित कर रहा है। मैं स्राव और लाल किनारे देखता हूँ। वह मदद चाहता है—लंबा आदमी, पानी वाली कानें, सुनवाई और दर्द को लेकर चिंतित। वह पूछता है, 'यह क्या है?'",
    instructionsAdditionalQuery_ear:
      'Alan कान से संबंधित शिक्षण/सीखने के प्रश्नों का भी उत्तर देता है: मिडिया की स्थिति क्या है? मैं कान कैसे साफ करूं?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Arclight का उपयोग करें:</strong> <strong><em>यूवी लाइट, डर्मोस्कोपी।</em></strong>',
    instructionsTooLittle_skin: 'आदमी लाल त्वचा, क्या?',
    instructionsJustRight_skin: 'आदमी 25 वर्ष, लाल त्वचा का पैच 3 दिन। पहले कोई दवा या त्वचा की समस्या नहीं थी। खरोंच और खुजली।',
    instructionsTooMuch_skin:
      "आज एक आदमी क्लिनिक आया। उसने कार से बिल्डिंग में प्रवेश किया और उसकी त्वचा लाल है, अब वह समझता है कि खाया हुआ भोजन उसकी त्वचा को प्रभावित कर रहा है। मैं त्वचा से पानी और लाल किनारे देखता हूँ। वह मदद चाहता है—लंबा आदमी, लाल त्वचा, रंग और जलन को लेकर चिंतित। वह पूछता है, 'यह क्या है?'",
    instructionsAdditionalQuery_skin:
      'Alan त्वचा से संबंधित शिक्षण/सीखने के प्रश्नों का भी उत्तर देता है: एक्जिमा क्या है? मैं पिगमेंट नेटवर्क कैसे देखूं?',
    instructionsLabelTooLittle: 'बहुत कम',
    instructionsLabelJustRight: 'ठीक है',
    instructionsLabelTooMuch: 'बहुत ज्यादा',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan एक AI सहायक है जो छात्रों और उन लोगों के लिए है जो कभी-कभार आंख, कान या त्वचा के मामलों का सामना करते हैं। कृपया स्पष्ट रूप से लिखें या बोलें और नाम या विवरण न दें।',
    goodLuck: 'शुभकामनाएं!',
    namePlaceholder: 'नाम',
    // rolePlaceholder: 'भूमिका',

    // --- NEW "Experience" Dropdown Translations ---
    experiencePlaceholder: 'अनुभव',
    experienceStudentRefresher: 'छात्र / पुनश्चर्या',
    experienceConfidentCore: 'आत्मविश्वासी मूल ज्ञान',
    experienceExpert: 'विशेषज्ञ',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 वर्ष',
    experienceOption2: '1-3 वर्ष',
    experienceOption3: '3-7 वर्ष',
    experienceOption4: '>7 वर्ष',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'लक्ष्य',
    aimsOption1: 'दूसरा विचार',
    aimsOption2: 'स्थिति खोज',
    aimsOption3: 'बेहतर संचार',
    */
    contactPlaceholder: 'संपर्क (ईमेल/फ़ोन)',
    acceptButton: 'स्वीकार करें',

    images: "चित्र",
    help: "सहायता",
    screenshot: "स्क्रीनशॉट",
    refer: "रेफ़र",
    comingSoon: "शीघ्र आ रहा है...",
  },

  // 4) Spanish - es
  es: {
    eyesEars: 'Ojos y Oídos y Piel',
    goodHistory: 'Historia Clínica',
    examineWell: 'Examinar Cuidadosamente',
    useArclight: 'Usar Arclight',
    howCanIHelp: '¿Cómo puedo ayudarte hoy?',
    alanMistakes: `Alan puede cometer errores. Usa el juicio clínico. ${new Date().getMonth() + 1}/25,`,
    login: 'Iniciar sesión',
    enterPassword: 'Ingrese contraseña',
    register: 'Registrarse',
    name: 'Nombre',
    password: 'Contraseña (4 dígitos)',

    // --- NEW "Aims" Dropdown Translations ---
    aimsPlaceholder: 'Objetivos',
    aimsEyes: 'Ojos',
    aimsEars: 'Oídos',
    aimsSkin: 'Piel',
    aimsVeterinary: 'Veterinaria',
    aimsChildMaternal: 'Niño/Materno',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Trabajador de la salud',
    nurse: 'Enfermero/Enfermera',
    ophthalmicOfficer: 'Oficial clínico oftálmico',
    medicalStudent: 'Estudiante de medicina',
    physicianAssociate: 'Asociado médico',
    generalPractitioner: 'Médico general',
    hospitalDoctor: 'Médico hospitalario',
    ophthalmologist: 'Oftalmólogo',
    optometrist: 'Optometrista',
    orthoptist: 'Ortoptista',
    entSpecialist: 'Especialista en Otorrinolaringología',
    pharmacist: 'Farmacéutico',
    audiologist: 'Audiólogo',
    earCarePractitioner: 'Practicante de cuidado del oído',
    dermatologist: 'Dermatólogo',
    */

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

    passwordTitle: 'Ingrese su contraseña de invitación de Alan',
    passwordPlaceholder: 'Contraseña',
    passwordErrorMsg: 'Contraseña inválida. Inténtalo de nuevo',
    passwordSubmitBtn: 'Enviar',
    noCodeLine: "¿Sin código o código incorrecto? Contáctanos <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>aquí</a>",

    eyeMarqueeLine1: '¿Qué es el glaucoma?',
    eyeMarqueeLine2: '¿Cómo veo el disco óptico con el Arclight?',
    eyeMarqueeLine3: 'Hombre de 25 años, ojo rojo 3 días, fotofobia, AV reducida un poco',
    eyeMarqueeLine4: 'Cuéntame sobre la iritis',
    eyeMarqueeLine5: '¿Debo derivar la catarata congénita con urgencia?',
    eyeMarqueeLine6: 'Mujer 65 años, visión pobre, sin gafas. Parte anterior bien, cristalino opaco',
    eyeMarqueeLine7: 'Madre preocupada: bebé con pupila blanca, sin visión en ese ojo',

    earMarqueeLine1: '¿Qué es la otitis media?',
    earMarqueeLine2: '¿Puedo ver la membrana timpánica con mi Arclight?',
    earMarqueeLine3: 'Chico 16 años, oreja adolorida 2 días, picazón, audición buena',
    earMarqueeLine4: 'Háblame del lavado de oídos',
    earMarqueeLine5: '¿Debo derivar mastoiditis con urgencia?',
    earMarqueeLine6: 'Hombre 73 años, audición pobre. Mal vista del canal. Solo veo cera',
    earMarqueeLine7: 'Bebé sin respuesta a la voz. Lleva meses así',

    userInfoTitle: 'Información del Usuario',
    userName: 'Nombre',
    userContact: 'Contacto',
    userRole: 'Rol',
    userAimsPopupLabel: "Objetivos",
    // userAims: 'Objetivos',
    userLatLong: 'Lat & Long',
    userArea: 'Área',
    userCountry: 'País',
    userVersion: 'Versión',
    userDateTime: 'Fecha y Hora',
    geolocationButton: 'Geolocalización',
    geoInfoText:
      'Al hacer clic en "Geolocalización" se compartirá una ubicación (latitud/longitud) más precisa. Esto ayuda a ofrecer una mejor orientación y opciones.',

    pageTitle_howToExamineEye: 'Cómo examinar el ojo',
    frontOfEyeHeading: 'Frente del Ojo',
    frontOfEyeText:
      "Observe y compare los ojos: <em>directo,</em> <em>derecho,</em> <em>izquierdo,</em> <em>arriba,</em> abajo<br><strong><u>Mantenga y acérquese</u></strong>. Examine: <em>párpados,</em> <em>conjuntiva,</em> <em>córnea,</em> <em>pupila</em><br>Utilice con <span style='color: orange;'>fluor</span> para úlceras o rasguños corneales",
    fundalReflexHeading: 'Reflejo Fundal',
    fundalReflexText:
      'Ambiente <em>oscuro</em>, bebé contento; a la distancia de un brazo – compare los reflejos<br>Igual: <em>Brillo,</em> <em>Color,</em> <em>Forma</em><br>Acérquese para ver detalles: <em>Cicatriz, catarata, RB, Hemorragia vítrea</em>',
    backOfEyeHeading: 'Parte Posterior del Ojo',
    backOfEyeText:
      'Use el ojo derecho para ver el ojo derecho del paciente; izquierdo para el izquierdo<br>El paciente debe mirar recto, NO hacia la luz; acérquese y encuentre el disco óptico (Dilatar = mejor vista)<br>Estudie el disco: <em>Borde,</em> <em>Color,</em> <em>Copa</em>. Siga los vasos grandes, luego pida al paciente que mire directamente la luz para ver la mácula',
    additionalText_eye:
      "Conozca sus discos: normal, <span style='color:red; font-weight:bold;'>hinchado,</span> <span style='color:red;'>nuevos vasos,</span> <span style='color:orange;'>en forma de copa,</span> <span style='color:green;'>pálido</span><br>&gt;Practique con frecuencia&lt;",

    pageTitle_howToExamineEar: 'Cómo examinar el oído',
    allAroundEarHeading: 'Alrededor del oído',
    allAroundEarText:
      'Verifique: <em>oreja, </em><em>trago, </em><em>mastoid</em> para bultos, sensibilidad o secreción<br>Mueva suavemente la oreja, observe si hay dolor',
    earCanalHeading: 'Conducto auditivo',
    earCanalText:
      'Incline la cabeza, <strong><u>sostenga Arclight como si fuera un bolígrafo</u></strong><br>Tire de la oreja hacia arriba/atrás (adultos) o hacia abajo/atrás (niños)<br>Inserte el especulo (4.5mm para adultos, 2.5mm para infantes), empuje a través de los pelos, gire si es necesario<br>Busque: <em>cera,</em> <em>residuos,</em> <em>infección</em>',
    tympanicMembraneHeading: 'Membrana timpánica',
    tympanicMembraneText:
      'Identifique el mango del martillo, el reflejo de luz y el ático<br>Note: <em>color,</em> <em>posición,</em> <em>translucidez</em><br>Busque perforación, líquido o cicatrices',
    additionalText_ear:
      "Conozca sus tímpanos: normal, <span style='color:red; font-weight:bold;'>rojo</span>, <span style='color:orange;'>abultado</span>, <span style='color:green;'>retráctil</span>, <span style='color:purple;'>perforado</span><br>&gt;Practique a menudo&lt;",

    pageTitle_howToExamineSkin: 'Cómo examinar la piel',
    generalObservationHeading: 'Observación general',
    generalObservationText:
      'Inspeccione bultos, <em>cambios de color</em> y distribución<br>Palpe suavemente para textura, temperatura o sensibilidad',
    uvLightHeading: 'Luz UV (de Wood)',
    uvLightText:
      "En una habitación oscura, verifique la fluorescencia característica:<br><span style='color:teal;'>tiña (azul-verde)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (naranja cobriza)</span>, <span style='color:#FF4040;'>erythrasma (rojo coral)</span>, <span style='color:blue;'>vitiligo (azul-blanco)</span>, <span style='color:orange;'>acné (rojo anaranjado)</span>, <span style='color:#BFEFFF;'>liendres de piojos (azul-pálido)</span>",
    dermoscopyHeading: 'Dermoscopia',
    dermoscopyText:
      '<strong><u>Sostenga el polarizador de Arclight como si fuera un bolígrafo</u></strong>, verifique: <strong>ABCDE</strong> (<em>Asimetría</em>, <em>Borde</em>, <em>Color</em>, <em>Diámetro &gt;6mm</em>, <em>Evolutivo</em>)<br>Estudie: PDSBV (<em>Red de pigmento</em>, <em>Puntos</em>, <em>Rayas</em>, <em>Azul-blanco</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Conozca su lesión: normal, <span style='color:red;'>sospechosa</span>, <span style='color:orange;'>inflamada</span><br>&gt;Practique a menudo&lt;",

    pageTitle_aboutAlan: 'Acerca de Alan',
    aboutAlanText:
      'Alan es un asistente de diagnóstico AI para ojos, oídos y piel, que integra un modelo de lenguaje fundamental y lógica simbólica. Inteligente. Serio. De última generación.<br><br>El conocimiento clínico, local y las imágenes se adaptan a roles como trabajadores de la salud y médicos generales. Un diálogo conciso genera un diagnóstico y un plan de manejo. El uso del arclight está integrado en todo momento.<br>',
    aboutAlanListItem1: 'Base experta – clima tropical/caluroso',
    aboutAlanListItem2: 'Consciente de Arclight',
    aboutAlanEfficient: '<strong>Eficiente</strong> – lenguaje conciso y sencillo',
    aboutAlanEasy: '<strong>Fácil de usar</strong> – app, voz, visión',
    aboutAlanExplainable: '<strong>Explicable</strong> – hechos/reglas, imágenes',
    aboutAlanEncouraging: '<strong>Animador</strong> – empatía, docente',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Instrucciones',
    instructionsIntro:
      'Alan es un asistente de IA para estudiantes y para aquellos que ocasionalmente se enfrentan a casos de ojos, oídos o piel. Escribe o habla claramente y evita revelar nombres o detalles identificativos. Observa detenidamente la cabeza/cara/parte del cuerpo y examina ambos ojos/oídos. ¡Buena suerte!',
    instructionsPatientPrompt: 'Cuéntale a Alan sobre tu paciente:',
    instructionsPatientDetail1: 'problema y comienzo',
    instructionsPatientDetail2: 'lo que ves',
    instructionsPatientDetail3: 'visión y pupilas',
    instructionsPatientDetail4: 'edad, sexo, medicación',
    instructionsUseArclight_default: 'Usa Arclight: frente, reflejo fundal, parte posterior del ojo.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Usa Arclight:</strong> <strong><em>frente, reflejo fundal, parte posterior del ojo.</em></strong>',
    instructionsTooLittle_eye: '¿Qué pasa con un ojo rojo?',
    instructionsJustRight_eye:
      'Hombre de 25 años, ojo rojo durante 3 días. Sin medicación ni problemas oculares previos. Dolor, lagrimeo, punto blanco en la córnea. Pupilas OK, visión 6/12 y 6/6 en el otro.',
    instructionsTooMuch_eye:
      "Este hombre llegó a la clínica hoy. Condujo al edificio con un ojo rojo y ahora piensa que la comida ingerida afecta su ojo. Veo lagrimeo y bordes rojos. Pide ayuda; hombre alto, con ojos lagrimosos, preocupado por la córnea y el dolor. Él pregunta: '¿Qué es esto?'",
    instructionsAdditionalQuery_eye: 'Alan también responde a dudas de enseñanza sobre los ojos: ¿Qué es Iritis? ¿Cómo veo la retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Usa Arclight:</strong> <strong><em>alrededor del oído, canal, tímpano.</em></strong>',
    instructionsTooLittle_ear: '¿Qué pasa con un oído rojo?',
    instructionsJustRight_ear:
      'Hombre de 25 años, oído rojo durante 3 días. Sin medicación ni problemas auriculares previos. Dolor, descarga auricular. Tímpano rojo, audición apagada en el oído afectado pero normal en el otro.',
    instructionsTooMuch_ear:
      "Este hombre llegó a la clínica hoy. Condujo al edificio con oídos rojos y ahora piensa que la comida ingerida afecta su oído. Veo descarga y bordes rojos. Pide ayuda; hombre alto, con oídos lacrimosos, preocupado por la audición y el dolor. Él pregunta: '¿Qué es esto?'",
    instructionsAdditionalQuery_ear: 'Alan también responde a dudas de enseñanza sobre los oídos: ¿Qué es Otitis Media? ¿Cómo limpio un oído?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Usa Arclight:</strong> <strong><em>Luz UV, dermoscopia.</em></strong>',
    instructionsTooLittle_skin: '¿Qué pasa con una piel roja?',
    instructionsJustRight_skin:
      'Hombre de 25 años, mancha roja en la piel durante 3 días. Sin medicación ni problemas cutáneos previos. Dolor e irritación.',
    instructionsTooMuch_skin:
      "Este hombre llegó a la clínica hoy. Condujo al edificio con piel roja y ahora piensa que la comida ingerida afecta su piel. Veo lagrimeo y bordes rojos. Pide ayuda; hombre alto, con piel roja, preocupado por la pigmentación y la irritación. Él pregunta: '¿Qué es esto?'",
    instructionsAdditionalQuery_skin: 'Alan también responde a dudas de enseñanza sobre la piel: ¿Qué es Eczema? ¿Cómo observo la red de pigmento?',
    instructionsLabelTooLittle: 'Muy poco',
    instructionsLabelJustRight: 'Adecuado',
    instructionsLabelTooMuch: 'Demasiado',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan es un asistente de IA para estudiantes y para quienes ocasionalmente se enfrentan a casos de ojos, oídos o piel. Escribe o habla claramente y evita revelar nombres o detalles identificativos.',
    goodLuck: '¡Buena suerte!',
    namePlaceholder: 'Nombre',
    // rolePlaceholder: 'Rol',

    // --- NEW "Experience" Dropdown Translations ---
    experiencePlaceholder: 'Experiencia',
    experienceStudentRefresher: 'Estudiante / actualización',
    experienceConfidentCore: 'Conocimiento básico sólido',
    experienceExpert: 'Experto',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 año',
    experienceOption2: '1-3 años',
    experienceOption3: '3-7 años',
    experienceOption4: '>7 años',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Objetivos',
    aimsOption1: 'Segunda opinión',
    aimsOption2: 'Consulta de condición',
    aimsOption3: 'Comunicar mejor',
    */
    contactPlaceholder: 'Contacto (correo/telefono)',
    acceptButton: 'Aceptar',

    images: "Imágenes",
    help: "Ayuda",
    screenshot: "Captura de pantalla",
    refer: "Remitir",
    comingSoon: "Próximamente..."
  },

  // 5) Arabic - ar
  ar: {
    eyesEars: 'العيون والأذنين والجلد',
    goodHistory: 'تاريخ جيد',
    examineWell: 'افحص جيدًا',
    useArclight: 'استخدم Arclight',
    howCanIHelp: 'كيف يمكنني مساعدتك اليوم؟',
    alanMistakes: `\u202Bآلان يمكن أن يخطئ. استخدم الحكم السريري. \u202A${new Date().getMonth() + 1}/25\u202C\u202B,`,
    login: 'تسجيل الدخول',
    enterPassword: 'أدخل كلمة المرور',
    register: 'تسجيل',
    name: 'اسم',
    password: 'كلمة السر (4 أرقام)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Arabic) ---
    aimsPlaceholder: 'الأهداف',
    aimsEyes: 'عيون',
    aimsEars: 'آذان',
    aimsSkin: 'جلد',
    aimsVeterinary: 'بيطري',
    aimsChildMaternal: 'طفل/أمومة',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'عامل صحي',
    nurse: 'ممرضة',
    ophthalmicOfficer: 'ضابط سريري بصري',
    medicalStudent: 'طالب طب',
    physicianAssociate: 'مساعد طبي',
    generalPractitioner: 'طبيب عام',
    hospitalDoctor: 'طبيب المستشفى',
    ophthalmologist: 'طبيب عيون',
    optometrist: 'أخصائي بصريات',
    orthoptist: 'أخصائي تقويم النظر',
    entSpecialist: 'أخصائي أنف وأذن وحنجرة',
    pharmacist: 'صيدلي',
    audiologist: 'أخصائي سمعيات',
    earCarePractitioner: 'ممارس العناية بالأذن',
    dermatologist: 'طبيب أمراض الجلد',
    */

    instructionsButton: 'كيفية الاستخدام',
    eyeButton: 'عين',
    earButton: 'أذن',
    skinButton: 'جلد',
    videosButton: 'فيديوهات',
    atomsButton: 'آتومز',
    toolsButton: 'أدوات',
    arclightProjectButton: 'مشروع Arclight',
    linksButton: 'روابط',
    aboutButton: 'حول',

    passwordTitle: 'أدخل كلمة مرور دعوة Alan',
    passwordPlaceholder: 'كلمة المرور',
    passwordErrorMsg: 'كلمة مرور غير صحيحة. حاول مرة أخرى',
    passwordSubmitBtn: 'إرسال',
    noCodeLine: "لا يوجد رمز أو أنه خاطئ؟ اتصل بنا <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>هنا</a>",

    eyeMarqueeLine1: 'ما هو الجلوكوما؟',
    eyeMarqueeLine2: 'كيف أرى القرص البصري باستخدام Arclight؟',
    eyeMarqueeLine3: 'رجل 25 سنة، عين حمراء لمدة 3 أيام، خوف من الضوء، تراجع طفيف في الرؤية',
    eyeMarqueeLine4: 'أخبرني عن التهاب القزحية',
    eyeMarqueeLine5: 'هل أحيل حالة السادّ الخلقي بشكل عاجل؟',
    eyeMarqueeLine6: 'امرأة 65 سنة، بصر ضعيف، لا ترتدي نظارة. الجزء الأمامي سليم، العدسة عاتمة',
    eyeMarqueeLine7: 'الأم قلقة لأن طفلها لديه بؤبؤ أبيض، دون رؤية في تلك العين',

    earMarqueeLine1: 'ما هو التهاب الأذن الوسطى؟',
    earMarqueeLine2: 'هل يمكنني رؤية طبلة الأذن باستخدام Arclight؟',
    earMarqueeLine3: 'فتى 16 سنة، ألم بالأذن لمدة يومين، حكة، سمعه جيد',
    earMarqueeLine4: 'حدثني عن غسيل الأذن',
    earMarqueeLine5: 'هل أحيل التهاب الخشاء عاجلًا؟',
    earMarqueeLine6: 'رجل 73 سنة، سمعه ضعيف. قناة الأذن غير واضحة. أرى شمع فقط',
    earMarqueeLine7: 'رضيع لا يستجيب للصوت منذ شهور',

    userInfoTitle: 'معلومات المستخدم',
    userName: 'الاسم',
    userContact: 'جهة الاتصال',
    userRole: 'الدور',
    userAimsPopupLabel: "الأهداف",
    // userAims: 'الأهداف',
    userLatLong: 'خط العرض وخط الطول',
    userArea: 'المنطقة',
    userCountry: 'الدولة',
    userVersion: 'الإصدار',
    userDateTime: 'التاريخ والوقت',
    geolocationButton: 'تحديد الموقع',
    geoInfoText: 'بالنقر على "تحديد الموقع" سيتم مشاركة موقع أكثر دقة (خط العرض/خط الطول). يساعد ذلك في تقديم إرشادات وخيارات أفضل.',

    pageTitle_howToExamineEye: 'كيفية فحص العين',
    frontOfEyeHeading: 'الجزء الأمامي من العين',
    frontOfEyeText:
      "راقب وقارن العينين: <em>مباشر،</em> <em>يمين،</em> <em>يسار،</em> <em>أعلى،</em> أسفل<br><strong><u>اقترب واحتفظ بالملاحظة</u></strong>. فحص: <em>الجفون،</em> <em>الملتحمة،</em> <em>القرنية،</em> <em>البؤبؤ</em><br>استخدم <span style='color: orange;'>الفلور</span> للكشف عن تقرحات القرنية أو الخدوش",
    fundalReflexHeading: 'الانعكاس القاعي',
    fundalReflexText:
      'غرفة <em>مظلمة</em>، الطفل سعيد؛ على مسافة الذراع – قارن الانعكاسات<br>متساوٍ: <em>السطوع،</em> <em>اللون،</em> <em>الشكل</em><br>اقترب لرؤية التفاصيل: <em>ندبة، إعتام عدسة، RB، نزيف زجاجي</em>',
    backOfEyeHeading: 'الجزء الخلفي من العين',
    backOfEyeText:
      'استخدم العين اليمنى لرؤية عين المريض اليمنى؛ اليسرى لليسار<br>يجب على المريض النظر بشكل مستقيم وليس نحو الضوء؛ اقترب وابحث عن القرص البصري (التوسيع = أفضل رؤية)<br>ادرس القرص: <em>الحافة،</em> <em>اللون،</em> <em>الكأس</em>. تتبع الأوعية الدموية الكبيرة، ثم اطلب من المريض النظر مباشرة إلى الضوء لرؤية البقعة الصفراء',
    additionalText_eye:
      "اعرف أقراصك: طبيعي، <span style='color:red; font-weight:bold;'>متورم،</span> <span style='color:red;'>أوعية جديدة،</span> <span style='color:orange;'>مكعب،</span> <span style='color:green;'>باهت</span><br>&gt;تدرب كثيراً&lt;",

    pageTitle_howToExamineEar: 'كيفية فحص الأذن',
    allAroundEarHeading: 'فحص محيط الأذن',
    allAroundEarText:
      'افحص: <em>الصيوان, </em><em>الطرف, </em><em>العظم الخددي</em> للكشف عن كتل، حساسية أو إفرازات<br>حرك الصيوان بلطف، ولاحظ أي ألم',
    earCanalHeading: 'قناة الأذن',
    earCanalText:
      'أمال الرأس، <strong><u>أمسك Arclight مثل القلم</u></strong><br>اسحب الصيوان لأعلى/خلف (للبالغين) أو لأسفل/خلف (للأطفال)<br>أدخل المنظار (4.5 مم للبالغين، 2.5 مم للأطفال)، ادفع الشعر جانباً، ودوّر عند الحاجة<br>ابحث عن: <em>شمع,</em> <em>فضلات,</em> <em>عدوى</em>',
    tympanicMembraneHeading: 'غشاء طبلي',
    tympanicMembraneText:
      'حدد مقبض المطرقة، انعكاس الضوء، والعلوي<br>لاحظ: <em>اللون,</em> <em>الموضع,</em> <em>شفافية</em><br>ابحث عن ثقب، سائل أو ندبات',
    additionalText_ear:
      "اعرف غشائك الطبلي: طبيعي، <span style='color:red; font-weight:bold;'>أحمر</span>, <span style='color:orange;'>منتفخ</span>, <span style='color:green;'>منسحب</span>, <span style='color:purple;'>مثقوب</span><br>&gt;تمرن كثيراً&lt;",

    pageTitle_howToExamineSkin: 'كيفية فحص الجلد',
    generalObservationHeading: 'الملاحظة العامة',
    generalObservationText: 'افحص الكتل، <em>تغيرات اللون</em> والتوزيع<br>حرّك الجلد بلطف لتقييم الملمس، درجة الحرارة أو الحساسية',
    uvLightHeading: 'ضوء الأشعة فوق البنفسجية (وودز)',
    uvLightText:
      "في غرفة مظلمة، تحقق من الفلوريسنس المميزة:<br><span style='color:teal;'>تينيا (أزرق-أخضر)</span>, <span style='color:#FF7F50;'>بيتيريازيس فيرسكيولار (برتقالي نحاسي)</span>, <span style='color:#FF4040;'>إريثراثرا (أحمر مرجاني)</span>, <span style='color:blue;'>فيتيليجو (أزرق-أبيض)</span>, <span style='color:orange;'>حب الشباب (أحمر برتقالي)</span>, <span style='color:#BFEFFF;'>بيوض قمل الرأس (أزرق باهت)</span>",
    dermoscopyHeading: 'التنظير الجلدي',
    dermoscopyText:
      '<strong><u>امسك جهاز Arclight الاستقطابي كما لو كان قلمًا</u></strong>، افحص: <strong>ABCDE</strong> (<em>عدم التماثل</em>, <em>الحدود</em>, <em>اللون</em>, <em>القطر &gt;6mm</em>, <em>متطور</em>)<br>ادرس: PDSBV (<em>شبكة الصبغة</em>, <em>النقاط</em>, <em>الخطوط</em>, <em>أزرق-أبيض</em>, <em>الأوعية الدموية</em>)',
    additionalText_skin:
      "تعرف على آفتك: طبيعية، <span style='color:red; font-weight:bold;'>مشكوكة</span>, <span style='color:orange;'>ملتهبة</span><br>&gt;تمرن كثيراً&lt;",

    pageTitle_aboutAlan: 'حول آلان',
    aboutAlanText:
      'آلان هو مساعد تشخيصي يعتمد على الذكاء الاصطناعي لفحص العين والأذن والجلد، يجمع بين نموذج لغوي أساسي ومنطق رمزي. ذكي. جاد. على أحدث طراز.<br><br>يتم تفصيل المعرفة السريرية والمحلية والصور لتناسب أدوارًا مثل العاملين في مجال الصحة والأطباء العامين. يولّد حوار موجز تشخيصًا وخطة علاج. ويظهر استخدام Arclight في كل مكان.<br>',
    aboutAlanListItem1: 'قاعدة خبراء – مناخ استوائي/حار',
    aboutAlanListItem2: 'مطلع على Arclight',
    aboutAlanEfficient: '<strong>فعال</strong> – لغة موجزة وواضحة',
    aboutAlanEasy: '<strong>سهل الاستخدام</strong> – تطبيق، صوت، رؤية',
    aboutAlanExplainable: '<strong>قابل للتفسير</strong> – حقائق/قواعد، صور',
    aboutAlanEncouraging: '<strong>مشجع</strong> – تعاطف، معلم',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'التعليمات',
    instructionsIntro:
      'Alan هو مساعد ذكاء اصطناعي للطلاب ولأولئك الذين يشاهدون حالات العين أو الأذن أو الجلد نادراً. اكتب أو تحدث بوضوح وتجنب ذكر الأسماء أو التفاصيل المُعرِّفة. افحص تماماً الرأس/الوجه/الجزء المعني وافحص كلا العينين/الأذنين. حظاً سعيداً!',
    instructionsPatientPrompt: 'أخبر Alan عن حالة مريضك:',
    instructionsPatientDetail1: 'المشكلة وبداية العرض',
    instructionsPatientDetail2: 'ما تلاحظه',
    instructionsPatientDetail3: 'الرؤية والحدقات',
    instructionsPatientDetail4: 'العمر، الجنس، الأدوية',
    instructionsUseArclight_default: 'استخدم Arclight: الجزء الأمامي، الانعكاس القاعي، الجزء الخلفي للعين.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>استخدم Arclight:</strong> <strong><em>الجزء الأمامي، الانعكاس القاعي، الجزء الخلفي للعين.</em></strong>',
    instructionsTooLittle_eye: 'ما الذي يحدث مع العين الحمراء؟',
    instructionsJustRight_eye:
      'رجل 25 سنة، عين حمراء لمدة 3 أيام. لم يتناول أي أدوية أو لم يكن لديه مشكلة سابقة بالعين. ألم، دموع، بقعة بيضاء على القرنية. الحدقات طبيعية، الرؤية 6/12 و6/6 في العين الأخرى.',
    instructionsTooMuch_eye:
      'وصل هذا الرجل إلى العيادة اليوم. دخل المبنى وهو يقود سيارته وعينه حمراء، ويعتقد أن الطعام الذي تناوله يؤثر على عينه. أرى دموعاً وحوافاً حمراء. هو بحاجة إلى المساعدة؛ رجل طويل، عيناه مبللتان، قلق بشأن القرنية والألم. ويقول: "ما هذا؟"',
    instructionsAdditionalQuery_eye: 'كما يجيب Alan على استفسارات تعليمية حول العين: ما هو التهاب القزحية؟ كيف أرى الشبكية؟',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>استخدم Arclight:</strong> <strong><em>حول الأذن، القناة، طبلة الأذن.</em></strong>',
    instructionsTooLittle_ear: 'ما الذي يحدث مع الأذن الحمراء؟',
    instructionsJustRight_ear:
      'رجل 25 سنة، أذن حمراء لمدة 3 أيام. لم يتناول أدوية أو لم يكن لديه مشكلة سابقة بالأذن. ألم، إفرازات أذنية. طبلة حمراء، السمع مكتوم في الأذن المتأثرة لكن طبيعي في الأخرى.',
    instructionsTooMuch_ear:
      'وصل هذا الرجل إلى العيادة اليوم. دخل المبنى وعنين حمراء، ويعتقد أن الطعام الذي تناوله يؤثر على أذنه. أرى إفرازات وحوافاً حمراء. هو بحاجة إلى المساعدة؛ رجل طويل، أذنين مبللتين، قلق بشأن السمع والألم. ويقول: "ما هذا؟"',
    instructionsAdditionalQuery_ear: 'كما يجيب Alan على استفسارات تعليمية حول الأذن: ما هو التهاب الأذن الوسطى؟ كيف أنظف الأذن؟',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>استخدم Arclight:</strong> <strong><em>نور فوق بنفسجي، تنظير جلدي.</em></strong>',
    instructionsTooLittle_skin: 'ما الذي يحدث مع البشرة الحمراء؟',
    instructionsJustRight_skin: 'رجل 25 سنة، بقعة جلدية حمراء لمدة 3 أيام. لم يتناول أدوية أو لم يكن لديه مشكلة سابقة بالجلد. جلد مؤلم وخاشع.',
    instructionsTooMuch_skin:
      'وصل هذا الرجل إلى العيادة اليوم. دخل المبنى وبشرته حمراء، ويعتقد أن الطعام الذي تناوله يؤثر على بشرته. أرى دموعاً وحوافاً حمراء. هو بحاجة إلى المساعدة؛ رجل طويل، بشرة حمراء، قلق بشأن الصبغة والتهيج. ويقول: "ما هذا؟"',
    instructionsAdditionalQuery_skin: 'كما يجيب Alan على استفسارات تعليمية حول الجلد: ما هو الأكزيما؟ كيف أرى شبكة الصبغة؟',
    instructionsLabelTooLittle: 'قليل جدًا',
    instructionsLabelJustRight: 'مناسب',
    instructionsLabelTooMuch: 'كثير جدًا',

    // --- Onboarding Page Translations ---
    instructionText: '(ARABIC: Alan is an AI assistant for students and those who only occasionally see eye, ear or skin cases. Write or speak clearly and avoid identifying names or details.)',
    goodLuck: '(ARABIC: Good luck!)',
    namePlaceholder: '(ARABIC: Name)',
    // rolePlaceholder: '(ARABIC: Role)',

    // --- NEW "Experience" Dropdown Translations (Needs review for Arabic) ---
    experiencePlaceholder: 'الخبرة',
    experienceStudentRefresher: 'طالب / تحديث',
    experienceConfidentCore: 'معرفة أساسية واثقة',
    experienceExpert: 'خبير',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '(ARABIC: <1 yr)',
    experienceOption2: '(ARABIC: 1-3 yr)',
    experienceOption3: '(ARABIC: 3-7 yr)',
    experienceOption4: '(ARABIC: >7 yr)',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: '(ARABIC: Aims)',
    aimsOption1: '(ARABIC: Second opinion)',
    aimsOption2: '(ARABIC: Condition lookup)',
    aimsOption3: '(ARABIC: Communicate better)',
    */
    contactPlaceholder: '(ARABIC: Contact (email/phone))',
    acceptButton: '(ARABIC: Accept)',

    images: "صور",
    help: "مساعدة",
    screenshot: "لقطة شاشة",
    refer: "إحالة",
    comingSoon: "قريباً..."
  },

  // 6) French - fr
  fr: {
    eyesEars: 'Yeux, Oreilles, Peau',
    goodHistory: 'Bonne Anamnèse',
    examineWell: 'Bien Examiner',
    useArclight: 'Utiliser Arclight',
    howCanIHelp: "Comment puis-je vous aider aujourd'hui ?",
    alanMistakes: `Alan peut se tromper. Utilisez votre jugement clinique. ${new Date().getMonth() + 1}/25,`,
    login: 'Connexion',
    enterPassword: 'Entrez le mot de passe',
    register: "S'inscrire",
    name: 'Nom',
    password: 'Mot de passe (4 chiffres)',

    // --- NEW "Aims" Dropdown Translations (Needs review for French) ---
    aimsPlaceholder: 'Objectifs',
    aimsEyes: 'Yeux',
    aimsEars: 'Oreilles',
    aimsSkin: 'Peau',
    aimsVeterinary: 'Vétérinaire',
    aimsChildMaternal: 'Enfant/Maternel',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Agent de santé',
    nurse: 'Infirmier/Infirmière',
    ophthalmicOfficer: 'Officier clinique ophtalmique',
    medicalStudent: 'Étudiant en médecine',
    physicianAssociate: 'Associé médical',
    generalPractitioner: 'Médecin généraliste',
    hospitalDoctor: 'Médecin hospitalier',
    ophthalmologist: 'Ophtalmologiste',
    optometrist: 'Optométriste',
    orthoptist: 'Orthoptiste',
    entSpecialist: 'Spécialiste ORL',
    pharmacist: 'Pharmacien',
    audiologist: 'Audiologiste',
    earCarePractitioner: "Praticien soins de l'oreille",
    dermatologist: 'Dermatologue',
    */

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

    passwordTitle: 'Entrez votre mot de passe d’invitation Alan',
    passwordPlaceholder: 'Mot de passe',
    passwordErrorMsg: 'Mot de passe invalide. Veuillez réessayer',
    passwordSubmitBtn: 'Valider',
    noCodeLine: "Pas ou mauvais code ? Contactez-nous <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>ici</a>",

    eyeMarqueeLine1: "Qu'est-ce que le glaucome ?",
    eyeMarqueeLine2: "Comment voir la papille optique avec l'Arclight ?",
    eyeMarqueeLine3: 'Homme de 25 ans, œil rouge depuis 3 jours, photophobie, AV légèrement diminuée',
    eyeMarqueeLine4: "Parlez-moi de l'iritis",
    eyeMarqueeLine5: 'Faut-il orienter une cataracte congénitale en urgence ?',
    eyeMarqueeLine6: 'Femme de 65 ans, mauvaise vision, pas de lunettes. Segment antérieur correct, cristallin opacifié',
    eyeMarqueeLine7: "Mère inquiète d'un bébé avec une pupille blanche, pas de vision",

    earMarqueeLine1: "Qu'est-ce que l'otite moyenne ?",
    earMarqueeLine2: 'Puis-je voir le tympan avec mon Arclight ?',
    earMarqueeLine3: 'Garçon de 16 ans, pavillon douloureux depuis 2 jours, démangeaisons, audition correcte',
    earMarqueeLine4: 'Parlez-moi du syringage',
    earMarqueeLine5: 'Dois-je référer une mastoïdite en urgence ?',
    earMarqueeLine6: 'Homme de 73 ans, audition diminuée. Conduit auditif mal visible. Je ne vois que du cérumen',
    earMarqueeLine7: 'Bébé ne réagit pas au son depuis des mois',

    userInfoTitle: 'Informations Utilisateur',
    userName: 'Nom',
    userContact: 'Contact',
    userRole: 'Rôle',
    userAimsPopupLabel: "Objectifs",
    // userAims: 'Objectifs',
    userLatLong: 'Lat & Long',
    userArea: 'Zone',
    userCountry: 'Pays',
    userVersion: 'Version',
    userDateTime: 'Date & Heure',
    geolocationButton: 'Géolocalisation',
    geoInfoText:
      'En cliquant sur "Géolocalisation", une position plus précise (lat/long) sera partagée. Cela aide à offrir de meilleures orientations et options.',

    pageTitle_howToExamineEye: "Comment examiner l'œil",
    frontOfEyeHeading: "Avant de l'œil",
    frontOfEyeText:
      "Observez et comparez les yeux : <em>de face,</em> <em>à droite,</em> <em>à gauche,</em> <em>vers le haut,</em> vers le bas<br><strong><u>Approchez-vous</u></strong> et maintenez. Examinez : <em>paupières,</em> <em>conjonctive,</em> <em>cornée,</em> <em>pupille</em><br>Utilisez avec <span style='color: orange;'>fluor</span> pour les ulcères ou éraflures cornéennes",
    fundalReflexHeading: 'Réflexe fondal',
    fundalReflexText:
      'Salle <em>faiblement éclairée</em>, bébé content ; à distance d’un bras – comparez les réflexes<br>Égal : <em>Luminosité,</em> <em>Couleur,</em> <em>Forme</em><br>Approchez-vous pour voir les détails : <em>Cicatrice, cataracte, RB, hémorragie vitréenne</em>',
    backOfEyeHeading: "Arrière de l'œil",
    backOfEyeText:
      "Utilisez l'œil droit pour voir l'œil droit du patient ; gauche pour la gauche<br>Le patient doit regarder droit et non vers la lumière ; rapprochez-vous et trouvez le disque optique (Dilater = meilleure vue)<br>Étudiez le disque : <em>Bord,</em> <em>Couleur,</em> <em>Coupe</em>. Suivez les gros vaisseaux, puis demandez au patient de regarder directement la lumière pour voir la macula",
    additionalText_eye:
      "Connaissez vos disques : normal, <span style='color:red; font-weight:bold;'>enflé,</span> <span style='color:red;'>nouveaux vaisseaux,</span> <span style='color:orange;'>en forme de coupe,</span> <span style='color:green;'>pâle</span><br>&gt;Pratiquez souvent&lt;",

    pageTitle_howToExamineEar: "Comment examiner l'oreille",
    allAroundEarHeading: "Autour de l'oreille",
    allAroundEarText:
      "Vérifiez : <em>l'oreille externe, </em><em>le tragus, </em><em>la mastoïde</em> pour des masses, sensibilité ou écoulement<br>Déplacez doucement l'oreille, notez toute douleur",
    earCanalHeading: 'Conduit auditif',
    earCanalText:
      "Inclinez la tête, <strong><u>tenez l'Arclight comme un stylo</u></strong><br>Tirez l'oreille vers le haut/arrière (adultes) ou vers le bas/arrière (enfants)<br>Insérez le spéculum (4.5mm adulte, 2.5mm nourrisson), repoussez les poils, faites tourner si nécessaire<br>Recherchez : <em>cérumen,</em> <em>débris,</em> <em>infection</em>",
    tympanicMembraneHeading: 'Membrane tympanique',
    tympanicMembraneText:
      "Identifiez la poignée du marteau, le reflet lumineux, et l'attique<br>Notez : <em>la couleur,</em> <em>la position,</em> <em>la translucidité</em><br>Recherchez perforation, liquide ou cicatrices",
    additionalText_ear:
      "Connaissez votre tympan : normal, <span style='color:red; font-weight:bold;'>rouge</span>, <span style='color:orange;'>bombé</span>, <span style='color:green;'>rétracté</span>, <span style='color:purple;'>perforé</span><br>&gt;Exercez-vous souvent&lt;",

    pageTitle_howToExamineSkin: 'Comment examiner la peau',
    generalObservationHeading: 'Observation générale',
    generalObservationText:
      'Inspectez les masses, <em>les changements de couleur</em> et la distribution<br>Palpez doucement pour évaluer la texture, la température ou la sensibilité',
    uvLightHeading: 'Lumière UV (Wood’s)',
    uvLightText:
      "Dans une pièce plongée dans le noir, vérifiez la fluorescence caractéristique :<br><span style='color:teal;'>teigne (bleu-vert)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (orange cuivré)</span>, <span style='color:#FF4040;'>érythrasma (rouge corail)</span>, <span style='color:blue;'>vitiligo (bleu-blanc)</span>, <span style='color:orange;'>acné (rouge orangé)</span>, <span style='color:#BFEFFF;'>poux de tête (bleu pâle)</span>",
    dermoscopyHeading: 'Dermoscopie',
    dermoscopyText:
      '<strong><u>Tenez le polariseur Arclight comme un stylo</u></strong>, vérifiez : <strong>ABCDE</strong> (<em>Asymétrie</em>, <em>Bord</em>, <em>Couleur</em>, <em>Diamètre &gt;6mm</em>, <em>Évolutif</em>)<br>Étudiez : PDSBV (<em>Réseau pigmentaire</em>, <em>Points</em>, <em>Rayures</em>, <em>Bleu-blanc</em>, <em>Vascularisé</em>)',
    additionalText_skin:
      "Connaissez votre lésion : normale, <span style='color:red;'>suspecte</span>, <span style='color:orange;'>inflammée</span><br>&gt;Exercez-vous souvent&lt;",

    pageTitle_aboutAlan: "À propos d'Alan",
    aboutAlanText:
      "Alan est un assistant de diagnostic en intelligence artificielle pour l'œil, l'oreille et la peau, composé d'un modèle linguistique de base et d'une logique symbolique. Intelligent. Sérieux. À la pointe de la technologie.<br><br>Les connaissances cliniques, locales et les images sont adaptées à différents rôles tels que les professionnels de la santé et les médecins généralistes. Un dialogue concis génère un diagnostic et un plan de prise en charge. L'utilisation de l'Arclight est intégrée dans tout le processus.<br>",
    aboutAlanListItem1: "Base d'experts – climat tropical/chaud",
    aboutAlanListItem2: "Connaissant l'Arclight",
    aboutAlanEfficient: '<strong>Efficace</strong> – langage concis et simple',
    aboutAlanEasy: '<strong>Facile à utiliser</strong> – application, voix, vision',
    aboutAlanExplainable: '<strong>Explicable</strong> – faits/règles, images',
    aboutAlanEncouraging: '<strong>Encourageant</strong> – empathie, enseignant',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Instructions',
    instructionsIntro:
      'Alan est un assistant IA destiné aux étudiants et à ceux qui ne rencontrent que rarement des cas d’yeux, d’oreilles ou de peau. Écrivez ou parlez clairement et évitez de révéler des noms ou des détails identifiants. Examinez entièrement la tête, le visage ou la partie du corps et observez les deux yeux ou oreilles. Bonne chance !',
    instructionsPatientPrompt: 'Parlez à Alan de votre patient :',
    instructionsPatientDetail1: 'problème et début',
    instructionsPatientDetail2: 'ce que vous observez',
    instructionsPatientDetail3: 'vision et pupilles',
    instructionsPatientDetail4: 'âge, sexe, médication',
    instructionsUseArclight_default: 'Utilisez Arclight : avant, réflexe fundal, arrière de l’œil.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Utilisez Arclight :</strong> <strong><em>avant, réflexe fundal, arrière de l’œil.</em></strong>',
    instructionsTooLittle_eye: 'homme, œil rouge, quoi ?',
    instructionsJustRight_eye:
      'Homme de 25 ans, œil rouge depuis 3 jours. Pas de médication ni de problème oculaire antérieur. Douleur, larmoiement, point blanc sur la cornée. Pupilles OK, vision 6/12 et 6/6 côté opposé.',
    instructionsTooMuch_eye:
      "Cet homme est venu en clinique aujourd'hui. Il est entré dans l’immeuble en conduisant avec un œil rouge et pense que la nourriture ingérée affecte son œil. J’observe des larmoiements et des bords rouges. Il demande de l’aide – homme grand, yeux larmoyants, inquiet pour la cornée et la douleur. Il demande : « Qu’est-ce que c’est ? »",
    instructionsAdditionalQuery_eye:
      'Alan répond également aux questions pédagogiques sur l’œil : Qu’est-ce que l’iridocyclitis ? Comment puis-je voir la rétine ?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Utilisez Arclight :</strong> <strong><em>autour de l’oreille, conduit auditif, tympan.</em></strong>',
    instructionsTooLittle_ear: 'homme, oreille rouge, quoi ?',
    instructionsJustRight_ear:
      'Homme de 25 ans, oreille rouge depuis 3 jours. Pas de médication ni de problème auriculaire antérieur. Douleur, écoulement auriculaire. Tympan rouge, audition étouffée dans l’oreille affectée mais normale dans l’autre.',
    instructionsTooMuch_ear:
      "Cet homme est venu en clinique aujourd'hui. Il est entré dans l’immeuble avec des oreilles rouges et pense que la nourriture ingérée affecte son oreille. J’observe un écoulement et des bords rouges. Il demande de l’aide – homme grand, oreilles larmoyantes, inquiet pour l’audition et la douleur. Il demande : « Qu’est-ce que c’est ? »",
    instructionsAdditionalQuery_ear:
      'Alan répond également aux questions pédagogiques sur l’oreille : Qu’est-ce que l’otite moyenne ? Comment nettoyer une oreille ?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Utilisez Arclight :</strong> <strong><em>Lumière UV, dermoscopie.</em></strong>',
    instructionsTooLittle_skin: 'homme, peau rouge, quoi ?',
    instructionsJustRight_skin:
      'Homme de 25 ans, tache cutanée rouge depuis 3 jours. Pas de médication ni de problème cutané antérieur. Peau douloureuse et qui démange.',
    instructionsTooMuch_skin:
      "Cet homme est venu en clinique aujourd'hui. Il est entré dans l’immeuble avec une peau rouge et pense que la nourriture ingérée affecte sa peau. J’observe des larmoiements et des bords rouges. Il demande de l’aide – homme grand, peau rouge, inquiet pour la pigmentation et l’irritation. Il demande : « Qu’est-ce que c’est ? »",
    instructionsAdditionalQuery_skin:
      'Alan répond également aux questions pédagogiques sur la peau : Qu’est-ce que l’eczéma ? Comment observer le réseau pigmentaire ?',
    instructionsLabelTooLittle: 'Trop peu',
    instructionsLabelJustRight: 'Juste assez',
    instructionsLabelTooMuch: 'Beaucoup trop',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan est un assistant IA pour les étudiants et ceux qui rencontrent occasionnellement des cas d’yeux, d’oreilles ou de peau. Écrivez ou parlez clairement et évitez de révéler des noms ou détails identifiants.',
    goodLuck: 'Bonne chance !',
    namePlaceholder: 'Nom',
    // rolePlaceholder: 'Rôle',

    // --- NEW "Experience" Dropdown Translations (Needs review for French) ---
    experiencePlaceholder: 'Expérience',
    experienceStudentRefresher: 'Étudiant / recyclage',
    experienceConfidentCore: 'Connaissances de base solides',
    experienceExpert: 'Expert',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 an',
    experienceOption2: '1-3 ans',
    experienceOption3: '3-7 ans',
    experienceOption4: '>7 ans',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Objectifs',
    aimsOption1: 'Deuxième avis',
    aimsOption2: 'Recherche de condition',
    aimsOption3: 'Communiquer mieux',
    */
    contactPlaceholder: 'Contact (email/téléphone)',
    acceptButton: 'Accepter',

    images: "Images",
    help: "Aide",
    screenshot: "Capture d’écran",
    refer: "Référer",
    comingSoon: "Bientôt disponible..."
  },

  // 7) Portuguese - pt
  pt: {
    eyesEars: 'Olhos, Ouvidos e Pele',
    goodHistory: 'Boa História',
    examineWell: 'Examinar Bem',
    useArclight: 'Usar Arclight',
    howCanIHelp: 'Como posso ajudá-lo hoje?',
    alanMistakes: `Alan pode cometer erros. Use o julgamento clínico. ${new Date().getMonth() + 1}/25,`,
    login: 'Entrar',
    enterPassword: 'Digite a senha',
    register: 'Registrar',
    name: 'Nome',
    password: 'Senha (4 dígitos)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Portuguese) ---
    aimsPlaceholder: 'Objetivos',
    aimsEyes: 'Olhos',
    aimsEars: 'Ouvidos',
    aimsSkin: 'Pele',
    aimsVeterinary: 'Veterinária',
    aimsChildMaternal: 'Infantil/Materno',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Trabalhador da saúde',
    nurse: 'Enfermeiro',
    ophthalmicOfficer: 'Oficial clínico oftálmico',
    medicalStudent: 'Estudante de Medicina',
    physicianAssociate: 'Associado médico',
    generalPractitioner: 'Clínico geral',
    hospitalDoctor: 'Médico hospitalar',
    ophthalmologist: 'Oftalmologista',
    optometrist: 'Optometrista',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Especialista em Otorrinolaringologia',
    pharmacist: 'Farmacêutico',
    audiologist: 'Audiologista',
    earCarePractitioner: 'Praticante de cuidados auditivos',
    dermatologist: 'Dermatologista',
    */

    instructionsButton: 'Como usar',
    eyeButton: 'Olho',
    earButton: 'Orelha',
    skinButton: 'Pele',
    videosButton: 'Vídeos',
    atomsButton: 'Átomos',
    toolsButton: 'Ferramentas',
    arclightProjectButton: 'Projeto Arclight',
    linksButton: 'Links',
    aboutButton: 'Sobre',

    passwordTitle: 'Digite a senha de convite do Alan',
    passwordPlaceholder: 'Senha',
    passwordErrorMsg: 'Senha inválida. Tente novamente',
    passwordSubmitBtn: 'Enviar',
    noCodeLine:
      "Sem código ou código incorreto? Entre em contato <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>aqui</a>",

    eyeMarqueeLine1: 'O que é glaucoma?',
    eyeMarqueeLine2: 'Como vejo o disco óptico com o Arclight?',
    eyeMarqueeLine3: 'Homem 25 anos, olho vermelho há 3 dias, fotofobia, AV um pouco reduzida',
    eyeMarqueeLine4: 'Fale-me sobre irite',
    eyeMarqueeLine5: 'Devo encaminhar catarata congênita com urgência?',
    eyeMarqueeLine6: 'Mulher 65 anos, visão ruim, sem óculos. Parte anterior ok, cristalino opaco',
    eyeMarqueeLine7: 'Mãe preocupada: bebê com pupila branca, sem visão nesse olho',

    earMarqueeLine1: 'O que é otite média?',
    earMarqueeLine2: 'Posso ver a membrana timpânica com meu Arclight?',
    earMarqueeLine3: 'Rapaz 16 anos, dor no pavilhão há 2 dias, coceira, audição boa',
    earMarqueeLine4: 'Fale-me sobre a lavagem de ouvido (syringing)',
    earMarqueeLine5: 'Devo encaminhar mastoidite urgentemente?',
    earMarqueeLine6: 'Homem 73 anos, audição ruim. Canal auditivo pouco visível. Apenas cera',
    earMarqueeLine7: 'Bebê sem resposta à voz. Há meses assim',

    userInfoTitle: 'Informações do Usuário',
    userName: 'Nome',
    userContact: 'Contato',
    userRole: 'Função',
    userAimsPopupLabel: "Objetivos",
    // userAims: 'Objetivos',
    userLatLong: 'Lat & Long',
    userArea: 'Área',
    userCountry: 'País',
    userVersion: 'Versão',
    userDateTime: 'Data & Hora',
    geolocationButton: 'Geolocalização',
    geoInfoText:
      'Ao clicar em "Geolocalização", será partilhada uma localização (lat/long) mais precisa. Isto ajuda a oferecer uma melhor orientação e opções.',

    pageTitle_howToExamineEye: 'Como examinar o olho',
    frontOfEyeHeading: 'Parte frontal do olho',
    frontOfEyeText:
      "Observe e compare os olhos: <em>direto,</em> <em>direita,</em> <em>esquerda,</em> <em>para cima,</em> para baixo<br><strong><u>Segure e aproxime-se</u></strong>. Examine: <em>pálpebras,</em> <em>conjuntiva,</em> <em>córnea,</em> <em>pupila</em><br>Use com <span style='color: orange;'>fluor</span> para úlceras ou arranhões na córnea",
    fundalReflexHeading: 'Reflexo fundal',
    fundalReflexText:
      'Ambiente <em>escuro</em>, bebê feliz; à distância de um braço – compare os reflexos<br>Igual: <em>Brilho,</em> <em>Cor,</em> <em>Forma</em><br>Chegue mais perto para detalhes: <em>Cicatriz, catarata, RB, Hemorragia vítrea</em>',
    backOfEyeHeading: 'Parte de trás do olho',
    backOfEyeText:
      'Use o olho direito para ver o olho direito do paciente; esquerdo para o esquerdo<br>O paciente deve olhar em linha reta, NÃO para a luz; aproxime-se e encontre o disco óptico (Dilatar = melhor visão)<br>Estude o disco: <em>Borda,</em> <em>Cor,</em> <em>Copa</em>. Observe os grandes vasos, então peça ao paciente que olhe diretamente para a luz para ver a mácula',
    additionalText_eye:
      "Conheça seus discos: normal, <span style='color:red; font-weight:bold;'>inchado,</span> <span style='color:red;'>novos vasos,</span> <span style='color:orange;'>em forma de copa,</span> <span style='color:green;'>pálido</span><br>&gt;Pratique frequentemente&lt;",

    pageTitle_howToExamineEar: 'Como examinar o ouvido',
    allAroundEarHeading: 'Ao redor do ouvido',
    allAroundEarText:
      'Verifique: <em>orelha, </em><em>trago, </em><em>mastóide</em> para nódulos, sensibilidade ou secreção<br>Mova suavemente a orelha, observe se há dor',
    earCanalHeading: 'Canal auditivo',
    earCanalText:
      'Incline a cabeça, <strong><u>segure o Arclight como uma caneta</u></strong><br>Puxe a orelha para cima/trás (adultos) ou para baixo/trás (crianças)<br>Insira o espéculo (4.5mm adulto, 2.5mm infantil), empurre os pelos, gire se necessário<br>Procure: <em>cera,</em> <em>detritos,</em> <em>infecção</em>',
    tympanicMembraneHeading: 'Membrana timpânica',
    tympanicMembraneText:
      'Identifique o cabo do martelo, o reflexo de luz e o ático<br>Note: <em>cor,</em> <em>posição,</em> <em>translucidez</em><br>Procure perfuração, líquido ou cicatrizes',
    additionalText_ear:
      "Conheça seu tímpano: normal, <span style='color:red; font-weight:bold;'>vermelho</span>, <span style='color:orange;'>inchaço</span>, <span style='color:green;'>retrátil</span>, <span style='color:purple;'>perfurado</span><br>&gt;Pratique sempre&lt;",

    pageTitle_howToExamineSkin: 'Como examinar a pele',
    generalObservationHeading: 'Observação geral',
    generalObservationText:
      'Inspecione nódulos, <em>alterações de cor</em> e distribuição<br>Palpe suavemente para textura, temperatura ou sensibilidade',
    uvLightHeading: 'Luz UV (Wood’s)',
    uvLightText:
      "Em um quarto escuro, verifique a fluorescência característica:<br><span style='color:teal;'>tinea (azul-verde)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (laranja acobreada)</span>, <span style='color:#FF4040;'>erythrasma (vermelho coral)</span>, <span style='color:blue;'>vitiligo (azul-branco)</span>, <span style='color:orange;'>acne (vermelho alaranjado)</span>, <span style='color:#BFEFFF;'>lêndeas de piolhos (azul-pálido)</span>",
    dermoscopyHeading: 'Dermoscopia',
    dermoscopyText:
      '<strong><u>Mantenha o polarizador Arclight como uma caneta</u></strong>, verifique: <strong>ABCDE</strong> (<em>Assimetria</em>, <em>Borda</em>, <em>Cor</em>, <em>Diâmetro &gt;6mm</em>, <em>Evolutivo</em>)<br>Estude: PDSBV (<em>Rede de pigmento</em>, <em>Pontos</em>, <em>Linhas</em>, <em>Azul-branco</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Conheça sua lesão: normal, <span style='color:red;'>suspeita</span>, <span style='color:orange;'>inflamada</span><br>&gt;Pratique sempre&lt;",

    pageTitle_aboutAlan: 'Sobre Alan',
    aboutAlanText:
      'Alan é um assistente de diagnóstico por IA para olhos, ouvidos e pele, composto por um modelo linguístico fundamental e lógica simbólica. Inteligente. Sério. De última geração.<br><br>O conhecimento clínico, local e as imagens são adaptados para diferentes funções, como trabalhadores de saúde e médicos generalistas. Um diálogo conciso gera um diagnóstico e um plano de manejo. O uso do Arclight está incorporado em todo o processo.<br>',
    aboutAlanListItem1: 'Base de especialistas – clima tropical/quente',
    aboutAlanListItem2: 'Conhecedor do Arclight',
    aboutAlanEfficient: '<strong>Eficiente</strong> – linguagem concisa e simples',
    aboutAlanEasy: '<strong>Fácil de usar</strong> – aplicativo, voz, visão',
    aboutAlanExplainable: '<strong>Explicável</strong> – fatos/regras, imagens',
    aboutAlanEncouraging: '<strong>Incentivador</strong> – empatia, professor',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Instruções',
    instructionsIntro:
      'Alan é um assistente de IA para estudantes e para aqueles que ocasionalmente se enfrentam a casos de olhos, ouvidos ou pele. Escreva ou fale claramente e evite revelar nomes ou detalhes identificadores. Observe bem a cabeça/rosto/parte do corpo e examine ambos os olhos/ouvidos. Boa sorte!',
    instructionsPatientPrompt: 'Conte a Alan sobre o seu paciente:',
    instructionsPatientDetail1: 'problema e início',
    instructionsPatientDetail2: 'o que você observa',
    instructionsPatientDetail3: 'visão e pupilas',
    instructionsPatientDetail4: 'idade, sexo, medicação',
    instructionsUseArclight_default: 'Use Arclight: frente, reflexo fundal, parte de trás do olho.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Use Arclight:</strong> <strong><em>frente, reflexo fundal, parte de trás do olho.</em></strong>',
    instructionsTooLittle_eye: 'Homem, olho vermelho, o quê?',
    instructionsJustRight_eye:
      'Homem de 25 anos, olho vermelho por 3 dias. Sem medicação ou problemas oculares prévios. Dor, lacrimejamento, ponto branco na córnea. Pupilas OK, visão 6/12 e 6/6 no outro.',
    instructionsTooMuch_eye:
      "Este homem chegou à clínica hoje. Ele entrou no prédio dirigindo e seu olho está vermelho; ele acha que o alimento ingerido está afetando seu olho. Vejo lacrimejamento e bordas vermelhas. Ele precisa de ajuda—homem alto, com olhos lacrimosos, preocupado com a córnea e a dor. Ele diz: 'O que é isso?'",
    instructionsAdditionalQuery_eye: 'Alan também responde a dúvidas de ensino sobre os olhos: O que é Irite? Como vejo a retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Use Arclight:</strong> <strong><em>ao redor do ouvido, canal auditivo, tímpano.</em></strong>',
    instructionsTooLittle_ear: 'Homem, ouvido vermelho, o quê?',
    instructionsJustRight_ear:
      'Homem de 25 anos, ouvido vermelho por 3 dias. Sem medicação ou problemas auriculares prévios. Dor, descarga auricular. Tímpano vermelho, audição abafada no ouvido afetado mas normal no outro.',
    instructionsTooMuch_ear:
      "Este homem chegou à clínica hoje. Ele entrou no prédio com os ouvidos vermelhos e agora pensa que o alimento ingerido está afetando seu ouvido. Vejo descarga e bordas vermelhas. Ele precisa de ajuda—homem alto, com ouvidos lacrimosos, preocupado com a audição e a dor. Ele diz: 'O que é isso?'",
    instructionsAdditionalQuery_ear: 'Alan também responde a dúvidas de ensino sobre os ouvidos: O que é Otite Média? Como limpo um ouvido?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Use Arclight:</strong> <strong><em>Luz UV, dermoscopia.</em></strong>',
    instructionsTooLittle_skin: 'Homem, pele vermelha, o quê?',
    instructionsJustRight_skin: 'Homem de 25 anos, mancha vermelha na pele por 3 dias. Sem medicação ou problemas cutâneos prévios. Dor e irritação.',
    instructionsTooMuch_skin:
      "Este homem chegou à clínica hoje. Ele entrou no prédio com a pele vermelha e agora pensa que o alimento ingerido está afetando sua pele. Vejo lacrimejamento e bordas vermelhas. Ele precisa de ajuda—homem alto, com pele vermelha, preocupado com a pigmentação e irritação. Ele diz: 'O que é isso?'",
    instructionsAdditionalQuery_skin: 'Alan também responde a dúvidas de ensino sobre a pele: O que é Eczema? Como observo a rede de pigmento?',
    instructionsLabelTooLittle: 'Muito pouco',
    instructionsLabelJustRight: 'Na medida certa',
    instructionsLabelTooMuch: 'Demais',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan é um assistente de IA para estudantes e para aqueles que ocasionalmente se deparam com casos de olhos, ouvidos ou pele. Escreva ou fale claramente e evite revelar nomes ou detalhes identificativos.',
    goodLuck: 'Boa sorte!',
    namePlaceholder: 'Nome',
    // rolePlaceholder: 'Função',

    // --- NEW "Experience" Dropdown Translations (Needs review for Portuguese) ---
    experiencePlaceholder: 'Experiência',
    experienceStudentRefresher: 'Estudante / reciclagem',
    experienceConfidentCore: 'Conhecimento central confiante',
    experienceExpert: 'Perito',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 ano',
    experienceOption2: '1-3 anos',
    experienceOption3: '3-7 anos',
    experienceOption4: '>7 anos',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Objetivos',
    aimsOption1: 'Segunda opinião',
    aimsOption2: 'Consulta de condição',
    aimsOption3: 'Comunicar melhor',
    */
    contactPlaceholder: 'Contato (email/telefone)',
    acceptButton: 'Aceitar',

    images: "Imagens",
    help: "Ajuda",
    screenshot: "Captura de tela",
    refer: "Encaminhar",
    comingSoon: "Em breve..."
  },

  // 8) Bangla - bn
  bn: {
    eyesEars: 'চোখ, কান, ত্বক',
    goodHistory: 'ভালো ইতিহাস',
    examineWell: 'ভালো করে পরীক্ষা করুন',
    useArclight: 'Arclight ব্যবহার করুন',
    howCanIHelp: 'আমি কীভাবে সাহায্য করতে পারি?',
    alanMistakes: `Alan ভুল করতে পারে। দয়া করে ক্লিনিকাল বিচার ব্যবহার করুন। ${new Date().getMonth() + 1}/25,`,
    login: 'লগইন',
    enterPassword: 'পাসওয়ার্ড দিন',
    register: 'রেজিস্টার',
    name: 'নাম',
    password: 'পাসওয়ার্ড (4-ডিজিট)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Bangla) ---
    aimsPlaceholder: 'লক্ষ্য',
    aimsEyes: 'চোখ',
    aimsEars: 'কান',
    aimsSkin: 'ত্বক',
    aimsVeterinary: 'পশুচিকিৎসা',
    aimsChildMaternal: 'শিশু/মাতৃ',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'স্বাস্থ্যকর্মী',
    nurse: 'নার্স',
    ophthalmicOfficer: 'চক্ষু চিকিৎসা কর্মকর্তা',
    medicalStudent: 'মেডিকেল শিক্ষার্থী',
    physicianAssociate: 'চিকিৎসক সহকারী',
    generalPractitioner: 'সাধারণ চিকিৎসক',
    hospitalDoctor: 'হাসপাতালের ডাক্তার',
    ophthalmologist: 'চক্ষু বিশেষজ্ঞ',
    optometrist: 'অপটোমেট্রিস্ট',
    orthoptist: 'Orthoptist',
    entSpecialist: 'ইএনটি বিশেষজ্ঞ',
    pharmacist: 'ফার্মাসিস্ট',
    audiologist: 'শ্রবণ বিশেষজ্ঞ',
    earCarePractitioner: 'কান পরিচর্যা কর্মী',
    dermatologist: 'চর্মরোগ বিশেষজ্ঞ',
    */

    instructionsButton: 'ব্যবহার কিভাবে করবেন',
    eyeButton: 'চোখ',
    earButton: 'কান',
    skinButton: 'ত্বক',
    videosButton: 'ভিডিও',
    atomsButton: 'পরমাণু',
    toolsButton: 'সরঞ্জাম',
    arclightProjectButton: 'Arclight প্রকল্প',
    linksButton: 'লিংক',
    aboutButton: 'সম্বন্ধে',

    passwordTitle: 'Alan আমন্ত্রণ পাসওয়ার্ড লিখুন',
    passwordPlaceholder: 'পাসওয়ার্ড',
    passwordErrorMsg: 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন',
    passwordSubmitBtn: 'জমা দিন',
    noCodeLine: "কোন বা ভুল কোড? আমাদের সাথে <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>এখানে</a> যোগাযোগ করুন",

    eyeMarqueeLine1: 'গ্লকোমা কী?',
    eyeMarqueeLine2: 'Arclight ব্যবহার করে কীভাবে অপটিক ডিস্ক দেখব?',
    eyeMarqueeLine3: '২৫ বছর বয়সী পুরুষ, ৩ দিন ধরে লাল চোখ, ফটোফোবিয়া, দৃষ্টিশক্তি কিছুটা কমেছে',
    eyeMarqueeLine4: 'ইরাইটিস সম্পর্কে বলুন',
    eyeMarqueeLine5: 'জন্মগত ছানির ক্ষেত্রে দ্রুত রেফার করা উচিত?',
    eyeMarqueeLine6: '৬৫ বছর বয়সী নারী, দৃষ্টি খারাপ, চশমা নেই। সামনের অংশ ঠিক আছে, কিন্তু লেন্স মেঘলা',
    eyeMarqueeLine7: 'মা উদ্বিগ্ন, শিশুর চোখে সাদা রংয়ের পিউপিল, ওই চোখে দেখা যায় না',

    earMarqueeLine1: 'ওটাইটিস মিডিয়া কী?',
    earMarqueeLine2: 'Arclight দিয়ে কি আমি কানের পর্দা দেখতে পারি?',
    earMarqueeLine3: '১৬ বছরের ছেলে, ২ দিন ধরে কানের বহির্ভাগে ব্যথা ও চুলকানি, শ্রবণ ঠিক আছে',
    earMarqueeLine4: 'কান সারিঞ্জিং সম্পর্কে বলুন',
    earMarqueeLine5: 'মাস্তয়েডাইটিস কি দ্রুত রেফার করব?',
    earMarqueeLine6: '৭৩ বছর বয়সী পুরুষ, শ্রবণ দুর্বল। কানের নালি ভাল দেখা যাচ্ছে না। শুধু খালি মোম দেখা যায়',
    earMarqueeLine7: 'শিশু শব্দে সাড়া দিচ্ছে না, অনেকদিন ধরে',

    userInfoTitle: 'ব্যবহারকারীর তথ্য',
    userName: 'নাম',
    userContact: 'যোগাযোগ',
    userRole: 'ভূমিকা',
    userAimsPopupLabel: "লক্ষ্য",
    // userAims: 'উদ্দেশ্য',
    userLatLong: 'অক্ষাংশ & দ্রাঘিমাংশ',
    userArea: 'এলাকা',
    userCountry: 'দেশ',
    userVersion: 'ভার্সন',
    userDateTime: 'তারিখ & সময়',
    geolocationButton: 'জিওলোকেশন',
    geoInfoText: '“জিওলোকেশন” ক্লিক করলে আরও সঠিক অবস্থান (অক্ষাংশ/দ্রাঘিমাংশ) শেয়ার করা হবে। এটি আরও ভালো নির্দেশনা ও বিকল্প সরবরাহে সহায়তা করে।',

    pageTitle_howToExamineEye: 'কিভাবে চোখ পরীক্ষা করবেন',
    frontOfEyeHeading: 'চোখের সামনের অংশ',
    frontOfEyeText:
      "চোখ পর্যবেক্ষণ ও তুলনা করুন: <em>সোজা,</em> <em>ডান,</em> <em>বাঁ,</em> <em>উপর,</em> নিচে<br><strong><u>নিকটে আসুন ও ধরে রাখুন</u></strong>। পরীক্ষা করুন: <em>পালক,</em> <em>কনজাংকটিভা,</em> <em>কর্নিয়া,</em> <em>পিউপিল</em><br><span style='color: orange;'>ফ্লুরো</span> ব্যবহার করুন কর্নিয়াল আলসার বা স্ক্র্যাচের জন্য",
    fundalReflexHeading: 'ফান্ডাল রিফ্লেক্স',
    fundalReflexText:
      '<em>অন্ধকার</em> কক্ষ, শিশুটি সুখী; বাহ্যিক দূরত্বে – রিফ্লেক্স তুলনা করুন<br>সমান: <em>উজ্জ্বলতা,</em> <em>রঙ,</em> <em>আকৃতি</em><br>বিস্তারিত দেখতে কাছে যান: <em>দাগ, মুতিয়াবিন্দ, RB, Vit Haem</em>',
    backOfEyeHeading: 'চোখের পিছনের অংশ',
    backOfEyeText:
      'রাইট আই দিয়ে রোগীর ডান চোখ দেখুন; বাম দিয়ে বাম<br>রোগীকে সোজা দেখার পরামর্শ দিন, আলো নয়; কাছে যান এবং অপটিক ডিস্ক খুঁজুন (ডাইলেট = সেরা দৃশ্য)<br>ডিস্ক পরীক্ষা করুন: <em>সীমানা,</em> <em>রঙ,</em> <em>কাপ</em>. বড় রক্তনালীগুলি অনুসরণ করুন, তারপর রোগীকে সরাসরি আলো দেখাতে বলুন যাতে ম্যাকুলা দেখা যায়',
    additionalText_eye:
      "আপনার ডিস্কগুলি জানুন: স্বাভাবিক, <span style='color:red; font-weight:bold;'>ফুলে যাওয়া,</span> <span style='color:red;'>নতুন রক্তনালী,</span> <span style='color:orange;'>কাপযুক্ত,</span> <span style='color:green;'>ফিকে</span><br>&gt;অনুশীলন করুন&lt;",

    pageTitle_howToExamineEar: 'কান পরীক্ষা করার পদ্ধতি',
    allAroundEarHeading: 'কানের চারপাশ',
    allAroundEarText:
      'যাচাই করুন: <em>পিন্না, </em><em>ট্র্যাগাস, </em><em>মাস্টয়েড</em> - ফোলাভাব, স্পর্শকাতরতা বা স্রাব আছে কিনা<br>পিন্না আস্তে আস্তে নাড়ুন, কোনো ব্যথা লক্ষ্য করুন',
    earCanalHeading: 'কান নালী',
    earCanalText:
      'মাথা ঢালুন, <strong><u>Arclight কে কলমের মত ধরে রাখুন</u></strong><br>বয়স্কদের ক্ষেত্রে পিন্না উপরে/পেছনে এবং শিশুদের ক্ষেত্রে নিচে/পেছনে টানুন<br>স্পেকুলাম প্রবেশ করান (বয়স্ক: 4.5 মিমি, শিশু: 2.5 মিমি), কেশ দূরে সরান, প্রয়োজনে ঘুরিয়ে দিন<br>দেখুন: <em>মোম,</em> <em>আবর্জনা,</em> <em>সংক্রমণ</em>',
    tympanicMembraneHeading: 'টিম্পানিক মেমব্রেন',
    tympanicMembraneText:
      'ম্যালিয়াসের হাতল, আলোর প্রতিফলন, এবং অ্যাটিক চিনে নিন<br>দৃষ্টি দিন: <em>রং,</em> <em>অবস্থান,</em> <em>আর্ধ-স্বচ্ছতা</em><br>ফাটল, তরল বা দাগ দেখুন',
    additionalText_ear:
      "আপনার টিএম জানুন: স্বাভাবিক, <span style='color:red; font-weight:bold;'>লাল</span>, <span style='color:orange;'>ফোলা</span>, <span style='color:green;'>সঙ্কুচিত</span>, <span style='color:purple;'>ফাটল</span><br>&gt;অনুশীলন করুন&lt;",

    pageTitle_howToExamineSkin: 'কীভাবে ত্বক পরীক্ষা করবেন',
    generalObservationHeading: 'সাধারণ পর্যবেক্ষণ',
    generalObservationText: 'গিঁট, <em>রঙের পরিবর্তন</em> এবং বণ্টন পরীক্ষা করুন<br>নম্রভাবে স্পর্শ করে জানুন বস্তুর গঠন, তাপমাত্রা বা স্পর্শকাতরতা',
    uvLightHeading: 'ইউভি (উড’স) আলো',
    uvLightText:
      "একটি অন্ধকার ঘরে বৈশিষ্ট্যপূর্ণ ফ্লুরোসেন্স দেখুন:<br><span style='color:teal;'>টিনিয়া (নীল-সবুজ)</span>, <span style='color:#FF7F50;'>পিটিরিয়াসিস ভার্সিকোলর (তামার-কমলা)</span>, <span style='color:#FF4040;'>এরিথ্রাজমা (করাল-লাল)</span>, <span style='color:blue;'>ভিটিলিগো (নীল-সাদা)</span>, <span style='color:orange;'>অ্যাকনে (কমলা-লাল)</span>, <span style='color:#BFEFFF;'>হেড লাইস নিটস (ফ্যাকাশে-নীল)</span>",
    dermoscopyHeading: 'ডার্মোস্কোপি',
    dermoscopyText:
      '<strong><u>Arclight পোলারাইজারকে কলমের মতো ধরে রাখুন</u></strong>, পরীক্ষা করুন: <strong>ABCDE</strong> (<em>অসমমিতি</em>, <em>সীমানা</em>, <em>রঙ</em>, <em>ডায়ামিটার &gt;6mm</em>, <em>উন্নয়নশীল</em>)<br>অধ্যয়ন করুন: PDSBV (<em>পিগমেন্ট নেটওয়ার্ক</em>, <em>বিন্দু</em>, <em>রেখা</em>, <em>নীল-সাদা</em>, <em>রক্তবাহিনী</em>)',
    additionalText_skin:
      "আপনার ক্ষতটি জানুন: স্বাভাবিক, <span style='color:red;'>সন্দেহজনক</span>, <span style='color:orange;'>প্রদাহিত</span><br>&gt;অনুশীলন চালিয়ে যান&lt;",

    pageTitle_aboutAlan: 'Alan সম্বন্ধে',
    aboutAlanText:
      'Alan হল একটি AI চোখ, কান ও ত্বক নির্ণায়ক সহায়ক, যা একটি মৌলিক ভাষা মডেল ও প্রতীকী যুক্তি নিয়ে গঠিত। বুদ্ধিমান। গম্ভীর। অত্যাধুনিক।<br><br>ক্লিনিক্যাল, স্থানীয় জ্ঞান ও চিত্র বিভিন্ন ভূমিকার (যেমন স্বাস্থ্যকর্মী ও সাধারণ চিকিৎসক) জন্য উপযোগী করা হয়েছে। সংক্ষিপ্ত সংলাপ একটি নির্ণয় ও ব্যবস্থাপনা পরিকল্পনা তৈরি করে। Arclight-এর ব্যবহার সর্বত্র এমবেড করা হয়েছে।<br>',
    aboutAlanListItem1: 'বিশেষজ্ঞ ভিত্তি – উষ্ণ/গরম জলবায়ু',
    aboutAlanListItem2: 'Arclight সম্পর্কে সচেতন',
    aboutAlanEfficient: '<strong>দক্ষ</strong> – সংক্ষিপ্ত, সরল ভাষা',
    aboutAlanEasy: '<strong>সহজে ব্যবহারযোগ্য</strong> – অ্যাপ, কণ্ঠ, দর্শন',
    aboutAlanExplainable: '<strong>ব্যাখ্যাযোগ্য</strong> – তথ্য/নিয়ম, ছবি',
    aboutAlanEncouraging: '<strong>উৎসাহব্যঞ্জক</strong> – সহানুভূতি, শিক্ষক',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'নির্দেশাবলী',
    instructionsIntro:
      'Alan হল একটি AI সহায়ক, যা শিক্ষার্থীদের জন্য এবং এমন লোকদের জন্য, যারা মাঝে মাঝে চোখ, কান বা ত্বকের সমস্যার সম্মুখীন হন। স্পষ্টভাবে লিখুন বা কথা বলুন এবং পরিচয় নির্ধারক নাম বা বিবরণ এড়িয়ে চলুন। মাথা/মুখ/শরীরের অংশটিকে সম্পূর্ণভাবে দেখুন এবং দুই চোখ/কান পরীক্ষা করুন। শুভকামনা!',
    instructionsPatientPrompt: 'আপনার রোগীর সম্পর্কে Alan-কে বলুন:',
    instructionsPatientDetail1: 'সমস্যা ও সূচনার সময়',
    instructionsPatientDetail2: 'আপনি যা দেখছেন',
    instructionsPatientDetail3: 'দৃষ্টি ও পিউপিল',
    instructionsPatientDetail4: 'বয়স, লিঙ্গ, ওষুধ',
    instructionsUseArclight_default: 'Arclight ব্যবহার করুন: সামনে, ফান্ডাল রিফ্লেক্স, চোখের পেছনে।',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Arclight ব্যবহার করুন:</strong> <strong><em>সামনে, ফান্ডাল রিফ্লেক্স, চোখের পেছনে।</em></strong>',
    instructionsTooLittle_eye: 'মানুষের লাল চোখ, কি?',
    instructionsJustRight_eye:
      'মানুষ, ২৫ বছর, ৩ দিন ধরে লাল চোখ। পূর্বে কোনো ওষুধ বা চোখের সমস্যা ছিল না। ব্যথা, চোখ থেকে পানি, সাদা কর্নিয়া বিন্দু।',
    instructionsTooMuch_eye:
      "আজ একজন মানুষ ক্লিনিকে এসেছেন। তিনি গাড়ি চালিয়ে ভবনে প্রবেশ করেছেন এবং তার চোখ লাল; তিনি মনে করেন যে খাওয়া খাবার তার চোখকে প্রভাবিত করছে। আমি চোখ থেকে পানি ও লাল প্রান্ত দেখি। তিনি সাহায্য চান—লম্বা ব্যক্তি, চোখে পানি, কর্নিয়া ও ব্যথা নিয়ে উদ্বিগ্ন। তিনি বলেন, 'এটা কী?'",
    instructionsAdditionalQuery_eye: 'Alan চোখ সম্পর্কিত শিক্ষা/শেখার প্রশ্নও উত্তর দেন: ইরাইটিস কী? রেটিনা কীভাবে দেখবো?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Arclight ব্যবহার করুন:</strong> <strong><em>পুরো কান, নালী, ড্রাম।</em></strong>',
    instructionsTooLittle_ear: 'মানুষের লাল কান, কি?',
    instructionsJustRight_ear:
      'মানুষ, ২৫ বছর, ৩ দিন ধরে লাল কান। পূর্বে কোনো ওষুধ বা কান সমস্যা ছিল না। ব্যথা, কান থেকে স্রাব। লাল ড্রাম, খারাপ কানে শুনানি নীরব কিন্তু অন্য কানে ঠিক আছে।',
    instructionsTooMuch_ear:
      "আজ একজন মানুষ ক্লিনিকে এসেছেন। তিনি গাড়ি চালিয়ে ভবনে প্রবেশ করেছেন এবং তার কান লাল; তিনি মনে করেন যে খাওয়া খাবার তার কানকে প্রভাবিত করছে। আমি কান থেকে স্রাব ও লাল প্রান্ত দেখি। তিনি সাহায্য চান—লম্বা ব্যক্তি, কান পানি, শুনানি ও ব্যথা নিয়ে উদ্বিগ্ন। তিনি বলেন, 'এটা কী?'",
    instructionsAdditionalQuery_ear: 'Alan কান সম্পর্কিত শিক্ষা/শেখার প্রশ্নও উত্তর দেন: মিডিয়া কী? কিভাবে কান পরিষ্কার করবো?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Arclight ব্যবহার করুন:</strong> <strong><em>UV আলো, ডার্মোস্কোপি।</em></strong>',
    instructionsTooLittle_skin: 'মানুষের লাল ত্বক, কি?',
    instructionsJustRight_skin: 'মানুষ, ২৫ বছর, ৩ দিন ধরে লাল ত্বকের দাগ। পূর্বে কোনো ওষুধ বা ত্বকের সমস্যা ছিল না।',
    instructionsTooMuch_skin:
      "আজ একজন মানুষ ক্লিনিকে এসেছেন। তিনি গাড়ি চালিয়ে ভবনে প্রবেশ করেছেন এবং তার ত্বক লাল; তিনি মনে করেন যে খাওয়া খাবার তার ত্বককে প্রভাবিত করছে। আমি ত্বক থেকে পানি ও লাল প্রান্ত দেখি। তিনি সাহায্য চান—লম্বা ব্যক্তি, লাল ত্বক, রং ও জ্বালাপোড়ার জন্য উদ্বিগ্ন। তিনি বলেন, 'এটা কী?'",
    instructionsAdditionalQuery_skin: 'Alan ত্বক সম্পর্কিত শিক্ষা/শেখার প্রশ্নও উত্তর দেন: একজিমা কী? পিগমেন্ট নেটওয়ার্ক কীভাবে দেখবো?',
    instructionsLabelTooLittle: 'খুব কম',
    instructionsLabelJustRight: 'ঠিক আছে',
    instructionsLabelTooMuch: 'খুব বেশি',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan হল একটি AI সহায়ক, যা শিক্ষার্থীদের জন্য এবং এমন লোকদের জন্য যারা মাঝে মাঝে চোখ, কান বা ত্বকের সমস্যার সম্মুখীন হন। স্পষ্টভাবে লিখুন বা কথা বলুন এবং নাম বা বিস্তারিত তথ্য প্রকাশ থেকে বিরত থাকুন।',
    goodLuck: 'শুভকামনা!',
    namePlaceholder: 'নাম',
    // rolePlaceholder: 'ভূমিকা',

    // --- NEW "Experience" Dropdown Translations (Needs review for Bangla) ---
    experiencePlaceholder: 'অভিজ্ঞতা',
    experienceStudentRefresher: 'ছাত্র / রিফ্রেশার',
    experienceConfidentCore: 'আত্মবিশ্বাসী মূল জ্ঞান',
    experienceExpert: 'বিশেষজ্ঞ',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 বছর',
    experienceOption2: '1-3 বছর',
    experienceOption3: '3-7 বছর',
    experienceOption4: '>7 বছর',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'লক্ষ্য',
    aimsOption1: 'দ্বিতীয় মতামত',
    aimsOption2: 'অবস্থা অনুসন্ধান',
    aimsOption3: 'ভালভাবে যোগাযোগ',
    */
    contactPlaceholder: 'যোগাযোগ (ইমেইল/ফোন)',
    acceptButton: 'গ্রহণ করুন',

    images: "ছবি",
    help: "সহায়তা",
    screenshot: "স্ক্রিনশট",
    refer: "রেফার",
    comingSoon: "শীঘ্রই আসছে...",
  },

  // 9) Indonesian - id
  id: {
    eyesEars: 'Mata, Telinga, Kulit',
    goodHistory: 'Riwayat Lengkap',
    examineWell: 'Periksa dengan Baik',
    useArclight: 'Gunakan Arclight',
    howCanIHelp: 'Bagaimana saya dapat membantu?',
    alanMistakes: `Alan mungkin melakukan kesalahan. Gunakan penilaian klinis. ${new Date().getMonth() + 1}/25,`,
    login: 'Masuk',
    enterPassword: 'Masukkan kata sandi',
    register: 'Daftar',
    name: 'Nama',
    password: 'Kata Sandi (4 digit)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Indonesian) ---
    aimsPlaceholder: 'Tujuan',
    aimsEyes: 'Mata',
    aimsEars: 'Telinga',
    aimsSkin: 'Kulit',
    aimsVeterinary: 'Veteriner',
    aimsChildMaternal: 'Anak/Maternal',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Tenaga Kesehatan',
    nurse: 'Perawat',
    ophthalmicOfficer: 'Petugas Klinis Mata',
    medicalStudent: 'Mahasiswa Kedokteran',
    physicianAssociate: 'Asisten Dokter',
    generalPractitioner: 'Dokter Umum',
    hospitalDoctor: 'Dokter Rumah Sakit',
    ophthalmologist: 'Dokter Mata',
    optometrist: 'Ahli Kacamata',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Spesialis THT',
    pharmacist: 'Apoteker',
    audiologist: 'Ahli Pendengaran',
    earCarePractitioner: 'Praktisi Perawatan Telinga',
    dermatologist: 'Dokter Kulit',
    */

    instructionsButton: 'Cara menggunakan',
    eyeButton: 'Mata',
    earButton: 'Telinga',
    skinButton: 'Kulit',
    videosButton: 'Video',
    atomsButton: 'Atoms',
    toolsButton: 'Alat',
    arclightProjectButton: 'Proyek Arclight',
    linksButton: 'Tautan',
    aboutButton: 'Tentang',

    passwordTitle: 'Masukkan kata sandi undangan Alan',
    passwordPlaceholder: 'Kata Sandi',
    passwordErrorMsg: 'Kata sandi tidak valid. Coba lagi',
    passwordSubmitBtn: 'Kirim',
    noCodeLine: "Tidak ada atau kode salah? Hubungi kami <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>di sini</a>",

    eyeMarqueeLine1: 'Apa itu glaukoma?',
    eyeMarqueeLine2: 'Bagaimana cara melihat disk optik dengan Arclight?',
    eyeMarqueeLine3: 'Pria 25 tahun, mata merah 3 hari, fotofobia, penglihatan sedikit menurun',
    eyeMarqueeLine4: 'Ceritakan tentang iritis',
    eyeMarqueeLine5: 'Haruskah saya merujuk katarak kongenital segera?',
    eyeMarqueeLine6: 'Wanita 65 tahun, penglihatan buruk, tidak memakai kacamata. Bagian depan normal, lensa keruh',
    eyeMarqueeLine7: 'Ibu khawatir bayi memiliki pupil putih, tidak ada penglihatan di mata itu',

    earMarqueeLine1: 'Apa itu otitis media?',
    earMarqueeLine2: 'Bisakah saya melihat membran timpani dengan Arclight saya?',
    earMarqueeLine3: 'Remaja laki-laki 16 tahun, sakit daun telinga 2 hari, gatal, pendengaran baik',
    earMarqueeLine4: 'Ceritakan tentang syringing (pembersihan telinga)',
    earMarqueeLine5: 'Haruskah saya merujuk mastoiditis segera?',
    earMarqueeLine6: 'Pria 73 tahun, pendengaran buruk. Kanal telinga tidak terlihat jelas, hanya melihat kotoran telinga',
    earMarqueeLine7: 'Bayi tidak merespons suara. Sudah berbulan-bulan',

    userInfoTitle: 'Info Pengguna',
    userName: 'Nama',
    userContact: 'Kontak',
    userRole: 'Peran',
    userAimsPopupLabel: "Tujuan",
    // userAims: 'Tujuan',
    userLatLong: 'Lintang & Bujur',
    userArea: 'Wilayah',
    userCountry: 'Negara',
    userVersion: 'Versi',
    userDateTime: 'Tanggal & Waktu',
    geolocationButton: 'Geolokasi',
    geoInfoText:
      'Dengan mengklik "Geolokasi", lokasi (lintang/bujur) yang lebih tepat akan dibagikan. Ini membantu memberikan panduan dan pilihan yang lebih baik.',

    pageTitle_howToExamineEye: 'Cara memeriksa mata',
    frontOfEyeHeading: 'Bagian Depan Mata',
    frontOfEyeText:
      "Amati dan bandingkan mata: <em>lurus,</em> <em>kanan,</em> <em>kiri,</em> <em>atas,</em> bawah<br><strong><u>Dekatkan dan pegang</u></strong>. Periksa: <em>kelopak mata,</em> <em>konjungtiva,</em> <em>kornea,</em> <em>pupil</em><br>Gunakan dengan <span style='color: orange;'>fluro</span> untuk ulkus kornea atau goresan",
    fundalReflexHeading: 'Refleks Fundal',
    fundalReflexText:
      'Ruangan <em>remang-remang</em>, bayi senang; dengan jarak lengan – bandingkan refleks<br>Sama: <em>Kecerahan,</em> <em>Warna,</em> <em>Bentuk</em><br>Mendekat untuk detail: <em>Luka bekas, katarak, RB, Vit Haem</em>',
    backOfEyeHeading: 'Bagian Belakang Mata',
    backOfEyeText:
      'Gunakan mata kanan untuk melihat mata kanan pasien; kiri untuk yang kiri<br>Pasien harus melihat lurus, BUKAN ke arah cahaya; dekati dan cari optic disc (Dilatasi = pandangan terbaik)<br>Periksa cakram: <em>Tepi,</em> <em>Warna,</em> <em>Cangkir</em>. Lacak pembuluh besar, lalu minta pasien melihat langsung ke arah cahaya untuk melihat makula',
    additionalText_eye:
      "Ketahui cakram Anda: normal, <span style='color:red; font-weight:bold;'>bengkak,</span> <span style='color:red;'>pembuluh baru,</span> <span style='color:orange;'>berbentuk cangkir,</span> <span style='color:green;'>pucat</span><br>&gt;Berlatihlah sering&lt;",

    pageTitle_howToExamineEar: 'Cara memeriksa telinga',
    allAroundEarHeading: 'Sekitar telinga',
    allAroundEarText:
      'Periksa: <em>pinna, </em><em>tragus, </em><em>mastoid</em> untuk benjolan, rasa nyeri atau cairan<br>Gerakkan pinna dengan lembut, perhatikan apakah ada rasa sakit',
    earCanalHeading: 'Saluran telinga',
    earCanalText:
      'Miringkan kepala, <strong><u>pegang Arclight seperti pena</u></strong><br>Tarik pinna ke atas/belakang (dewasa) atau ke bawah/belakang (anak-anak)<br>Masukkan spesulum (4.5mm dewasa, 2.5mm bayi), dorong melewati rambut, putar jika perlu<br>Periksa: <em>lilin telinga,</em> <em>sisa kotoran,</em> <em>infeksi</em>',
    tympanicMembraneHeading: 'Membran timpani',
    tympanicMembraneText:
      'Identifikasi pegangan malleus, refleksi cahaya, dan ruang attic<br>Catat: <em>warna,</em> <em>posisi,</em> <em>translucency</em><br>Periksa apakah ada perforasi, cairan atau bekas luka',
    additionalText_ear:
      "Ketahui membran timpani Anda: normal, <span style='color:red; font-weight:bold;'>merah</span>, <span style='color:orange;'>mengembung</span>, <span style='color:green;'>mundur</span>, <span style='color:purple;'>berlubang</span><br>&gt;Berlatihlah sering&lt;",

    pageTitle_howToExamineSkin: 'Cara memeriksa kulit',
    generalObservationHeading: 'Pengamatan umum',
    generalObservationText: 'Periksa benjolan, <em>perubahan warna</em>, dan distribusi<br>Raba dengan lembut untuk tekstur, suhu, atau kepekaan',
    uvLightHeading: 'Cahaya UV (Wood’s)',
    uvLightText:
      "Di ruangan yang gelap, periksa fluoresensi khas:<br><span style='color:teal;'>tinea (biru-hijau)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (oranye tembaga)</span>, <span style='color:#FF4040;'>erythrasma (merah karang)</span>, <span style='color:blue;'>vitiligo (biru-putih)</span>, <span style='color:orange;'>jerawat (merah-oranye)</span>, <span style='color:#BFEFFF;'>nit kutu kepala (biru pucat)</span>",
    dermoscopyHeading: 'Dermoskopi',
    dermoscopyText:
      '<strong><u>Genggam polarizer Arclight seperti pena</u></strong>, periksa: <strong>ABCDE</strong> (<em>Asimetri</em>, <em>Perbatasan</em>, <em>Warna</em>, <em>Diameter &gt;6mm</em>, <em>Berkembang</em>)<br>Pelajari: PDSBV (<em>Jaringan pigmen</em>, <em>Titik</em>, <em>Garis</em>, <em>Biru-putih</em>, <em>Vaskular</em>)',
    additionalText_skin:
      "Kenali lesi Anda: normal, <span style='color:red;'>mencurigakan</span>, <span style='color:orange;'>meradang</span><br>&gt;Latihlah sering&lt;",

    pageTitle_aboutAlan: 'Tentang Alan',
    aboutAlanText:
      'Alan adalah asisten diagnostik AI untuk mata, telinga, dan kulit, yang terdiri dari model bahasa dasar dan logika simbolik. Pintar. Serius. Mutakhir.<br><br>Pengetahuan klinis, lokal, dan gambar disesuaikan untuk peran yang berbeda seperti tenaga kesehatan dan dokter umum. Dialog yang ringkas menghasilkan diagnosis dan rencana penatalaksanaan. Penggunaan Arclight terintegrasi secara menyeluruh.<br>',
    aboutAlanListItem1: 'Basis ahli – iklim tropis/panas',
    aboutAlanListItem2: 'Mengenal Arclight',
    aboutAlanEfficient: '<strong>Efisien</strong> – bahasa yang ringkas dan sederhana',
    aboutAlanEasy: '<strong>Mudah digunakan</strong> – aplikasi, suara, penglihatan',
    aboutAlanExplainable: '<strong>Dapat dijelaskan</strong> – fakta/aturan, gambar',
    aboutAlanEncouraging: '<strong>Mendorong</strong> – empati, pengajar',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Petunjuk',
    instructionsIntro:
      'Alan adalah asisten AI untuk pelajar dan bagi mereka yang sesekali menangani kasus mata, telinga, atau kulit. Tulis atau bicaralah dengan jelas dan hindari mengungkapkan nama atau detail yang mengidentifikasi. Periksa seluruh bagian kepala/wajah/tubuh dan periksa kedua mata/telinga. Semoga sukses!',
    instructionsPatientPrompt: 'Ceritakan tentang pasien Anda kepada Alan:',
    instructionsPatientDetail1: 'masalah & onset',
    instructionsPatientDetail2: 'apa yang Anda lihat',
    instructionsPatientDetail3: 'penglihatan & pupil',
    instructionsPatientDetail4: 'usia, jenis kelamin, obat',
    instructionsUseArclight_default: 'Gunakan Arclight: depan, refleks fundal, belakang mata.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Gunakan Arclight:</strong> <strong><em>depan, refleks fundal, belakang mata.</em></strong>',
    instructionsTooLittle_eye: 'Pria, mata merah, apa?',
    instructionsJustRight_eye:
      'Pria 25 tahun, mata merah selama 3 hari. Tanpa obat atau masalah mata sebelumnya. Nyeri, mata berair, titik putih di kornea. Pupil OK, penglihatan 6/12 dan 6/6 pada mata yang lain.',
    instructionsTooMuch_eye:
      "Pria ini datang ke klinik hari ini. Dia memasuki gedung dengan mengemudi dan matanya merah; dia berpikir makanan yang dimakannya memengaruhi matanya. Saya melihat mata berair dan tepi merah. Dia butuh bantuan—pria tinggi, mata berair, khawatir tentang kornea dan nyeri. Dia berkata, 'Apa ini?'",
    instructionsAdditionalQuery_eye: 'Alan juga menjawab pertanyaan pembelajaran tentang mata: Apa itu Iritis? Bagaimana saya melihat retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Gunakan Arclight:</strong> <strong><em>seluruh telinga, saluran, gendang.</em></strong>',
    instructionsTooLittle_ear: 'Pria, telinga merah, apa?',
    instructionsJustRight_ear:
      'Pria 25 tahun, telinga merah selama 3 hari. Tanpa obat atau masalah telinga sebelumnya. Nyeri, cairan dari telinga. Gendang merah, pendengaran teredam di telinga yang bermasalah tetapi normal pada yang lain.',
    instructionsTooMuch_ear:
      "Pria ini datang ke klinik hari ini. Dia memasuki gedung dengan telinga merah dan berpikir makanan yang dimakannya memengaruhi telinganya. Saya melihat cairan dan tepi merah. Dia butuh bantuan—pria tinggi, telinga berair, khawatir tentang pendengaran dan nyeri. Dia berkata, 'Apa ini?'",
    instructionsAdditionalQuery_ear:
      'Alan juga menjawab pertanyaan pembelajaran tentang telinga: Apa itu Otitis Media? Bagaimana cara membersihkan telinga?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Gunakan Arclight:</strong> <strong><em>Cahaya UV, dermoskopi.</em></strong>',
    instructionsTooLittle_skin: 'Pria, kulit merah, apa?',
    instructionsJustRight_skin: 'Pria 25 tahun, bercak kulit merah selama 3 hari. Tanpa obat atau masalah kulit sebelumnya. Kulit nyeri dan gatal.',
    instructionsTooMuch_skin:
      "Pria ini datang ke klinik hari ini. Dia memasuki gedung dengan kulit merah dan berpikir makanan yang dimakannya memengaruhi kulitnya. Saya melihat cairan dan tepi merah. Dia butuh bantuan—pria tinggi, kulit merah, khawatir tentang pigmentasi dan iritasi. Dia berkata, 'Apa ini?'",
    instructionsAdditionalQuery_skin:
      'Alan juga menjawab pertanyaan pembelajaran tentang kulit: Apa itu Eksim? Bagaimana saya melihat jaringan pigmen?',
    instructionsLabelTooLittle: 'Terlalu sedikit',
    instructionsLabelJustRight: 'Pas',
    instructionsLabelTooMuch: 'Terlalu banyak',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan adalah asisten AI untuk pelajar dan bagi mereka yang sesekali menghadapi kasus mata, telinga, atau kulit. Tulis atau bicaralah dengan jelas dan hindari mengungkapkan nama atau detail yang dapat mengidentifikasi.',
    goodLuck: 'Semoga sukses!',
    namePlaceholder: 'Nama',
    // rolePlaceholder: 'Peran',

    // --- NEW "Experience" Dropdown Translations (Needs review for Indonesian) ---
    experiencePlaceholder: 'Pengalaman',
    experienceStudentRefresher: 'Pelajar / penyegaran',
    experienceConfidentCore: 'Pengetahuan inti percaya diri',
    experienceExpert: 'Ahli',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 thn',
    experienceOption2: '1-3 thn',
    experienceOption3: '3-7 thn',
    experienceOption4: '>7 thn',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Tujuan',
    aimsOption1: 'Pendapat kedua',
    aimsOption2: 'Pencarian kondisi',
    aimsOption3: 'Komunikasi lebih baik',
    */
    contactPlaceholder: 'Kontak (email/telepon)',
    acceptButton: 'Terima',

    images: "Gambar",
    help: "Bantuan",
    screenshot: "Tangkap Layar",
    refer: "Rujuk",
    comingSoon: "Segera hadir...",
  },

  // 10) Swahili - sw
  sw: {
    eyesEars: 'Macho, Masikio, Ngozi',
    goodHistory: 'Historia Nzuri',
    examineWell: 'Chunguza Vizuri',
    useArclight: 'Tumia Arclight',
    howCanIHelp: 'Ninawezaje kukusaidia leo?',
    alanMistakes: `Alan anaweza kukosea. Tumia hukumu ya kliniki. ${new Date().getMonth() + 1}/25,`,
    login: 'Ingia',
    enterPassword: 'Weka Nenosiri',
    register: 'Jisajili',
    name: 'Jina',
    password: 'Nenosiri (nambari 4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Swahili) ---
    aimsPlaceholder: 'Malengo',
    aimsEyes: 'Macho',
    aimsEars: 'Masikio',
    aimsSkin: 'Ngozi',
    aimsVeterinary: 'Mifugo',
    aimsChildMaternal: 'Watoto/Mama',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Mfanyakazi wa Afya',
    nurse: 'Muuguzi',
    ophthalmicOfficer: 'Afisa wa Macho',
    medicalStudent: 'Mwanafunzi wa Tiba',
    physicianAssociate: 'Msaidizi wa Tabibu',
    generalPractitioner: 'Daktari wa Familia',
    hospitalDoctor: 'Daktari wa Hospitali',
    ophthalmologist: 'Daktari wa Macho',
    optometrist: 'Mtaalamu wa Miwani',
    orthoptist: 'Mtaalamu wa Orthoptics',
    entSpecialist: 'Mtaalamu wa ENT',
    pharmacist: 'Famasia',
    audiologist: 'Mtaalamu wa Usikivu',
    earCarePractitioner: 'Mtaalamu wa Utunzaji wa Masikio',
    dermatologist: 'Daktari wa Ngozi',
    */

    instructionsButton: 'Jinsi ya kutumia',
    eyeButton: 'Jicho',
    earButton: 'Sikio',
    skinButton: 'Ngozi',
    videosButton: 'Video',
    atomsButton: 'Atoms',
    toolsButton: 'Vifaa',
    arclightProjectButton: 'Mradi wa Arclight',
    linksButton: 'Viungo',
    aboutButton: 'Kuhusu',

    passwordTitle: 'Weka nenosiri la mwaliko wa Alan',
    passwordPlaceholder: 'Nenosiri',
    passwordErrorMsg: 'Nenosiri si sahihi. Jaribu tena',
    passwordSubmitBtn: 'Wasilisha',
    noCodeLine: "Hauna au imekosewa? Wasiliana nasi <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>hapa</a>",

    eyeMarqueeLine1: 'Glaucoma ni nini?',
    eyeMarqueeLine2: 'Ninaonaje diski ya macho (optic disc) kwa kutumia Arclight?',
    eyeMarqueeLine3: 'Mwanaume miaka 25, jicho jekundu siku 3, kuhisi mwanga, uwezo wa kuona umepungua kidogo',
    eyeMarqueeLine4: 'Nieleze kuhusu iritis',
    eyeMarqueeLine5: 'Je, nipeleke mtoto mwenye cataract ya kuzaliwa haraka?',
    eyeMarqueeLine6: 'Mwanamke miaka 65, uwezo wa kuona mdogo, hana miwani. Sehemu ya mbele iko sawa, lenzi imefifia',
    eyeMarqueeLine7: 'Mama anahofia mtoto ana mboni nyeupe, hakuna kuona kwenye jicho hilo',

    earMarqueeLine1: 'Otitis media ni nini?',
    earMarqueeLine2: 'Je, ninaweza kuona utando wa sikio kwa kutumia Arclight?',
    earMarqueeLine3: 'Kijana miaka 16, maumivu kwenye sikio, siku 2, kuwasha, kusikia ni vizuri',
    earMarqueeLine4: 'Nieleze kuhusu kusafisha sikio (syringing)',
    earMarqueeLine5: 'Je, nimpatie rufaa haraka aliye na mastoiditis?',
    earMarqueeLine6: 'Mwanaume miaka 73, anasikia vibaya. Kituo cha sikio hakionekani vyema, naona nta tu',
    earMarqueeLine7: 'Mtoto mchanga hajibu sauti. Imechukua miezi',

    userInfoTitle: 'Taarifa za Mtumiaji',
    userName: 'Jina',
    userContact: 'Mawasiliano',
    userRole: 'Wadhifa',
    userAimsPopupLabel: "Malengo",
    // userAims: 'Malengo',
    userLatLong: 'Lat & Long',
    userArea: 'Eneo',
    userCountry: 'Nchi',
    userVersion: 'Toleo',
    userDateTime: 'Tarehe & Muda',
    geolocationButton: 'Geolokisho',
    geoInfoText: 'Kwa kubofya "Geolokisho" itashirikiwa eneo (lat/long) lenye usahihi zaidi. Hii husaidia kutoa mwongozo na chaguzi bora.',

    pageTitle_howToExamineEye: 'Jinsi ya kuchunguza jicho',
    frontOfEyeHeading: 'Sehemu ya Mbele ya Jicho',
    frontOfEyeText:
      "Angalia na linganisha macho: <em>moja kwa moja,</em> <em>kulia,</em> <em>kushoto,</em> <em>juu,</em> chini<br><strong><u>Shikamana na karibu</u></strong>. Angalia: <em>mabega,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupilla</em><br>Tumia na <span style='color: orange;'>fluro</span> kwa vidonda vya cornea au mikwaruzo",
    fundalReflexHeading: 'Mwangaza wa Fundal',
    fundalReflexText:
      'Chumba kilicho <em>giza</em>, mtoto mwenye furaha; kwa umbali wa mkono – linganisha mwangaza<br>Sawa: <em>Mwangaza,</em> <em>Rangi,</em> <em>Umbizo</em><br>Sondela ili kuona maelezo zaidi: <em>Alama, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Sehemu ya Nyuma ya Jicho',
    backOfEyeText:
      'Tumia jicho la kuume kuona jicho la mgonjwa; la kushoto kwa la kushoto<br>Mgonjwa anapaswa kutazama moja kwa moja, SI kuangalia mwanga; karibu na tafuta optic disc (Dilate = mtazamo bora)<br>Angalia disc: <em>Mlango,</em> <em>Rangi,</em> <em>Kombe</em>. Fuata mishipa mikubwa, kisha muombe mgonjwa atazame moja kwa moja mwanga ili kuona macula',
    additionalText_eye:
      "Jua diski zako: kawaida, <span style='color:red; font-weight:bold;'>kuvimba,</span> <span style='color:red;'>mishipa mipya,</span> <span style='color:orange;'>ikikombe,</span> <span style='color:green;'>nyeupe</span><br>&gt;Fanya mazoezi mara kwa mara&lt;",

    pageTitle_howToExamineEar: 'Jinsi ya kuchunguza sikio',
    allAroundEarHeading: 'Mzunguko wa sikio',
    allAroundEarText:
      'Angalia: <em>pinna, </em><em>tragus, </em><em>mastoid</em> kwa vikoma, unyeti au mtondo<br>Hamisha pinna kwa upole, angalia kama kuna maumivu',
    earCanalHeading: 'Njia ya sikio',
    earCanalText:
      'Pindua kichwa, <strong><u>shikilia Arclight kama kalamu</u></strong><br>Vuta pinna juu/nyuma (kwa watu wazima) au chini/nyuma (kwa watoto)<br>Ingiza speculum (4.5mm kwa wazima, 2.5mm kwa watoto), sukuma mbali na nywele, geuza kama inahitajika<br>Tafuta: <em>siko,</em> <em>taka,</em> <em>maambukizo</em>',
    tympanicMembraneHeading: 'Ukonononi wa tai',
    tympanicMembraneText:
      'Tambua mkono wa malleus, refleksi ya mwanga, na attic<br>Angalia: <em>rangi,</em> <em>nafasi,</em> <em>uwazi</em><br>Tafuta tukio la pengo, kioevu au alama za kupona',
    additionalText_ear:
      "Jua hali ya tai yako: ya kawaida, <span style='color:red; font-weight:bold;'>nyekundu</span>, <span style='color:orange;'>inayochanua</span>, <span style='color:green;'>imekuruka</span>, <span style='color:purple;'>imepungua</span><br>&gt;Fanya mazoezi mara kwa mara&lt;",

    pageTitle_howToExamineSkin: 'Jinsi ya kuchunguza ngozi',
    generalObservationHeading: 'Uchunguzi wa jumla',
    generalObservationText: 'Angalia vikoma, <em>mabadiliko ya rangi</em> na mgawanyo<br>Piga kwa upole ili kuhisi muundo, joto au hisia',
    uvLightHeading: 'Mwanga wa UV (Wood’s)',
    uvLightText:
      "Katika chumba kilicho giza, angalia fluorescens ya kipekee:<br><span style='color:teal;'>tinea (bluu-kijani)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (machungwa ya shaba)</span>, <span style='color:#FF4040;'>erythrasma (weusi-korali)</span>, <span style='color:blue;'>vitiligo (bluu-mweupe)</span>, <span style='color:orange;'>acne (machungwa-wekundu)</span>, <span style='color:#BFEFFF;'>mayai ya mchwa wa kichwa (bluu mwepesi)</span>",
    dermoscopyHeading: 'Dermoskopi',
    dermoscopyText:
      '<strong><u>Shikilia Arclight polariser kama kalamu</u></strong>, angalia: <strong>ABCDE</strong> (<em>Kutokulingana</em>, <em>Mipaka</em>, <em>Rangi</em>, <em>Diamita &gt;6mm</em>, <em>Kubadilika</em>)<br>Soma: PDSBV (<em>Mtandao wa pigimenti</em>, <em>Vidoti</em>, <em>Mstari</em>, <em>Bluu-mweupe</em>, <em>Mishipa</em>)',
    additionalText_skin:
      "Jua dalili yako: ya kawaida, <span style='color:red;'>shaka</span>, <span style='color:orange;'>imevimba</span><br>&gt;Fanya mazoezi mara kwa mara&lt;",

    pageTitle_aboutAlan: 'Kuhusu Alan',
    aboutAlanText:
      'Alan ni msaidizi wa utambuzi wa AI kwa macho, masikio, na ngozi, unaojumuisha modeli ya msingi ya lugha na mantiki ya alama. Mwerevu. Mkali. wa kisasa.<br><br>Maarifa ya kliniki, ya eneo, na picha zimeandaliwa kwa nafasi tofauti kama vile wafanyakazi wa afya na madaktari wa jumla. Mazungumzo mafupi yanazalisha utambuzi na mpango wa usimamizi. Matumizi ya Arclight yamejumuishwa kote.<br>',
    aboutAlanListItem1: 'Msingi wa wataalam – hali ya hewa ya kitropiki/moto',
    aboutAlanListItem2: 'Amejua Arclight',
    aboutAlanEfficient: '<strong>Mfanisi</strong> – lugha fupi na rahisi',
    aboutAlanEasy: '<strong>Rahisi kutumia</strong> – programu, sauti, maono',
    aboutAlanExplainable: '<strong>Inayoeleweka</strong> – ukweli/sheria, picha',
    aboutAlanEncouraging: '<strong>Inachochea</strong> – huruma, mwalimu',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Maelekezo',
    instructionsIntro:
      'Alan ni msaidizi wa AI kwa wanafunzi na wale ambao mara chache hukutana na kesi za macho, masikio, au ngozi. Andika au sema kwa uwazi na epuka kutoa majina au maelezo yanayoweza kutambulika. Angalia kwa kina kichwa/uso/kiungo cha mwili na angalia macho/masikio yote mawili. Bahati njema!',
    instructionsPatientPrompt: 'Mweleze Alan kuhusu mgonjwa wako:',
    instructionsPatientDetail1: 'tatizo na mwanzo',
    instructionsPatientDetail2: 'kilichoonekana',
    instructionsPatientDetail3: 'maono na pupil',
    instructionsPatientDetail4: 'umri, jinsia, dawa',
    instructionsUseArclight_default: 'Tumia Arclight: mbele, reflex fundal, nyuma ya jicho.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Tumia Arclight:</strong> <strong><em>mbele, reflex fundal, nyuma ya jicho.</em></strong>',
    instructionsTooLittle_eye: 'Mwanamume, jicho jekundu, nini?',
    instructionsJustRight_eye:
      'Mwanamume wa miaka 25, jicho jekundu kwa siku 3. Bila dawa wala tatizo la macho hapo awali. Maumivu, kuchemka, nukta nyeupe kwenye kornea. Pupil sawa, Maono 6/12 na 6/6 upande mwingine.',
    instructionsTooMuch_eye:
      "Mwanamume huyu alifika klinikini leo. Aliingia kwenye jengo akiwa anaendesha gari na jicho lake jekundu; anafikiri chakula alichokula kinaathiri jicho lake. Naona kuchemka na pande za jicho. Anahitaji msaada—mwanamume mrefu, macho yenye maji, aliye na wasiwasi kuhusu kornea na maumivu. Anasema, 'Hii ni nini?'",
    instructionsAdditionalQuery_eye: 'Alan pia anajibu maswali ya ufundishaji kuhusu macho: Ni nini Iritis? Naona retina vipi?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Tumia Arclight:</strong> <strong><em>kuzunguka sikio, canal, tympan.</em></strong>',
    instructionsTooLittle_ear: 'Mwanamume, sikio jekundu, nini?',
    instructionsJustRight_ear:
      'Mwanamume wa miaka 25, sikio jekundu kwa siku 3. Bila dawa wala tatizo la sikio hapo awali. Maumivu, mtoa maji ya sikio. Tympan jekundu, kusikiliza kumedewa sikio la punguza lakini sawa upande mwingine.',
    instructionsTooMuch_ear:
      "Mwanamume huyu alifika klinikini leo. Aliingia kwenye jengo na sikio jekundu na anafikiri chakula alichokula kinaathiri sikio lake. Naona mtoa maji na pande za jicho. Anahitaji msaada—mwanamume mrefu, sikio lenye maji, aliye na wasiwasi kuhusu kusikiliza na maumivu. Anasema, 'Hii ni nini?'",
    instructionsAdditionalQuery_ear: 'Alan pia anajibu maswali ya ufundishaji kuhusu masikio: Ni nini Otitis Media? Nisafishe sikio vipi?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Tumia Arclight:</strong> <strong><em>Mwangaza wa UV, dermoskopi.</em></strong>',
    instructionsTooLittle_skin: 'Mwanamume, ngozi jekundu, nini?',
    instructionsJustRight_skin:
      'Mwanamume wa miaka 25, kipande cha ngozi jekundu kwa siku 3. Bila dawa wala tatizo la ngozi hapo awali. Ngozi inauma na kuchanua.',
    instructionsTooMuch_skin:
      "Mwanamume huyu alifika klinikini leo. Aliingia kwenye jengo na ngozi jekundu na anafikiri chakula alichokula kinaathiri ngozi yake. Naona kuchemka na pande za ngozi. Anahitaji msaada—mwanamume mrefu, ngozi jekundu, aliye na wasiwasi kuhusu pigimenti na mshtuko. Anasema, 'Hii ni nini?'",
    instructionsAdditionalQuery_skin:
      'Alan pia anajibu maswali ya ufundishaji kuhusu ngozi: Ni nini Eczema? Naona mtandao wa pigimenti vipi?',
    instructionsLabelTooLittle: 'Kidogo mno',
    instructionsLabelJustRight: 'Inatosha tu',
    instructionsLabelTooMuch: 'Mingi mno',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ni msaidizi wa AI kwa wanafunzi na wale ambao mara chache hukutana na kesi za macho, masikio, au ngozi. Andika au sema kwa uwazi na epuka kutoa majina au maelezo yanayoweza kutambulika.',
    goodLuck: 'Bahati njema!',
    namePlaceholder: 'Jina',
    // rolePlaceholder: 'Wadhifa',

    // --- NEW "Experience" Dropdown Translations (Needs review for Swahili) ---
    experiencePlaceholder: 'Uzoefu',
    experienceStudentRefresher: 'Mwanafunzi / Mrejesho',
    experienceConfidentCore: 'Ujuzi wa Msingi wa Kujiamini',
    experienceExpert: 'Mtaalamu',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 mwaka',
    experienceOption2: '1-3 mwaka',
    experienceOption3: '3-7 mwaka',
    experienceOption4: '>7 mwaka',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Malengo',
    aimsOption1: 'Maoni ya pili',
    aimsOption2: 'Utafutaji wa hali',
    aimsOption3: 'Wasiliana vyema',
    */
    contactPlaceholder: 'Mawasiliano (email/simu)',
    acceptButton: 'Kubali',

    images: "Picha",
    help: "Msaada",
    screenshot: "Picha ya skrini",
    refer: "Rejelea",
    comingSoon: "Inakuja hivi karibuni...",
  },

  // 11) Urdu - ur
  ur: {
    eyesEars: 'آنکھیں، کان، جلد',
    goodHistory: 'اچھا طبی احوال',
    examineWell: 'اچھی طرح معائنہ کریں',
    useArclight: 'Arclight استعمال کریں',
    howCanIHelp: 'میں آپ کی کس طرح مدد کر سکتا ہوں؟',
    alanMistakes: `\u202Bایلن غلطی کر سکتا ہے۔ کلینکل فیصلے کا استعمال کریں۔ \u202A${new Date().getMonth() + 1}/25\u202C\u202B,`,
    login: 'لاگ ان',
    enterPassword: 'پاس ورڈ درج کریں',
    register: 'رجسٹر',
    name: 'نام',
    password: 'پاس ورڈ (4 ہندسوں کا)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Urdu) ---
    aimsPlaceholder: 'مقاصد',
    aimsEyes: 'آنکھیں',
    aimsEars: 'کان',
    aimsSkin: 'جلد',
    aimsVeterinary: 'ویٹرنری',
    aimsChildMaternal: 'بچہ/ماں',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'صحت کا کارکن',
    nurse: 'نرس',
    ophthalmicOfficer: 'چشم سرجن افسر',
    medicalStudent: 'طبی طالب علم',
    physicianAssociate: 'طبی معاون',
    generalPractitioner: 'جنرل پریکٹیشنر',
    hospitalDoctor: 'ہسپتال کا ڈاکٹر',
    ophthalmologist: 'چشم ڈاکٹر',
    optometrist: 'آپٹومیٹرسٹ',
    orthoptist: 'آنکھوں کی سیدھ کاری کا ماہر',
    entSpecialist: 'ای این ٹی ماہر',
    pharmacist: 'فارماسسٹ',
    audiologist: 'آڈیالوجسٹ',
    earCarePractitioner: 'کان کی دیکھ بھال کرنے والا',
    dermatologist: 'جلد کا ڈاکٹر',
    */

    instructionsButton: 'استعمال کا طریقہ',
    eyeButton: 'آنکھ',
    earButton: 'کان',
    skinButton: 'جلد',
    videosButton: 'ویڈیوز',
    atomsButton: 'ذرّات',
    toolsButton: 'اوزار',
    arclightProjectButton: 'Arclight پروجیکٹ',
    linksButton: 'روابط',
    aboutButton: 'کے بارے میں',

    passwordTitle: 'Alan کی دعوتی پاس ورڈ درج کریں',
    passwordPlaceholder: 'پاس ورڈ',
    passwordErrorMsg: 'غلط پاس ورڈ۔ دوبارہ کوشش کریں',
    passwordSubmitBtn: 'جمع کروائیں',
    noCodeLine: "کوئی کوڈ نہیں یا غلط کوڈ؟ ہم سے <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>یہاں</a> رابطہ کریں",

    eyeMarqueeLine1: 'گلوکوما کیا ہے؟',
    eyeMarqueeLine2: 'میں Arclight سے آپٹک ڈسک کو کیسے دیکھ سکتا ہوں؟',
    eyeMarqueeLine3: 'مرد 25 سال, 3 دن سے آنکھ لال, روشنی سے ڈر, بینائی کچھ کم',
    eyeMarqueeLine4: 'مجھے آئیریٹس کے بارے میں بتائیں',
    eyeMarqueeLine5: 'کیا پیدائشی موتیا کو فوراً ریفر کرنا چاہئے؟',
    eyeMarqueeLine6: 'خاتون 65 سال, نظر کمزور, عینک نہیں پہنتیں. آگے کی آنکھ ٹھیک, لینس دھندلا',
    eyeMarqueeLine7: 'ماں کو فکر ہے کہ بچے کی پتلی سفید ہے, اس آنکھ میں بینائی نہیں',

    earMarqueeLine1: 'اوٹائٹس میڈیا کیا ہے؟',
    earMarqueeLine2: 'کیا میں اپنے Arclight سے کان کا پردہ دیکھ سکتا ہوں؟',
    earMarqueeLine3: 'لڑکا 16 سال, کان میں 2 دن سے درد, خارش, سماعت ٹھیک',
    earMarqueeLine4: 'مجھے سرنجنگ (کان کی صفائی) کے بارے میں بتائیں',
    earMarqueeLine5: 'کیا مجھے ماسٹائڈائٹس کو فوراً ریفر کرنا چاہئے؟',
    earMarqueeLine6: 'مرد 73 سال, سماعت کمزور. کان کی نالی صاف نظر نہیں آرہی, صرف میل نظر آرہا ہے',
    earMarqueeLine7: 'بچہ آواز پر ردعمل نہیں دیتا, کئی ماہ سے',

    userInfoTitle: 'صارف کی معلومات',
    userName: 'نام',
    userContact: 'رابطہ',
    userRole: 'کردار',
    userAimsPopupLabel: "مقاصد",
    // userAims: 'مقاصد',
    userLatLong: 'طول و عرض بلد',
    userArea: 'علاقہ',
    userCountry: 'ملک',
    userVersion: 'ورژن',
    userDateTime: 'تاریخ اور وقت',
    geolocationButton: 'جغرافیائی مقام',
    geoInfoText:
      '“جغرافیائی مقام” پر کلک کرنے سے زیادہ درست مقام (عرض بلد/طول بلد) شیئر کیا جائے گا۔ اس سے بہتر رہنمائی اور اختیارات فراہم کرنے میں مدد ملتی ہے۔',

    pageTitle_howToExamineEye: 'آنکھ کا معائنہ کیسے کریں',
    frontOfEyeHeading: 'آنکھ کا اگلا حصہ',
    frontOfEyeText:
      "آنکھوں کا مشاہدہ اور موازنہ کریں: <em>سیدھا،</em> <em>دائیں،</em> <em>بائیں،</em> <em>اوپر،</em> نیچے<br><strong><u>قریبی مشاہدہ کریں</u></strong>۔ جانچیں: <em>پلکیں،</em> <em>کنجنکٹِوَا،</em> <em>قرنیہ،</em> <em>پپِل</em><br><span style='color: orange;'>فلور</span> کے ساتھ قرنیہ کے السر یا خراش کے لیے استعمال کریں",
    fundalReflexHeading: 'فنڈل ریفلیکس',
    fundalReflexText:
      '<em>مدھم</em> کمرہ، بچہ خوش؛ بازو کی لمبائی پر – ریفلیکس کا موازنہ کریں<br>برابر: <em>روشنی،</em> <em>رنگ،</em> <em>شکل</em><br>تفصیلات کے لیے قریب جائیں: <em>داغ، موتیائی، RB، Vit Haem</em>',
    backOfEyeHeading: 'آنکھ کا پچھلا حصہ',
    backOfEyeText:
      'مریض کی دائیں آنکھ دیکھنے کے لیے دائیں آنکھ استعمال کریں؛ بائیں کے لیے بائیں<br>مریض کو سیدھا دیکھنا چاہیے، روشنی کی طرف نہیں؛ قریب جائیں اور آپٹک ڈسک تلاش کریں (ڈائیلیٹ = بہترین منظر)<br>ڈسک کا مطالعہ کریں: <em>کنارہ،</em> <em>رنگ،</em> <em>کپ</em>. بڑی نالیوں کا پتہ لگائیں، پھر مریض سے براہ راست روشنی کی طرف دیکھنے کو کہیں تاکہ میکولا دیکھی جا سکے',
    additionalText_eye:
      "اپنے ڈسکس کو جانیں: معمول، <span style='color:red; font-weight:bold;'>سوجے ہوئے،</span> <span style='color:red;'>نئی نالیاں،</span> <span style='color:orange;'>کپ شدہ،</span> <span style='color:green;'>مدھم</span><br>&gt;کثرت سے مشق کریں&lt;",

    pageTitle_howToExamineEar: 'کان کا معائنہ کیسے کریں',
    allAroundEarHeading: 'کان کے گرد',
    allAroundEarText:
      'جانچیں: <em>پِنّا, </em><em>ٹرَیگَس, </em><em>ماسٹوئڈ</em> میں گلٹیاں، نرمی یا اخراج<br>پِنّا کو آہستہ حرکت دیں، کسی درد کا خیال رکھیں',
    earCanalHeading: 'کان کی نالی',
    earCanalText:
      'سر کو جھکا کر رکھیں، <strong><u>Arclight کو قلم کی طرح پکڑیں</u></strong><br>بالغوں میں پِنّا کو اوپر/پیچھے اور بچوں میں نیچے/پیچھے کھینچیں<br>اسپی큘م داخل کریں (بالغ: 4.5 ملی میٹر، بچہ: 2.5 ملی میٹر)، بالوں کو ہٹا کر گھمائیں<br>دیکھیں: <em>کان کا موم,</em> <em>فضلہ,</em> <em>انفیکشن</em>',
    tympanicMembraneHeading: 'طبلی جھلی',
    tympanicMembraneText:
      'ہتھوڑے کے ہینڈل، روشنی کا عکس، اور attic کی شناخت کریں<br>نوٹ کریں: <em>رنگ,</em> <em>مقام,</em> <em>شفافیت</em><br>چھید، سیال یا داغ تلاش کریں',
    additionalText_ear:
      "اپنے ٹی ایم کو جانیں: معمول، <span style='color:red; font-weight:bold;'>سرخ</span>, <span style='color:orange;'>ابھرا ہوا</span>, <span style='color:green;'>گھٹ گیا</span>, <span style='color:purple;'>چھید شدہ</span><br>&gt;بار بار مشق کریں&lt;",

    pageTitle_howToExamineSkin: 'جلد کا معائنہ کیسے کریں',
    generalObservationHeading: 'عمومی معائنہ',
    generalObservationText: 'تکلیوں، <em>رنگ میں تبدیلی</em> اور تقسیم کا معائنہ کریں<br>ملائمت سے ساخت، درجہ حرارت یا حساسیت کی جانچ کریں',
    uvLightHeading: 'یو وی (ووڈز) لائٹ',
    uvLightText:
      "ایک اندھیرے کمرے میں مخصوص فلوروسینس چیک کریں:<br><span style='color:teal;'>ٹینا (نیلا-سبز)</span>, <span style='color:#FF7F50;'>پٹیریاسس ورسیکولر (تانبا-نارنجی)</span>, <span style='color:#FF4040;'>ایریتھراسما (مرجان-سرخ)</span>, <span style='color:blue;'>وٹلیگو (نیلا-سفید)</span>, <span style='color:orange;'>مُنہاسے (نارنجی-سرخ)</span>, <span style='color:#BFEFFF;'>ہیڈ لائس نٹس (ہلکا نیلا)</span>",
    dermoscopyHeading: 'ڈرموسکوپی',
    dermoscopyText:
      '<strong><u>Arclight پولرائزر کو قلم کی طرح پکڑیں</u></strong>, چیک کریں: <strong>ABCDE</strong> (<em>غیر متناسب</em>, <em>حد</em>, <em>رنگ</em>, <em>6mm سے بڑا قطر</em>, <em>بدلتا ہوا</em>)<br>مطالعہ کریں: PDSBV (<em>پیگمنٹ نیٹ ورک</em>, <em>نقطے</em>, <em>لکیریں</em>, <em>نیلا-سفید</em>, <em>خون کی نالی</em>)',
    additionalText_skin:
      "اپنی بیماری کو پہچانیں: معمول، <span style='color:red;'>مشکوک</span>, <span style='color:orange;'>سوجن زدہ</span><br>&gt;باقاعدگی سے مشق کریں&lt;",

    pageTitle_aboutAlan: 'ایلن کے بارے میں',
    aboutAlanText:
      'آلان ایک AI آنکھ، کان اور جلد تشخیصی معاون ہے، جس میں بنیادی لسانی ماڈل اور علامتی منطق شامل ہیں۔ ذہین۔ سنجیدہ۔ جدید ترین۔<br><br>کلینیکل، مقامی علم اور تصاویر کو صحت کارکنوں اور جنرل پریکٹیشنرز جیسے مختلف کرداروں کے لیے ڈھالا گیا ہے۔ مختصر مکالمہ تشخیص اور انتظامی منصوبہ تیار کرتا ہے۔ Arclight کا استعمال ہر جگہ شامل ہے۔<br>',
    aboutAlanListItem1: 'ماہر بنیاد – گرم اور استوائی آب و ہوا',
    aboutAlanListItem2: 'Arclight سے واقف',
    aboutAlanEfficient: '<strong>موثر</strong> – مختصر، آسان زبان',
    aboutAlanEasy: '<strong>آسان استعمال</strong> – ایپ، آواز، بصارت',
    aboutAlanExplainable: '<strong>قابل وضاحت</strong> – حقائق/قوانین، تصاویر',
    aboutAlanEncouraging: '<strong>حوصلہ افزا</strong> – ہمدردی، استاد',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'ہدایات',
    instructionsIntro:
      'Alan ایک AI اسسٹنٹ ہے جو طلباء اور اُن لوگوں کے لیے ہے جو کبھی کبھار آنکھ، کان یا جلد کے معاملات دیکھتے ہیں۔ براہ کرم واضح لکھیں یا بولیں اور شناختی نام یا تفصیلات سے بچیں۔ سر/چہرے/متعلقہ حصے کو اچھی طرح دیکھیں اور دونوں آنکھیں/کان جانچیں۔ نیک تمنائیں!',
    instructionsPatientPrompt: 'اپنے مریض کے بارے میں Alan کو بتائیں:',
    instructionsPatientDetail1: 'مسئلہ اور آغاز',
    instructionsPatientDetail2: 'جو آپ دیکھتے ہیں',
    instructionsPatientDetail3: 'نظر اور پپیلیں',
    instructionsPatientDetail4: 'عمر، جنس، ادویات',
    instructionsUseArclight_default: 'Arclight استعمال کریں: سامنے، انعکاس شبکیہ، پیچھے کی آنکھ۔',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Arclight استعمال کریں:</strong> <strong><em>سامنے، fundal reflex، پیچھے کی آنکھ۔</em></strong>',
    instructionsTooLittle_eye: 'مرد، سرخ آنکھ، کیا؟',
    instructionsJustRight_eye:
      'مرد 25 سال، آنکھ سرخ 3 دن۔ پہلے کوئی دوا یا آنکھ کا مسئلہ نہیں تھا۔ درد، آنکھ سے پانی، سفید کورنیا ڈاٹ۔ پپیلیں ٹھیک، نظر 6/12 اور 6/6 دوسری آنکھ میں۔',
    instructionsTooMuch_eye:
      "آج یہ مرد کلینک آیا۔ وہ گاڑی چلاتے ہوئے عمارت میں داخل ہوا اور اس کی آنکھ سرخ ہے، اب وہ سمجھتا ہے کہ کھایا ہوا کھانا اس کی آنکھ کو متاثر کر رہا ہے۔ میں آنکھ سے پانی اور سرخ کنارے دیکھتا ہوں۔ وہ مدد چاہتا ہے—لمبا مرد، آنکھیں پانی والی، کورنیا اور درد کے بارے में فکر مند۔ وہ پوچھتا ہے، 'یہ کیا ہے؟'",
    instructionsAdditionalQuery_eye: 'Alan آنکھ سے متعلق تدریسی سوالات کا بھی جواب دیتا ہے: Iritis کیا ہے؟ میں retina کیسے دیکھوں؟',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Arclight استعمال کریں:</strong> <strong><em>گھیرے کان، نالی، tympan.</em></strong>',
    instructionsTooLittle_ear: 'مرد، سرخ کان، کیا؟',
    instructionsJustRight_ear:
      'مرد 25 سال، کان سرخ 3 دن۔ پہلے کوئی دوا یا کان کا مسئلہ نہیں تھا۔ درد، کان سے رطوبت۔ سرخ tympan، خراب کان میں سننا دھندلا لیکن دوسری میں ٹھیک۔',
    instructionsTooMuch_ear:
      "آج یہ مرد کلینک آیا۔ وہ گاڑی چلاتے ہوئے عمارت میں داخل ہوا اور اس کے کان سرخ ہیں، اب وہ سمجھتا ہے کہ کھایا ہوا کھانا اس کے کان کو متاثر کر رہا ہے۔ میں کان سے رطوبت اور سرخ کنارے دیکھتا ہوں۔ وہ مدد چاہتا ہے—لمبا مرد، کان پانی والے، سننے اور درد کے بارے में فکر مند۔ وہ پوچھتا ہے، 'یہ کیا ہے؟'",
    instructionsAdditionalQuery_ear: 'Alan کان سے متعلق تدریسی سوالات کا بھی جواب دیتا ہے: آوٹائٹس میڈیا کیا ہے؟ میں کان کیسے صاف کروں؟',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Arclight استعمال کریں:</strong> <strong><em>UV روشنی، جلد کا معائنہ۔</em></strong>',
    instructionsTooLittle_skin: 'مرد، سرخ جلد، کیا؟',
    instructionsJustRight_skin: 'مرد 25 سال، 3 دن تک سرخ جلد کا پیچ۔ پہلے کوئی دوا یا جلد کا مسئلہ نہیں تھا۔ جلد میں خارش اور درد۔',
    instructionsTooMuch_skin:
      "آج یہ مرد کلینک آیا۔ وہ گاڑی چلاتے ہوئے عمارت میں داخل ہوا اور اس کی جلد سرخ ہے، اب وہ سمجھتا ہے کہ کھایا ہوا کھانا اس کی جلد کو متاثر کر رہا ہے۔ میں جلد سے پانی اور سرخ کنارے دیکھتا ہوں۔ وہ مدد چاہتا ہے—لمبا مرد، سرخ جلد، رنگ اور خارش کو لے کر فکر مند۔ وہ پوچھتا ہے، 'یہ کیا ہے؟'",
    instructionsAdditionalQuery_skin: 'Alan جلد سے متعلق تدریسی سوالات کا بھی جواب دیتا ہے: ایگزما کیا ہے؟ میں رنگ کا جال کیسے دیکھوں؟',
    instructionsLabelTooLittle: 'بہت کم',
    instructionsLabelJustRight: 'بالکل ٹھیک',
    instructionsLabelTooMuch: 'بہت زیادہ',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ایک AI معاون ہے جو طلباء اور اُن افراد کے لیے ہے جو کبھی کبھار آنکھ، کان یا جلد کے معاملات دیکھتے ہیں۔ براہ کرم واضح لکھیں یا بولیں اور شناختی نام یا تفصیلات ظاہر کرنے سے گریز کریں۔',
    goodLuck: 'اچھی قسمت!',
    namePlaceholder: 'نام',
    // rolePlaceholder: 'کردار',

    // --- NEW "Experience" Dropdown Translations (Needs review for Urdu) ---
    experiencePlaceholder: 'تجربہ',
    experienceStudentRefresher: 'طالب علم / تازہ کاری',
    experienceConfidentCore: 'پراعتماد بنیادی علم',
    experienceExpert: 'ماہر',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 سال',
    experienceOption2: '1-3 سال',
    experienceOption3: '3-7 سال',
    experienceOption4: '>7 سال',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'اہداف',
    aimsOption1: 'دوسرا نظریہ',
    aimsOption2: 'حالت کی تلاش',
    aimsOption3: 'بہتر رابطہ',
    */
    contactPlaceholder: 'رابطہ (ای میل/فون)',
    acceptButton: 'قبول کریں',

    images: "تصاویر",
    help: "مدد",
    screenshot: "اسکرین شاٹ",
    refer: "ریفر",
    comingSoon: "جلد آ رہا ہے...",
  },

  // 12) Persian (Farsi) - fa
  fa: {
    eyesEars: 'چشم‌ها، گوش‌ها، پوست',
    goodHistory: 'تاریخچه خوب',
    examineWell: 'خوب معاینه کنید',
    useArclight: 'استفاده از Arclight',
    howCanIHelp: 'چطور می‌توانم کمکتان کنم؟',
    alanMistakes: `\u202Bآلن ممکن است اشتباه کند. از قضاوت بالینی استفاده کنید. \u202A${new Date().getMonth() + 1}/25\u202C\u202B,`,
    login: 'ورود',
    enterPassword: 'رمز عبور را وارد کنید',
    register: 'ثبت‌نام',
    name: 'نام',
    password: 'رمز (4 رقم)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Farsi) ---
    aimsPlaceholder: 'اهداف',
    aimsEyes: 'چشم',
    aimsEars: 'گوش',
    aimsSkin: 'پوست',
    aimsVeterinary: 'دامپزشکی',
    aimsChildMaternal: 'کودک/مادر',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'نیروی بهداشتی',
    nurse: 'پرستار',
    ophthalmicOfficer: 'کارشناس بالینی چشم',
    medicalStudent: 'دانشجوی پزشکی',
    physicianAssociate: 'دستیار پزشک',
    generalPractitioner: 'پزشک عمومی',
    hospitalDoctor: 'پزشک بیمارستان',
    ophthalmologist: 'چشم‌پزشک',
    optometrist: 'بینایی‌سنج',
    orthoptist: 'Orthoptist',
    entSpecialist: 'متخصص گوش و حلق و بینی',
    pharmacist: 'داروساز',
    audiologist: 'شنوایی‌شناس',
    earCarePractitioner: 'متخصص مراقبت از گوش',
    dermatologist: 'متخصص پوست',
    */

    instructionsButton: 'چگونه استفاده کنیم',
    eyeButton: 'چشم',
    earButton: 'گوش',
    skinButton: 'پوست',
    videosButton: 'ویدیوها',
    atomsButton: 'اتم‌ها',
    toolsButton: 'ابزار',
    arclightProjectButton: 'پروژه Arclight',
    linksButton: 'لینک‌ها',
    aboutButton: 'درباره',

    passwordTitle: 'رمز عبور دعوت Alan را وارد کنید',
    passwordPlaceholder: 'رمز عبور',
    passwordErrorMsg: 'رمز عبور نامعتبر است. لطفاً دوباره تلاش کنید',
    passwordSubmitBtn: 'ارسال',
    noCodeLine:
      "کد وجود ندارد یا اشتباه است؟ با ما <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>اینجا</a> تماس بگیرید",

    eyeMarqueeLine1: 'گلوکوم چیست؟',
    eyeMarqueeLine2: 'چطور با Arclight دیسک اپتیکی را ببینم؟',
    eyeMarqueeLine3: 'مرد ۲۵ ساله، چشم قرمز به مدت ۳ روز، فوتوفوبیا، کمی کاهش بینایی',
    eyeMarqueeLine4: 'درباره التهاب عنبیه توضیح دهید',
    eyeMarqueeLine5: 'آیا باید آب مروارید مادرزادی را فوراً ارجاع دهم؟',
    eyeMarqueeLine6: 'زن ۶۵ ساله، بینایی ضعیف، بدون عینک. جلوی چشم خوب است، عدسی کدر',
    eyeMarqueeLine7: 'مادر نگران است: کودک مردمک سفید دارد، در آن چشم دید ندارد',

    earMarqueeLine1: 'اوتیت مدیا چیست؟',
    earMarqueeLine2: 'آیا می‌توانم پرده گوش را با Arclight ببینم؟',
    earMarqueeLine3: 'پسری ۱۶ ساله، درد لاله گوش به مدت ۲ روز، خارش، شنوایی خوب',
    earMarqueeLine4: 'درباره شستشوی گوش (سیرینجینگ) توضیح دهید',
    earMarqueeLine5: 'آیا باید ماستوئیدیت را فوراً ارجاع دهم؟',
    earMarqueeLine6: 'مرد ۷۳ ساله، شنوایی ضعیف. کانال گوش واضح دیده نمی‌شود. فقط جرم گوش می‌بینم',
    earMarqueeLine7: 'نوزاد ماه‌هاست واکنشی به صدا ندارد',

    userInfoTitle: 'اطلاعات کاربر',
    userName: 'نام',
    userContact: 'اطلاعات تماس',
    userRole: 'نقش',
    userAimsPopupLabel: "اهداف",
    // userAims: 'اهداف',
    userLatLong: 'عرض و طول جغرافیایی',
    userArea: 'منطقه',
    userCountry: 'کشور',
    userVersion: 'نسخه',
    userDateTime: 'تاریخ و زمان',
    geolocationButton: 'موقعیت‌یابی',
    geoInfoText: 'با کلیک بر روی "موقعیت‌یابی" مکان دقیق‌تری (عرض/طول) به اشتراک گذاشته می‌شود. این به ارائه راهنمایی و گزینه‌های بهتر کمک می‌کند.',

    pageTitle_howToExamineEye: 'چگونه چشم را معاینه کنیم',
    frontOfEyeHeading: 'قسمت جلوی چشم',
    frontOfEyeText:
      "چشم‌ها را مشاهده و مقایسه کنید: <em>مستقیم،</em> <em>راست،</em> <em>چپ،</em> <em>بالا،</em> پایین<br><strong><u>نزدیک شده و ثابت نگه دارید</u></strong>. بررسی کنید: <em>پلک‌ها،</em> <em>ملتحمه،</em> <em>قرنیه،</em> <em>بؤبؤ</em><br>از <span style='color: orange;'>فلور</span> برای زخم‌های قرنیه یا خط‌خوردگی استفاده کنید",
    fundalReflexHeading: 'رفلکس فاندال',
    fundalReflexText:
      'اتاق <em>کم نور</em>، کودک شاد؛ در فاصله یک بازو – رفلکس‌ها را مقایسه کنید<br>برابر: <em>درخشندگی،</em> <em>رنگ،</em> <em>شکل</em><br>برای جزئیات نزدیک شوید: <em>زخم، کاتاراکت، RB، خونریزی ویتری</em>',
    backOfEyeHeading: 'قسمت پشتی چشم',
    backOfEyeText:
      'از چشم راست برای دیدن چشم راست بیمار استفاده کنید؛ برای چشم چپ، چپ<br>بیمار باید مستقیم ببیند نه به سمت نور؛ نزدیک شوید و دیسک بینایی را پیدا کنید (گشادکردن = بهترین دید)<br>دیسک را بررسی کنید: <em>حاشیه،</em> <em>رنگ،</em> <em>کاسه</em>. عروق بزرگ را دنبال کنید، سپس از بیمار بخواهید مستقیم به نور نگاه کند تا ماکولا را ببیند',
    additionalText_eye:
      "دیسک‌های خود را بشناسید: معمولی، <span style='color:red; font-weight:bold;'>متورم،</span> <span style='color:red;'>عروق جدید،</span> <span style='color:orange;'>کاسه‌دار،</span> <span style='color:green;'>رنگ پریده</span><br>&gt;تمرین کنید&lt;",

    pageTitle_howToExamineEar: 'چگونه گوش را معاینه کنیم',
    allAroundEarHeading: 'اطراف گوش',
    allAroundEarText:
      'بررسی کنید: <em>گوش بیرونی, </em><em>ترَگوس, </em><em>ماستوئید</em> به دنبال توده، حساسیت یا ترشح<br>به آرامی گوش بیرونی را حرکت دهید، به درد توجه کنید',
    earCanalHeading: 'کانال شنوایی',
    earCanalText:
      'سر را کج کنید، <strong><u>Arclight را مانند یک خودکار در دست بگیرید</u></strong><br>گوش بیرونی را به سمت بالا/پشت (بزرگسالان) یا پایین/پشت (کودکان) بکشید<br>اسپکولوم (۴.۵ میلی‌متر بزرگسال، ۲.۵ میلی‌متر نوزاد) را وارد کنید، از روی موها عبور دهید، در صورت نیاز بچرخانید<br>به دنبال: <em>موم گوش,</em> <em>ضایعات,</em> <em>عفونت</em> بگردید',
    tympanicMembraneHeading: 'غشا تیپانیک',
    tympanicMembraneText:
      'دسته مالئوس، بازتاب نور و آتیک را شناسایی کنید<br>توجه کنید: <em>رنگ,</em> <em>موقعیت,</em> <em>شفافیت</em><br>به دنبال سوراخ، مایع یا زخم باشید',
    additionalText_ear:
      "تی‌ام خود را بشناسید: نرمال، <span style='color:red; font-weight:bold;'>قرمز</span>, <span style='color:orange;'>برآمده</span>, <span style='color:green;'>منقبض</span>, <span style='color:purple;'>سوراخ‌دار</span><br>&gt;تمرین کنید&lt;",

    pageTitle_howToExamineSkin: 'چگونه پوست را معاینه کنیم',
    generalObservationHeading: 'مشاهده کلی',
    generalObservationText: 'توده‌ها، <em>تغییرات رنگ</em> و توزیع را بررسی کنید<br>به آرامی بافت، دما یا حساسیت را لمس کنید',
    uvLightHeading: 'نور ماوراء بنفش (Wood’s)',
    uvLightText:
      "در اتاقی تاریک، به فلورسانس مشخص توجه کنید:<br><span style='color:teal;'>تينيا (آبی-سبز)</span>, <span style='color:#FF7F50;'>پيتيريازيس ورسیکولر (نارنجی مسی)</span>, <span style='color:#FF4040;'>ايريثراسم (قرمز مرجانی)</span>, <span style='color:blue;'>ويتيلو (آبی-سفید)</span>, <span style='color:orange;'>آکنه (قرمز-نارنجی)</span>, <span style='color:#BFEFFF;'>تخم کچل (آبی کمرنگ)</span>",
    dermoscopyHeading: 'درموسکوپی',
    dermoscopyText:
      '<strong><u>Arclight پولاریزر را مانند یک قلم نگه دارید</u></strong>, بررسی کنید: <strong>ABCDE</strong> (<em>نامتقارن</em>, <em>حاشیه</em>, <em>رنگ</em>, <em>قطر &gt;6mm</em>, <em>در حال تغییر</em>)<br>بررسی کنید: PDSBV (<em>شبکه رنگدانه‌ای</em>, <em>نقاط</em>, <em>خطوط</em>, <em>آبی-سفید</em>, <em>عروقی</em>)',
    additionalText_skin:
      "ضایعه خود را بشناسید: طبیعی، <span style='color:red;'>مشکوک</span>, <span style='color:orange;'>التهاب‌دار</span><br>&gt;تمرین کنید&lt;",

    pageTitle_aboutAlan: 'درباره آلان',
    aboutAlanText:
      'آلان یک دستیار تشخیصی هوش مصنوعی برای چشم، گوش و پوست است که شامل یک مدل زبان بنیادی و منطق نمادین می‌باشد. هوشمند. جدی. پیشرفته.<br><br>دانش بالینی، محلی و تصاویر برای نقش‌هایی مانند کارگران بهداشت و پزشکان عمومی به‌طور دقیق تنظیم شده‌اند. گفتگوی مختصر تشخیص و برنامه مدیریت را به همراه دارد. استفاده از Arclight در کل فرآیند تعبیه شده است.<br>',
    aboutAlanListItem1: 'پایه تخصص – اقلیم گرمسیری/داغ',
    aboutAlanListItem2: 'آگاه از Arclight',
    aboutAlanEfficient: '<strong>کارآمد</strong> – زبان مختصر و ساده',
    aboutAlanEasy: '<strong>راحت در استفاده</strong> – اپ، صدا، دید',
    aboutAlanExplainable: '<strong>قابل توضیح</strong> – حقایق/قوانین، تصاویر',
    aboutAlanEncouraging: '<strong>دلگرم‌کننده</strong> – همدلی، معلم',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'دستورالعمل‌ها',
    instructionsIntro:
      'Alan یک دستیار هوش مصنوعی برای دانشجویان و کسانی است که به ندرت با موارد چشم، گوش یا پوست مواجه می‌شوند. با وضوح بنویسید یا صحبت کنید و از افشای نام‌ها یا جزئیات شناسایی‌کننده اجتناب کنید. به طور کامل سر/صورت/بخشی از بدن را ببینید و هر دو چشم/گوش را معاینه کنید. موفق باشید!',
    instructionsPatientPrompt: 'درباره بیمار خود به Alan بگویید:',
    instructionsPatientDetail1: 'مشکل و زمان شروع',
    instructionsPatientDetail2: 'آنچه مشاهده می‌کنید',
    instructionsPatientDetail3: 'بینایی و مردمک‌ها',
    instructionsPatientDetail4: 'سن، جنسیت، داروها',
    instructionsUseArclight_default: 'از Arclight استفاده کنید: جلو، بازتاب fundal، پشت چشم.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>از Arclight استفاده کنید:</strong> <strong><em>جلو، بازتاب fundal، پشت چشم.</em></strong>',
    instructionsTooLittle_eye: 'مرد، چشم قرمز، چه؟',
    instructionsJustRight_eye:
      'مرد 25 سال، چشم قرمز به مدت 3 روز. پیش از این دارویی مصرف نکرده یا مشکلی نداشته. درد، اشک، نقطه سفید روی قرنیه. مردمک‌ها طبیعی، بینایی 6/12 و 6/6 در چشم دیگر.',
    instructionsTooMuch_eye:
      'این مرد امروز وارد کلینیک شد. او با رانندگی وارد ساختمان شد و چشمش قرمز است؛ او فکر می‌کند که غذایی که خورده بر چشمش تأثیر گذاشته است. من اشک و لبه‌های قرمز را می‌بینم. او نیاز به کمک دارد—مرد بلند، چشم‌های اشک‌آلود، نگران قرنیه و درد. او می‌گوید: «این چیست؟»',
    instructionsAdditionalQuery_eye: 'Alan همچنین به پرسش‌های آموزشی درباره چشم پاسخ می‌دهد: التهاب عنبیه چیست؟ چگونه شبکیه را می‌بینم؟',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>از Arclight استفاده کنید:</strong> <strong><em>اطراف گوش، کانال، تمپو.</em></strong>',
    instructionsTooLittle_ear: 'مرد، گوش قرمز، چه؟',
    instructionsJustRight_ear:
      'مرد 25 سال، گوش قرمز به مدت 3 روز. پیش از این دارویی مصرف نکرده یا مشکلی نداشته. درد، ترشح گوش. تمپو قرمز، شنیداری در گوش مشکل کمی کاهش یافته ولی در گوش دیگر طبیعی است.',
    instructionsTooMuch_ear:
      'این مرد امروز وارد کلینیک شد. او با رانندگی وارد ساختمان شد و گوش‌هایش قرمز هستند و فکر می‌کند غذایی که خورده بر گوشش تأثیر گذاشته است. من ترشح و لبه‌های قرمز را می‌بینم. او نیاز به کمک دارد—مرد بلند، گوش‌های اشک‌آلود، نگران شنیداری و درد. او می‌گوید: «این چیست؟»',
    instructionsAdditionalQuery_ear: 'Alan همچنین به پرسش‌های آموزشی درباره گوش پاسخ می‌دهد: التهاب گوش میانی چیست؟ چگونه گوش را تمیز کنم؟',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>از Arclight استفاده کنید:</strong> <strong><em>نور UV، درموسکوپی.</em></strong>',
    instructionsTooLittle_skin: 'مرد، پوست قرمز، چه؟',
    instructionsJustRight_skin: 'مرد 25 سال، لکه قرمز پوست به مدت 3 روز. پیش از این دارویی مصرف نکرده یا مشکلی نداشته. پوست دردناک و خارش دارد.',
    instructionsTooMuch_skin:
      'این مرد امروز وارد کلینیک شد. او با رانندگی وارد ساختمان شد و پوستش قرمز است و فکر می‌کند غذایی که خورده بر پوستش تأثیر گذاشته است. من اشک و لبه‌های قرمز را می‌بینم. او نیاز به کمک دارد—مرد بلند، پوست قرمز، نگران رنگ و التهاب. او می‌گوید: «این چیست؟»',
    instructionsAdditionalQuery_skin: 'Alan همچنین به پرسش‌های آموزشی درباره پوست پاسخ می‌دهد: اگزما چیست؟ چگونه شبکه رنگدانه را می‌بینم؟',
    instructionsLabelTooLittle: 'بسیار کم',
    instructionsLabelJustRight: 'کاملاً مناسب',
    instructionsLabelTooMuch: 'بسیار زیاد',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan یک دستیار هوش مصنوعی است برای دانشجویان و کسانی که به ندرت با موارد چشم، گوش یا پوست مواجه می‌شوند. با وضوح بنویسید یا صحبت کنید و از افشای نام‌ها یا جزئیات شناسایی‌کننده اجتناب کنید.',
    goodLuck: 'موفق باشید!',
    namePlaceholder: 'نام',
    // rolePlaceholder: 'نقش',

    // --- NEW "Experience" Dropdown Translations (Needs review for Farsi) ---
    experiencePlaceholder: 'تجربه',
    experienceStudentRefresher: 'دانشجو / بازآموزی',
    experienceConfidentCore: 'دانش پایه قوی',
    experienceExpert: 'متخصص',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 سال',
    experienceOption2: '1-3 سال',
    experienceOption3: '3-7 سال',
    experienceOption4: '>7 سال',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'اهداف',
    aimsOption1: 'نظر دوم',
    aimsOption2: 'بررسی وضعیت',
    aimsOption3: 'ارتباط بهتر',
    */
    contactPlaceholder: 'تماس (ایمیل/تلفن)',
    acceptButton: 'قبول کنید',

    images: "تصاویر",
    help: "راهنما",
    screenshot: "اسکرین شات",
    refer: "ارجاع",
    comingSoon: "به‌ زودی..."
  },

  // 13) Lingala - ln
  ln: {
    eyesEars: 'Misu, Makutu, Pɔ̃',
    goodHistory: 'Lisolo ya malamu',
    examineWell: 'Tala malamu',
    useArclight: 'Salela Arclight',
    howCanIHelp: 'Nakoki kosalisa yo ndenge nini?',
    alanMistakes: `Alan akoki kosala mabunga. Salelá mayele na yo ya bonganga. ${new Date().getMonth() + 1}/25,`,
    login: 'Kɔta',
    enterPassword: 'Tika mpasi ya se (pass)',
    register: 'Kokoma',
    name: 'Kombo',
    password: 'Mpasi ya se (4 mitindo)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Lingala) ---
    aimsPlaceholder: 'Mikano',
    aimsEyes: 'Misu',
    aimsEars: 'Makutu',
    aimsSkin: 'Pɔ̃ (Akpɔkpɔ)',
    aimsVeterinary: 'Mifugo (Veterinari)',
    aimsChildMaternal: 'Bana/Mama',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Mosali ya bokolongono',
    nurse: 'Nɛsɛ',
    ophthalmicOfficer: 'Ofisye ya misu',
    medicalStudent: 'Moyekoli ya bonganga',
    physicianAssociate: 'Mosalani ya monganga',
    generalPractitioner: 'Monganga ya maye matali nyonso',
    hospitalDoctor: 'Monganga ya lopitalo',
    ophthalmologist: 'Monganga ya misu',
    optometrist: 'Optometriste',
    orthoptist: 'Orthoptiste',
    entSpecialist: 'Monganga ya matoyi, zolo, monoko',
    pharmacist: 'Mokɛngɛli ya minerval',
    audiologist: 'Monganga ya koyoka',
    earCarePractitioner: 'Mosungi ya kosalisa matoyi',
    dermatologist: 'Monganga ya pɔ̃',
    */

    instructionsButton: 'Ndenge ya kosalela',
    eyeButton: 'Misu',
    earButton: 'Matoyi',
    skinButton: 'Pɔ̃ (Akpɔkpɔ)',
    videosButton: 'Bafilime',
    atomsButton: 'Atoms',
    toolsButton: 'Mikolo (Outils)',
    arclightProjectButton: 'Projeti Arclight',
    linksButton: 'Minɔkɔ',
    aboutButton: 'Likambo etali',

    passwordTitle: 'Tika mpasi ya se ya invitasyon Alan',
    passwordPlaceholder: 'Mpasi ya se (Password)',
    passwordErrorMsg: 'Mpasi ya se ezali malamu te. Simba lisusu',
    passwordSubmitBtn: 'Tinda',
    noCodeLine: "Kode ezali te to ebungi? Sanganá na biso <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>awa</a>",

    eyeMarqueeLine1: 'Glaucoma ezali nini?',
    eyeMarqueeLine2: 'Naboni namonaka disiki ya liso (optic disc) na Arclight?',
    eyeMarqueeLine3: 'Mobali 25, liso ebotoli mikolo 3, alingaka te pole, liyebisi momeseno',
    eyeMarqueeLine4: 'Loba na ngai likambo ya Iritis',
    eyeMarqueeLine5: 'Esengeli natindela moto oyo azali na cataract ya bokilo mbangu?',
    eyeMarqueeLine6: 'Mwasi 65, komona ya mabe, azali te na lunete. Eteni ya liboso ezali malamu, kasi lenti ezozala mpasi',
    eyeMarqueeLine7: 'Mama azali kobanga, mwana azali na zenitho ya pembe, azali te komona na liso yango',

    earMarqueeLine1: 'Otitis media ezali nini?',
    earMarqueeLine2: 'Nakoki komona membrane tympanic na Arclight na ngai?',
    earMarqueeLine3: 'Mobali 16, bololo ya litoyi, mikolo 2, kosokola, koyoka ezali malamu',
    earMarqueeLine4: 'Lobela ngai likambo ya kosukola litoyi (syringing)',
    earMarqueeLine5: 'Esengeli natindela moto oyo azali na mastoiditis mbangu?',
    earMarqueeLine6: 'Mobali 73, koyoka eza mabe. Monoko ya litoyi emonanaka malamu te, namoni kaka cérumen',
    earMarqueeLine7: 'Mwana moke ayokaka te mongongo. Ekomi bileko mingi',

    userInfoTitle: 'Mikanda ya Motángo',
    userName: 'Kombo',
    userContact: 'Nzela ya kokutana',
    userRole: 'Mosala',
    userAimsPopupLabel: "Mikano",
    // userAims: 'Mikano',
    userLatLong: 'Longitude & Latitude',
    userArea: 'Esika',
    userCountry: 'Ekokwamba',
    userVersion: 'Edisyo',
    userDateTime: 'Mokolo & Ngonga',
    geolocationButton: 'Lokasyon',
    geoInfoText: 'Na kokliká "Lokasyon", esika ya solo (lat/long) ekobimisama malamu. Likambo wana ekosalisa na kopesa mayele mpe ba chwa ya malamu.',

    pageTitle_howToExamineEye: 'Ndenge ya kotala jiso',
    frontOfEyeHeading: 'Liboso ya Jiso',
    frontOfEyeText:
      "Tala mpe kompara mayebi: <em>mpe na bolamu,</em> <em>na mosika,</em> <em>na mibale,</em> <em>na likolo,</em> na nse<br><strong><u>Zwa mpe kokende koleka</u></strong>. Somba: <em>lipoto,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupille</em><br>Salela na <span style='color: orange;'>fluro</span> mpo na mikakatano ya cornea to mikakatano",
    fundalReflexHeading: 'Mokano ya Fundal',
    fundalReflexText:
      'Kamanda na ndako ya <em>mokonzi mabe</em>, mwana ayebi esengo; na ntango ya bras – kompara mikano<br>Ya likele: <em>Kitoko,</em> <em>Loko,</em> <em>Forma</em><br>Kende koleka mpo na mayele: <em>Leso, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Likolo ya Jiso',
    backOfEyeText:
      'Kozala na jeye ya motuya mpo na komona jiso ya moboti; na mosika mpo na komona jiso ya mobali<br>Moboti esengeli kotala lokola ezali te na polele; koluka lisusu optic disc (Dilate = malamu koleka)<br>Lakisa disc: <em>Margine,</em> <em>Loko,</em> <em>Kop</em>. Suivie bilamba minene, sima pesa moboti koyeba na polele mpo na komona macula',
    additionalText_eye:
      "Yeba disko na yo: normal, <span style='color:red; font-weight:bold;'>ekoki kokamwa,</span> <span style='color:red;'>bilamba ya sika,</span> <span style='color:orange;'>ekweli,</span> <span style='color:green;'>mbeya</span><br>&gt;Zala na pratique mingi&lt;",

    pageTitle_howToExamineEar: 'Ndenge ya kotala ntɔ́ngɔ ya ntɛ́',
    allAroundEarHeading: 'Na eteni ya ntɛ́',
    allAroundEarText:
      'Tala: <em>pinna, </em><em>tragus, </em><em>mastoid</em> mpo na biloko, ntina to mbulamatata<br>Zwa pinna na bolamu, landa soki ezali na mawa',
    earCanalHeading: 'Nzela ya ntɛ́',
    earCanalText:
      'Poná mutu, <strong><u>kamata Arclight lokola patano</u></strong><br>Hela pinna epai ya likoló/mokolo (bato minene) to epai ya na mabe (bato ya bana)<br>Kotika spéculum (4.5mm ya bato minene, 2.5mm ya bana), pesa mingi na biloko ya minene, pesa bokebi soki esengeli<br>Luka: <em>wax,</em> <em>bilamba,</em> <em>mpasi</em>',
    tympanicMembraneHeading: 'Membrane ya tympanique',
    tympanicMembraneText:
      'Zua mpona ya mélé ya malleus, mosangani ya mwanga, na attic<br>Yeba: <em>eleko,</em> <em>esika,</em> <em>loki ya kotika</em><br>Luka soki ezali na kotika, mayele to mikakatano',
    additionalText_ear:
      "Yeba TM na yo: ya normal, <span style='color:red; font-weight:bold;'>motuya</span>, <span style='color:orange;'>ekokamwa</span>, <span style='color:green;'>ekopesi</span>, <span style='color:purple;'>ekotambwama</span><br>&gt;Zala na pratique mingi&lt;",

    pageTitle_howToExamineSkin: 'Ndenge ya kotala nzoto',
    generalObservationHeading: 'Kotala ya ndenge nyonso',
    generalObservationText: 'Tala biloko ya mikuta, <em>mpaya ya lokota</em> mpe boyebi<br>Pona mabɔkɔ mpo na koyeba ndenge, molunge to mawa',
    uvLightHeading: 'Mwangaza ya UV (Wood’s)',
    uvLightText:
      "Na ndako ya kimia, tala bilamba ya fluorescence ya kokamwa:<br><span style='color:teal;'>tinea (bluu-ya-mokili)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (orange ya shaba)</span>, <span style='color:#FF4040;'>erythrasma (rouge ya korali)</span>, <span style='color:blue;'>vitiligo (bluu-mweupe)</span>, <span style='color:orange;'>acne (orange-red)</span>, <span style='color:#BFEFFF;'>head lice nits (bluu ya pɛ̃ mpo na kosika)</span>",
    dermoscopyHeading: 'Dermoskopi',
    dermoscopyText:
      '<strong><u>Kamata Arclight polariser lokola patano</u></strong>, tala: <strong>ABCDE</strong> (<em>Asymétrie</em>, <em>Limite</em>, <em>Lokota</em>, <em>Diametre &gt;6mm</em>, <em>Ekosangisa</em>)<br>Kende kotala: PDSBV (<em>Neti ya pigment</em>, <em>Ntango</em>, <em>Misala</em>, <em>Bluu-mweupe</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Yeba lesion na yo: ya normal, <span style='color:red; font-weight:bold;'>mosakoli</span>, <span style='color:orange;'>ekuveta</span><br>&gt;Zala na pratique mingi&lt;",

    pageTitle_aboutAlan: 'Likoló na Alan',
    aboutAlanText:
      'Alan ezali motambwisi ya mayele ya AI ya kotala miso, matama mpe nzoto, ezali na modèle ya lokota ya liboso mpe logique symbolique. Emonene. Ekolaka makasi. Eza na stat ya sika.<br><br>Mayele ya kliniki, ya mboka mpe bilamba, esalemi malamu mpo na ba rôles lokola ba health workers mpe ba général practitioners. Mabongisi mafupi emema diagnosis mpe plan ya management. Matumelo ya Arclight ezali na kati nyonso.<br>',
    aboutAlanListItem1: 'Base ya ba experts – climat ya tropikal/ya moto',
    aboutAlanListItem2: 'Eyebi na Arclight',
    aboutAlanEfficient: '<strong>Efficient</strong> – lokota ya mafupi, ya pɔkɔ',
    aboutAlanEasy: '<strong>Easy-to-use</strong> – app, voix, vision',
    aboutAlanExplainable: '<strong>Explainable</strong> – biloko/mitindo, bilamba',
    aboutAlanEncouraging: '<strong>Encouraging</strong> – empathy, mokonzi ya koyekola',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Bikamwina',
    instructionsIntro:
      'Alan ezali motambwisi ya AI mpo na ba étudiant mpe ba moto oyo bakutana na makambo ya miso, matama, to nzoto mbala moko. Andika to sema na boyebi mpe epuka kokomisa ba kombo to ba détails oyo ekoki komonisa moto. Yeba malamu na eteni ya mutu mpe lekisa ba miso/matama. Bolamu!',
    instructionsPatientPrompt: 'Loba na Alan elongo na mbongo ya moto na yo:',
    instructionsPatientDetail1: 'probleme mpe ntango ya komonana',
    instructionsPatientDetail2: 'eloko olandaka',
    instructionsPatientDetail3: 'visyon mpe pupil',
    instructionsPatientDetail4: 'mbula, genre, misala ya mombongo',
    instructionsUseArclight_default: 'Salela Arclight: liboso, reflet fundal, nsima ya miso.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Salela Arclight:</strong> <strong><em>liboso, reflet fundal, nsima ya miso.</em></strong>',
    instructionsTooLittle_eye: 'Mobali, miso ya motema, nini?',
    instructionsJustRight_eye:
      'Mobali ya mbula 25, miso ya motema mpo na mikolo 3. Ezali te na problème ya miso liboso. Mposa, mayele, point ya kornea ya pole. Pupil ebongi, visyon 6/12 mpe 6/6 na mosusu.',
    instructionsTooMuch_eye:
      "Mobali oyo ayebaki lelo na kliniki. Abimi na building na ye na motuka, miso na ye ezali motema; asali ete biloko alingaka kolya ekoki kolimbisa miso na ye. Naona mayele mpe ba bord ya motema. Ayebi kosenga lisalisi—mobali ya molayi, miso ya mayele, akangami na kornea mpe mawa. Ayebisa, 'Nini oyo?'",
    instructionsAdditionalQuery_eye: 'Alan azali mpe kopesa eyano na mituna ya koyekola miso: Nini Iritis? Ndenge nini nakoka komona retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Salela Arclight:</strong> <strong><em>gbógbo matama, canal, drum.</em></strong>',
    instructionsTooLittle_ear: 'Mobali, matama ya motema, nini?',
    instructionsJustRight_ear:
      'Mobali ya mbula 25, matama ya motema mpo na mikolo 3. Ezali te na problème ya matama liboso. Mposa, matama ya mabe. Drum ya motema, kokoka ezali te malamu na matama mabe kasi ebongi na mosusu.',
    instructionsTooMuch_ear:
      "Mobali oyo ayebaki lelo na kliniki. Abimi na building na ye na motuka, matama na ye ezali motema; asali ete biloko alingaka kolya ekoki kolimbisa matama na ye. Naona discharge mpe ba bord ya motema. Ayebi kosenga lisalisi—mobali ya molayi, matama ya mayele, akangami na kokoka mpe mawa. Ayebisa, 'Nini oyo?'",
    instructionsAdditionalQuery_ear: 'Alan azali mpe kopesa eyano na mituna ya koyekola matama: Nini Otitis Media? Ndenge nini nakoka kokima matama?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Salela Arclight:</strong> <strong><em>lumière UV, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'Mobali, nzoto ya motema, nini?',
    instructionsJustRight_skin:
      'Mobali ya mbula 25, patch ya nzoto ya motema mpo na mikolo 3. Ezali te na problème ya nzoto liboso. Nzoto ezali na mawa mpe etali.',
    instructionsTooMuch_skin:
      "Mobali oyo ayebaki lelo na kliniki. Abimi na building na ye, nzoto na ye ezali motema; asali ete biloko alingaka kolya ekoki kolimbisa nzoto na ye. Naona mayele mpe ba bord ya motema. Ayebi kosenga lisalisi—mobali ya molayi, nzoto ya motema, akangami na pigment mpe irritation. Ayebisa, 'Nini oyo?'",
    instructionsAdditionalQuery_skin:
      'Alan azali mpe kopesa eyano na mituna ya koyekola nzoto: Nini Eczema? Ndenge nini nakoka komona réseau ya pigment?',
    instructionsLabelTooLittle: 'moke mingi',
    instructionsLabelJustRight: 'malamu',
    instructionsLabelTooMuch: 'miningi mingi',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ezali motambwisi ya AI mpo na ba étudiant mpe ba moto oyo bakutana na makambo ya miso, matama to nzoto mbala moko. Andika to sema na boyebi mpe epuka kokomisa ba kombo to ba détails. Yeba malamu na kokanisa miso na matama. Bolamu!',
    goodLuck: 'Bolamu!',
    namePlaceholder: 'Kombo',
    // rolePlaceholder: 'Rôle',

    // --- NEW "Experience" Dropdown Translations (Needs review for Lingala) ---
    experiencePlaceholder: 'Boyebi',
    experienceStudentRefresher: 'Moyekoli / Mopanzi-nsango',
    experienceConfidentCore: 'Boyebi ya liboso ya kondima',
    experienceExpert: 'Mokonzi',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 mbula',
    experienceOption2: '1-3 mbula',
    experienceOption3: '3-7 mbula',
    experienceOption4: '>7 mbula',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Bokamwina',
    aimsOption1: 'Eyano ya mibale',
    aimsOption2: 'Koyeba maladi',
    aimsOption3: 'Kolobela malamu',
    */
    contactPlaceholder: 'Lumikisa (imeyili/telefonu)',
    acceptButton: 'Kobwaka',

    images: "Bililingi",
    help: "Lisungi",
    screenshot: "Screenshot",
    refer: "Kotinda",
    comingSoon: "Eyakoya mosika te...",
  },

  // 14) Hausa - ha
  ha: {
    eyesEars: 'Idanu, Kunne, Fata',
    goodHistory: 'Tarihin Da kyau',
    examineWell: 'Duba da kyau',
    useArclight: 'Amfani da Arclight',
    howCanIHelp: 'Ta yaya zan iya taimaka maka a yau?',
    alanMistakes: `Alan na iya yin kuskure. Yi amfani da ƙwarewar likitanci. ${new Date().getMonth() + 1}/25,`,
    login: 'Shiga',
    enterPassword: 'Shigar da kalmar sirri',
    register: 'Rajista',
    name: 'Suna',
    password: 'Kalmar sirri (lambobi 4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Hausa) ---
    aimsPlaceholder: 'Manufofi',
    aimsEyes: 'Idanu',
    aimsEars: 'Kunnuwa',
    aimsSkin: 'Fata',
    aimsVeterinary: 'Dabbobi',
    aimsChildMaternal: 'Yara/Mata masu juna biyu',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Ma’aikacin lafiya',
    nurse: 'Nas',
    ophthalmicOfficer: 'Jami’in kula da ido',
    medicalStudent: 'Dalibin likitanci',
    physicianAssociate: 'Mataimakin likita',
    generalPractitioner: 'Likita na gama gari',
    hospitalDoctor: 'Likita na asibiti',
    ophthalmologist: 'Likitan ido',
    optometrist: 'Masanin Hangen Nesa',
    orthoptist: 'Masanin Gyaran Idanu',
    entSpecialist: 'Kwararren kunne, hanci da makogwaro',
    pharmacist: 'Dan magani',
    audiologist: 'Kwararren ji',
    earCarePractitioner: 'Mai kula da kunne',
    dermatologist: 'Likitan fata',
    */

    instructionsButton: 'Yadda ake amfani',
    eyeButton: 'Ido',
    earButton: 'Kunne',
    skinButton: 'Fata',
    videosButton: 'Bidiyoyi',
    atomsButton: 'Atoms',
    toolsButton: 'Kayan aiki',
    arclightProjectButton: 'Shirin Arclight',
    linksButton: 'Mahada',
    aboutButton: 'Game da',

    passwordTitle: 'Shigar da kalmar sirri ta gayyatar Alan',
    passwordPlaceholder: 'Kalmar sirri',
    passwordErrorMsg: 'Kalmar sirri ba daidai ba. Gwada sake',
    passwordSubmitBtn: 'Aika',
    noCodeLine: "Babu ko ba daidai ba? Tuntuɓi mu <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>nan</a>",

    eyeMarqueeLine1: 'Menene glaucoma?',
    eyeMarqueeLine2: 'Yaya zan gani diski na ido (optic disc) da Arclight?',
    eyeMarqueeLine3: 'Namiji 25, ido ja har na kwanaki 3, tsoron haske, dan raguwar gani',
    eyeMarqueeLine4: 'Gaya mini game da Iritis',
    eyeMarqueeLine5: 'Ina bukatar turawa da gaggawa ga cutar cataract da aka haifa da ita?',
    eyeMarqueeLine6: 'Mace 65, gani a wahala, ba riga da gilashi. Gaban ido dai-dai, lens din kumma duhu',
    eyeMarqueeLine7: 'Uwa tana damuwa: jariri na da farin kwayar ido, babu gani a cikin idon',

    earMarqueeLine1: 'Menene otitis media?',
    earMarqueeLine2: 'Zan iya ganin warwar kan membrane na kunne da Arclight?',
    earMarqueeLine3: 'Matashi 16, radadin kunne na kwanaki 2, kaikayi, ji da kyau',
    earMarqueeLine4: 'Faɗa mini game da syringing (wanke kunne)',
    earMarqueeLine5: 'Ina bukatar turawa da gaggawa ga mastoiditis?',
    earMarqueeLine6: 'Namiji 73, ji ba sosai ba. Babu kallo mai kyau a magudanar kunne, gani cerumen kawai',
    earMarqueeLine7: 'Jariri ba ya amsawa ga murya. Watanni da dama kenan',

    userInfoTitle: 'Bayanin Mai Amfani',
    userName: 'Suna',
    userContact: 'Tuntuɓi',
    userRole: 'Rawa',
    userAimsPopupLabel: "Manufofi",
    // userAims: 'Manufar',
    userLatLong: 'Lat & Long',
    userArea: 'Yanki',
    userCountry: 'Kasa',
    userVersion: "Nau'insa",
    userDateTime: 'Kwanan Wata & Lokaci',
    geolocationButton: 'Gano Wuri',
    geoInfoText:
      'Danna "Gano Wuri" zai raba wurin da ya fi daidai (latitude/longitude). Wannan yana taimakawa wajen ba da cikakken jagora da zaɓuɓɓuka mafi kyau.',

    pageTitle_howToExamineEye: 'Yadda ake duba ido',
    frontOfEyeHeading: 'Gaban Ido',
    frontOfEyeText:
      "Duba kuma kwatanta idanu: <em>tsaye,</em> <em>dama,</em> <em>hagu,</em> <em>sama,</em> ƙasa<br><strong><u>Riƙe ka kusanto</u></strong>. Duba: <em>mafarkai,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>rini</em><br>Yi amfani da <span style='color: orange;'>fluro</span> don raunukan cornea ko yankewa",
    fundalReflexHeading: 'Martanin Fundal',
    fundalReflexText:
      'Daki <em>mai duhu</em>, jariri farin ciki; a tazarar hannu – kwatanta martani<br>Daidai: <em>Haske,</em> <em>Launi,</em> <em>Siffa</em><br>Kusanto don daki-daki: <em>Wata, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Bayan Ido',
    backOfEyeText:
      'Yi amfani da idan dama don ganin idan dama na majinyaci; hagu don hagu<br>Majinyaci dole ya kalli kai tsaye BA zuwa ga haske ba; kusanto ka nemo optic disc (Dilate = mafi kyau gani)<br>Yi nazarin diski: <em>Girman gefe,</em> <em>Launi,</em> <em>Kwano</em>. Bi manyan jijiyoyi, sannan ka ce majinyaci ya kalli haske kai tsaye don ganin macula',
    additionalText_eye:
      "San diskan ka: na al'ada, <span style='color:red; font-weight:bold;'>cunkoshe,</span> <span style='color:red;'>sabon jijiyoyi,</span> <span style='color:orange;'>mai kwano,</span> <span style='color:green;'>mai laushi</span><br>&gt;A yi atisaye sau da yawa&lt;",

    pageTitle_howToExamineEar: 'Yadda ake duba kunne',
    allAroundEarHeading: 'Kewaye kunne',
    allAroundEarText:
      'Duba: <em>pinna, </em><em>tragus, </em><em>mastoid</em> don gano kumburi, jin zafi ko zubar ruwa<br>Matsar da pinna a hankali, lura da duk wani radadi',
    earCanalHeading: 'Magudanar kunne',
    earCanalText:
      'Mika kai, <strong><u>riƙe Arclight kamar alƙalami</u></strong><br>Ja pinna sama/ baya (ga manya) ko ƙasa/ baya (ga yara)<br>Saka speculum (4.5mm ga manya, 2.5mm ga yara), tura fatar kunne, juya idan ya cancanta<br>Duba: <em>ƙwanƙwasa,</em> <em>datti,</em> <em>ƙwayar cuta</em>',
    tympanicMembraneHeading: 'Membran tympanik',
    tympanicMembraneText:
      'Gano handle ɗin malleus, hasken madubi, da attic<br>Lura da: <em>launi,</em> <em>matsayi,</em> <em>bayyananniyar gani</em><br>Duba ko akwai ramuka, ruwa ko tabo',
    additionalText_ear:
      "San TM ɗinku: al'ada, <span style='color:red; font-weight:bold;'>ja</span>, <span style='color:orange;'>ƙonawa</span>, <span style='color:green;'>ɗan murɗa</span>, <span style='color:purple;'>rame</span><br>&gt;Yi atisaye akai-akai&lt;",

    pageTitle_howToExamineSkin: 'Yadda ake duba fata',
    generalObservationHeading: 'Gabaɗaya lura',
    generalObservationText: 'Duba kumburi, <em>canje-canje launi</em> da rabewa<br>Lalle a duba laushi, zafin jiki ko jin zafi',
    uvLightHeading: 'Hasken UV (na Wood)',
    uvLightText:
      "A cikin dakin da babu haske, duba fitowar haske ta musamman:<br><span style='color:teal;'>tinea (shuɗi-kore)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (launin tagulla mai orange)</span>, <span style='color:#FF4040;'>erythrasma (jan korali)</span>, <span style='color:blue;'>vitiligo (shuɗi-fari)</span>, <span style='color:orange;'>acne (jan orange)</span>, <span style='color:#BFEFFF;'>ƙwai na kunama (shuɗi mai laushi)</span>",
    dermoscopyHeading: 'Dermoskopi',
    dermoscopyText:
      '<strong><u>Riƙe Arclight polariser kamar alƙalami</u></strong>, duba: <strong>ABCDE</strong> (<em>Rarrabe</em>, <em>Iyaka</em>, <em>Launi</em>, <em>Diameter &gt;6mm</em>, <em>Ci gaba</em>)<br>Kalli: PDSBV (<em>Hanyar launi</em>, <em>Dige</em>, <em>Layin zane</em>, <em>Shuɗi-fari</em>, <em>Jijiya</em>)',
    additionalText_skin:
      "San lahani: na al'ada, <span style='color:red;'>mai shakku</span>, <span style='color:orange;'>mai kumburi</span><br>&gt;Yi atisaye sau da yawa&lt;",

    pageTitle_aboutAlan: 'Game da Alan',
    aboutAlanText:
      'Alan wata na’ura ce ta AI wacce ke ba da shawarar duba idanu, kunne da fata, ta haɗa da wani asalin samfurin harshe da kuma alƙalamin ma’ana. Mai kaifin basira. Mai tsauri. A cikin zamani na zamani.<br><br>Ilimin asibiti, na gida da hotuna, an daidaita su domin nau’o’in aiki kamar ma’aikatan lafiya da likitocin gabaɗaya. Tattaunawa mai taƙaitaccen kalma tana samar da ganewar asibiti da tsari na kula. Amfani da Arclight yana nan a ko’ina.<br>',
    aboutAlanListItem1: 'Tushe na ƙwararru – yanayin zafi/tropical',
    aboutAlanListItem2: 'Masani game da Arclight',
    aboutAlanEfficient: '<strong>Ingantacce</strong> – harshe mai taƙaitawa da sauƙi',
    aboutAlanEasy: '<strong>Mai sauƙin amfani</strong> – app, murya, gani',
    aboutAlanExplainable: '<strong>Mai bayani</strong> – gaskiya/ka’idoji, hotuna',
    aboutAlanEncouraging: '<strong>Mai ƙarfafawa</strong> – jin tausayawa, malami',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Umarni',
    instructionsIntro:
      'Alan wata na’ura ce ta AI wacce ke ba da taimako ga ɗalibai da waɗanda lokaci-lokaci ke fuskantar matsalolin ido, kunne, ko fata. Rubuta ko yi magana a sarari kuma ka guji bayyana sunaye ko cikakkun bayanai masu gano mutum. Duba cikakken ɓangaren kai/fuska/jiki, ka kuma duba idanu/kunne guda biyu. Sa’a mai kyau!',
    instructionsPatientPrompt: 'Faɗa wa Alan game da marasa lafiya:',
    instructionsPatientDetail1: 'matsala da faruwa',
    instructionsPatientDetail2: 'abin da ka gani',
    instructionsPatientDetail3: 'gani da pupilin',
    instructionsPatientDetail4: 'shekara, jinsi, magani',
    instructionsUseArclight_default: 'Yi amfani da Arclight: gaba, fundal reflex, bayan idanu.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Yi amfani da Arclight:</strong> <strong><em>gaba, fundal reflex, bayan idanu.</em></strong>',
    instructionsTooLittle_eye: 'Maza, idanun ja, me ke faruwa?',
    instructionsJustRight_eye:
      'Maza 25, idanun ja na kwanaki 3. Ba a taɓa amfani da magani ko samun matsalar ido ba a baya. Ciwo, hawaye, farin alamar a kan cornea. Pupilin suna da kyau, gani 6/12 da 6/6 a ɗaya.',
    instructionsTooMuch_eye:
      "Wannan mutum ya zo asibiti a yau. Ya shigo da mota cikin gini, idanunsa ja, yanzu yana tsammanin abincin da ya ci yana shafar idanunsa. Na ga hawaye da gefuna ja. Yana buƙatar taimako—mutum mai tsawo, idanun da ruwa, damuwa game da cornea da ciwo. Yana cewa, 'Menene wannan?'",
    instructionsAdditionalQuery_eye: 'Alan yana amsa tambayoyi game da koyon ido: Menene Iritis? Ta yaya zan ga retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Yi amfani da Arclight:</strong> <strong><em>kewaye kunnen, canal, drum.</em></strong>',
    instructionsTooLittle_ear: 'Maza, kunnen ja, me ke faruwa?',
    instructionsJustRight_ear:
      'Maza 25, kunnen ja na kwanaki 3. Ba a taɓa samun magani ko matsalar kunne ba a baya. Ciwo, fitar ruwa daga kunne. Drum ja, sauraro ya yi rauni a muryar kunne mai matsala amma dai dai a ɗaya.',
    instructionsTooMuch_ear:
      "Wannan mutum ya zo asibiti a yau. Ya shigo cikin gini da kunnen ja, yanzu yana tsammanin abincin da ya ci yana shafar kunnen sa. Na ga ruwa da gefuna ja. Yana buƙatar taimako—mutum mai tsawo, kunnen ruwa, damuwa game da sauraro da ciwo. Yana cewa, 'Menene wannan?'",
    instructionsAdditionalQuery_ear: 'Alan yana amsa tambayoyi game da koyon kunne: Menene Otitis Media? Ta yaya zan tsabtace kunne?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Yi amfani da Arclight:</strong> <strong><em>Lantarki UV, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'Maza, fata ja, me ke faruwa?',
    instructionsJustRight_skin:
      'Maza 25, tabo a fata ja na kwanaki 3. Ba a taɓa amfani da magani ko samun matsalar fata ba a baya. Fata na jin ciwo da kaikayi.',
    instructionsTooMuch_skin:
      "Wannan mutum ya zo asibiti a yau. Ya shigo cikin gini da fata ja, yanzu yana tsammanin abincin da ya ci yana shafar fatarsa. Na ga ruwa da gefuna ja. Yana buƙatar taimako—mutum mai tsawo, fata ja, damuwa game da launi da kumburi. Yana cewa, 'Menene wannan?'",
    instructionsAdditionalQuery_skin: 'Alan yana amsa tambayoyi game da koyon fata: Menene Eczema? Ta yaya zan ga tsarin pigment?',
    instructionsLabelTooLittle: 'Kaɗan sosai',
    instructionsLabelJustRight: 'Daidai',
    instructionsLabelTooMuch: 'Yawa sosai',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan wata na’ura ce ta AI wacce ke ba da taimako ga ɗalibai da waɗanda lokaci-lokaci ke fuskantar matsalolin ido, kunne, ko fata. Rubuta ko yi magana a sarari kuma ka guji bayyana sunaye ko cikakkun bayanai masu gano mutum.',
    goodLuck: 'Inganta!',
    namePlaceholder: 'Sunaye',
    // rolePlaceholder: 'Matsayi',

    // --- NEW "Experience" Dropdown Translations (Needs review for Hausa) ---
    experiencePlaceholder: 'Kwarewa',
    experienceStudentRefresher: 'Dalibi / Maimaitawa',
    experienceConfidentCore: 'Kwararren Ilimi na Asali',
    experienceExpert: 'Kwararre',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 shekara',
    experienceOption2: '1-3 shekaru',
    experienceOption3: '3-7 shekaru',
    experienceOption4: '>7 shekaru',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Manufa',
    aimsOption1: "Sakon ra'ayi na biyu",
    aimsOption2: 'Binciken hali',
    aimsOption3: 'Sadarwa mafi kyau',
    */
    contactPlaceholder: 'Tuntuɓi (email/phone)',
    acceptButton: 'Amince',

    images: "Hotuna",
    help: "Taimako",
    screenshot: "Daukar hoton allo",
    refer: "Mika",
    comingSoon: "Zuwa nan ba da jimawa ba...",
  },

  // 15) Yoruba - yo
  yo: {
    eyesEars: 'Ojú, Etí, Awọ',
    goodHistory: 'Ìtàn Dára',
    examineWell: 'Ègbógun Rẹ Dáadáa',
    useArclight: 'Lò Arclight',
    howCanIHelp: 'Báwo ni mo lè ràn ẹ lọ́wọ́ lónìí?',
    alanMistakes: `Alan lè se aṣiṣe. Lọ́ sí kàyéfì ṣègùn rẹ. ${new Date().getMonth() + 1}/25,`,
    login: 'Wọlé',
    enterPassword: 'Tẹ Ọ̀rọ̀ Àgbàrá',
    register: 'Forúkọsílẹ',
    name: 'Orúkọ',
    password: 'Ọ̀rọ̀ Àgbàrá (dígítì 4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Yoruba) ---
    aimsPlaceholder: 'Èrò',
    aimsEyes: 'Ojú',
    aimsEars: 'Etí',
    aimsSkin: 'Awọ',
    aimsVeterinary: 'Ẹranko',
    aimsChildMaternal: 'Ọmọ/Ìyá',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Oṣiṣẹ ìlera',
    nurse: 'Nọ̀ọ́sù',
    ophthalmicOfficer: 'Oṣiṣẹ Klinikali Ojú',
    medicalStudent: 'Akẹ́kọ̀ọ́ ìṣègùn',
    physicianAssociate: 'Olùrànlọ́wọ́ Dókítà',
    generalPractitioner: 'Dókítà Gbogbogbò',
    hospitalDoctor: 'Dókítà Ilé-ìwòsàn',
    ophthalmologist: 'Dókítà Ojú',
    optometrist: 'Onímọ̀ Ilà Ojú',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Onímọ̀ Eètí, Imú, Ọ̀nà-Ìmí',
    pharmacist: 'Onímọ̀ Olùtajà Ìgbògbò',
    audiologist: 'Onímọ̀ ìgbọ́ràn',
    earCarePractitioner: 'Onímọ̀ ìtọju eètí',
    dermatologist: 'Dókítà Awọ',
    */

    instructionsButton: 'Bí o ṣè lò',
    eyeButton: 'Ojú',
    earButton: 'Etí',
    skinButton: 'Awọ',
    videosButton: 'Fídíò',
    atomsButton: 'Atoms',
    toolsButton: 'Irìnṣẹ́',
    arclightProjectButton: 'Ẹ̀bùn Arclight',
    linksButton: 'Ìjápọ̀',
    aboutButton: 'Nítorí',

    passwordTitle: 'Tẹ ọ̀rọ̀ àgbàrá (password) ipè Alan rẹ',
    passwordPlaceholder: 'Ọ̀rọ̀ Àgbàrá',
    passwordErrorMsg: 'Ọ̀rọ̀ àgbàrá rẹ kò tọ́. Jọwọ tún gbìyànjú',
    passwordSubmitBtn: 'Fẹ̀yìn',
    noCodeLine: "Kò sí kóòdù tàbí kòòdù ti kò tọ́nà? Pe wá <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>níbìí</a>",

    eyeMarqueeLine1: 'Kí ni glaucoma?',
    eyeMarqueeLine2: 'Báwo ni mo se lè rí disiki ojú (optic disc) pẹ̀lú Arclight?',
    eyeMarqueeLine3: 'Ọkùnrin ọ̀dún 25, ojú pupa fún ọjọ́ mẹ́ta, ibẹ̀rù ìmólẹ̀, dídín nínú ìran kára díẹ̀',
    eyeMarqueeLine4: 'Sọ fún mi nípa iritis',
    eyeMarqueeLine5: 'Ṣé mo gbọ́dọ̀ ránfihàn kátarákìtì tó wá láti ìbí lówọ́ lásápá?',
    eyeMarqueeLine6: 'Obìnrin 65, ojú ò lẹ́, kò lóptiki. Apá iwájú dáa, lens ti dàbí fùyúfùyú',
    eyeMarqueeLine7: 'Ìyá kan yááwórí: ọmọdé ní púpọ̀ ojú funfun, kò rí nǹkan nínú ojú yẹn',

    earMarqueeLine1: 'Kí ni otitis media?',
    earMarqueeLine2: 'Ṣé mo lè rí àyà ọ̀rún (membrane tympanic) pẹ̀lú Arclight?',
    earMarqueeLine3: 'Ọkùnrin ọmọ 16, irora ni òfòfò etí fún ọjọ́ méjì, inú rírà, gbọ́ran dáa',
    earMarqueeLine4: 'Sọ fún mi nípa syringing (fífọ etí)',
    earMarqueeLine5: 'Ṣé mo gbọ́dọ̀ ránfihàn mastoiditis lásápá?',
    earMarqueeLine6: 'Ọkùnrin 73, gbọ́ran ò dán mọ́rán. Kò le rí ọ̀nà etí dáadáa, mo rí amún etí nìkan',
    earMarqueeLine7: 'Ọmọdé kò dahun sí ohùn. Ó ti péjù láti oṣù kan sí mìíràn',

    userInfoTitle: 'Alaye Olumulo',
    userName: 'Orukọ',
    userContact: 'Kan si',
    userRole: 'Iṣẹ',
    userAimsPopupLabel: "Èrò",
    // userAims: 'Ero',
    userLatLong: 'Lat & Long',
    userArea: 'Agbegbe',
    userCountry: 'Orilẹ-ede',
    userVersion: 'Iṣẹ́',
    userDateTime: 'Ọjọ & Àkókò',
    geolocationButton: 'Ìpò',
    geoInfoText: 'Títẹ "Ìpò" yóò ṣàfihàn ipo tó péye (latitude/longitude). Èyí yóò ràn é lọwọ láti fúnni ní ìtọ́nisọ́na àti àṣàyàn tó dáa.',

    pageTitle_howToExamineEye: 'Bá a ṣe ń ṣàyẹ̀wò ojú',
    frontOfEyeHeading: 'Ìpínlẹ̀ ojú tó wà níwájú',
    frontOfEyeText:
      "Ṣàyẹ̀wò kí o sì fi ojú ṣe àfihàn: <em>tító,</em> <em>ọtún,</em> <em>òsì,</em> <em>sórí,</em> ṣìdò<br><strong><u>Mú un sun mọ́ra</u></strong>. Ṣàyẹ̀wò: <em>àmúlùú,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupíl</em><br>Lo <span style='color: orange;'>fluro</span> fún àfiyèsí àwọ̀n àbùkù tàbí ìfọ́lẹ̀ ojú",
    fundalReflexHeading: 'Ìfèsì Fundal',
    fundalReflexText:
      'Yara <em>tó rọ́rùn</em>, ọmọ dùn; ní ìjìnlẹ̀ àfà – fi ìfèsì ṣe àfihàn<br>Ìdánilójú: <em>Ìmọ́lẹ̀,</em> <em>Àwọ̀,</em> <em>Ìrú</em><br>Sun mọ́ra fún àlàyé: <em>Àtẹ̀, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Ẹ̀hìn ojú',
    backOfEyeText:
      'Lo ojú ọ̀tún láti wo ojú oníbàárà tí ó wà ní ọ̀tún; òsì fún òsì<br>Oníbàárà gbọ́dọ̀ wo taara KÌ í wo ìmọ́lẹ̀; sun mọ́ra kí o sì wa optic disc (Dilate = ìran tó dáa jùlọ)<br>Kọ́ ẹ̀kọ́ nípa disc: <em>Ìlà,</em> <em>Àwọ̀,</em> <em>Ìkòkò</em>. Tẹ̀lé àwọn àtọ́runwá ńlá, lẹ́yìn náà bẹ̀rẹ̀ fún oníbàárà láti wo taara sí ìmọ́lẹ̀ láti rí macula',
    additionalText_eye:
      "Mọ̀ diski rẹ: àtọ̀runwá, <span style='color:red; font-weight:bold;'>tútù,</span> <span style='color:red;'>àtọ̀runwá tuntun,</span> <span style='color:orange;'>ìfìmọ̀,</span> <span style='color:green;'>púpọ̀</span><br>&gt;Ṣe ìdárayá nígbà gbogbo&lt;",

    pageTitle_howToExamineEar: 'Bá a ṣe ń ṣàyẹ̀wò etí',
    allAroundEarHeading: 'Yíká etí',
    allAroundEarText:
      'Ṣàyẹ̀wò: <em>pinna, </em><em>tragus, </em><em>mastoid</em> fún ìfọ̀ràn, ìmọ̀tara-ẹni tàbí ìdápọ̀ omi<br>Gbìmọ̀ pinna pẹ̀lú ìtẹ́lọ́run, fèsì sí ìrora',
    earCanalHeading: 'Ọnà etí',
    earCanalText:
      'Yí orí ká, <strong><u>di Arclight bí ìkànnì</u></strong><br>Fa etí sórí/tẹ́lẹ̀ (àwọn àgbà) tàbí sísalẹ̀/tẹ́lẹ̀ (àwọn ọmọ)<br>Fọwọ́ sí i speculum (4.5mm fún àgbà, 2.5mm fún ọmọ), yí padà tí ó bá wù ú<br>Ṣàyẹ̀wò fún: <em>ìfun,</em> <em>àdánidá,</em> <em>àrùn</em>',
    tympanicMembraneHeading: 'Membrane tímpaniki',
    tympanicMembraneText:
      'Ṣàyẹ̀wò handle malleus, ìtan imọ́lẹ̀, àti attic<br>Fèsì: <em>àwọ̀,</em> <em>ipo,</em> <em>àfihàn</em><br>Ṣàyẹ̀wò fún ìfòkànsìn, omi tàbí àdánidá',
    additionalText_ear:
      "Mọ̀ TM rẹ: bí wọ́n ṣe ń rí, <span style='color:red; font-weight:bold;'>pupa</span>, <span style='color:orange;'>tító</span>, <span style='color:green;'>dín</span>, <span style='color:purple;'>àfọ̀jú</span><br>&gt;Ṣe ìdárayá nígbà gbogbo&lt;",

    pageTitle_howToExamineSkin: 'Bá a ṣe ń ṣàyẹ̀wò àwọ̀ ara',
    generalObservationHeading: 'Ìfihàn Gbogbogbo',
    generalObservationText: 'Ṣàyẹ̀wò àrà, <em>àtúnṣe àwọ̀</em> àti pínpín<br>Fọwọ́pọ̀n fún àfihàn, ìgbona tàbí ìrora',
    uvLightHeading: 'Imọlẹ UV (Wood’s)',
    uvLightText:
      "Ní yara tí kò ní ìmọ́lẹ̀, ṣàyẹ̀wò fun imúlòlùfẹ́ fíìkúsé:<br><span style='color:teal;'>tinea (búlúu-tító)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (osàn-òràngùn)</span>, <span style='color:#FF4040;'>erythrasma (pupa-korali)</span>, <span style='color:blue;'>vitiligo (búlúu-fúnfun)</span>, <span style='color:orange;'>acne (òràngùn-pupa)</span>, <span style='color:#BFEFFF;'>head lice nits (pale-blue)</span>",
    dermoscopyHeading: 'Dermoscopy',
    dermoscopyText:
      '<strong><u>(YORUBA: Hold Arclight polariser like a pen)</u></strong>, ṣàyẹ̀wò: <strong>ABCDE</strong> (<em>Àìdápọ̀</em>, <em>Ìpẹ̀yà</em>, <em>Àwọ̀</em>, <em>Ìwọn &gt;6mm</em>, <em>Ìyípadà</em>)<br>Kọ́ ẹ̀kọ́: PDSBV (<em>Àtẹ̀ pigment</em>, <em>Àwọn àfihàn</em>, <em>Laini</em>, <em>Blúù-fúnfun</em>, <em>Àwọn ẹ̀jẹ̀</em>)',
    additionalText_skin:
      "Mọ̀ lesion rẹ: àtọ̀runwá, <span style='color:red;'>ìbànújẹ</span>, <span style='color:orange;'>oníìfọ̀</span><br>&gt;Ṣe ìdárayá nígbà gbogbo&lt;",

    pageTitle_aboutAlan: 'Nipa Alan',
    aboutAlanText:
      'Alan jẹ́ olùrànlọ́wọ́ ìtàn-àwòrán AI fún ìtàn ojú, etí àti àwọ̀, tó ní àpẹẹrẹ èdè àkọ́kọ́ àti ọgbọ́n àmi. Ọgbọ́n. Tó ṣe pàtàkì. Ọ̀nà tuntun. <br><br>Ìmọ̀ ìṣègùn, ìmọ̀ agbègbè àti àwòrán ni a ṣe ìtòlẹ́sẹẹsẹ fún ipa bíi àwọn oṣiṣẹ́ ìlera àti àwọn dókítà àgbà. Ìjíròrò kúkúrú ń ṣe àfihàn àìlera àti ètò ìtọ́jú. Lílo Arclight wa ní gbogbo agbègbè.<br>',
    aboutAlanListItem1: 'Ìpìlẹ̀ amòye – afefe gbóná/tropical',
    aboutAlanListItem2: 'Mọ̀ nípa Arclight',
    aboutAlanEfficient: '<strong>To n ṣiṣẹ́</strong> – èdè kúkúrú, ṣíṣe gbọ́dọ̀',
    aboutAlanEasy: '<strong>Rọrùn láti lò</strong> – app, ohùn, àwòrán',
    aboutAlanExplainable: '<strong>To ṣe kedere</strong> – òtítọ́/àṣẹ, àwòrán',
    aboutAlanEncouraging: '<strong>To ń gbàgbọ́</strong> – ìfaramọ́, olùkọ́',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Ìtọ́nisọ́nà',
    instructionsIntro:
      'Alan jẹ́ olùrànlọ́wọ́ AI fún àwọn akẹ́kọ̀ọ́ àti àwọn tí kò ní rí ìṣòro ojú, etí tàbí àwọ̀ ní gbogbo igba. Kọ tàbí sọ ní kedere, má ṣe fìdí orúkọ tàbí àlàyé tí yóò jẹ́ kí a mọ ẹni náà múlẹ̀. Wo pátápátá lórí orí/ojú/àwọn apá ara, kí o sì ṣàyẹ̀wò àwọn ojú tàbí etí méjèèjì. Oríire!',
    instructionsPatientPrompt: 'Ṣàlàyé fún Alan nípa aláìlera rẹ:',
    instructionsPatientDetail1: 'ìṣòro àti ìbẹrẹ',
    instructionsPatientDetail2: 'ohun tí o rí',
    instructionsPatientDetail3: 'àwòrán àti pupil',
    instructionsPatientDetail4: 'ọmọ ọdún, ìbálòpọ̀, oogun',
    instructionsUseArclight_default: 'Lo Arclight: ojú iwájú, reflex fundal, ẹ̀yìn ojú.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Lo Arclight:</strong> <strong><em>ojú iwájú, reflex fundal, ẹ̀yìn ojú.</em></strong>',
    instructionsTooLittle_eye: 'ọkùnrin, ojú pupa, kí ni?',
    instructionsJustRight_eye:
      'Ọkùnrin 25 ọdún, ojú pupa fún ọjọ́ mẹ́ta. Kò sí oogun tàbí iṣòro ojú ṣáájú. Ìrora, omi ojú, àmì funfun lórí kornea. Pupil dáadáa, àwòrán 6/12 àti 6/6 ní ojú kejì.',
    instructionsTooMuch_eye:
      "Ọkùnrin yìí dé ilé ìwòsàn lónìí. Ó wọ ilé pẹ̀lú ọkọ ayọ́kẹ́lẹ́, ojú rẹ̀ sì pupa, ó sì rántí pé oúnjẹ tí ó jẹ̀ ń nípa lórí ojú rẹ̀. Mo rí omi àti etí pupa. Ó fẹ́ ìrànlọ́wọ́—ọkùnrin gígùn, ojú tó ń rọ̀, ní ìbànújẹ nípa kornea àti ìrora. Ó béèrè pé, 'Kí ni èyí?'",
    instructionsAdditionalQuery_eye: 'Alan tún dáhùn ìbéèrè nípa ẹ̀kọ́ ojú: Kí ni Iritis? Báwo ni mà á ṣe rí retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Lo Arclight:</strong> <strong><em>gbógbo etí, canal, drum.</em></strong>',
    instructionsTooLittle_ear: 'ọkùnrin, etí pupa, kí ni?',
    instructionsJustRight_ear:
      'Ọkùnrin 25 ọdún, etí pupa fún ọjọ́ mẹ́ta. Kò sí oogun tàbí iṣòro etí ṣáájú. Ìrora, ìtú omi etí. Drum pupa, ìgbọ́ran kò dáadáa ní etí tó ní ìṣòro ṣùgbọ́n dáadáa ní etí kejì.',
    instructionsTooMuch_ear:
      "Ọkùnrin yìí dé ilé ìwòsàn lónìí. Ó wọ ilé pẹ̀lú etí pupa, ó sì rántí pé oúnjẹ tí ó jẹ̀ ń nípa lórí etí rẹ̀. Mo rí etí tí ń rọ̀ àti etí pupa. Ó fẹ́ ìrànlọ́wọ́—ọkùnrin gígùn, etí tó ń rọ̀, ní ìbànújẹ nípa ìgbọ́ran àti ìrora. Ó béèrè pé, 'Kí ni èyí?'",
    instructionsAdditionalQuery_ear: 'Alan tún dáhùn ìbéèrè nípa ẹ̀kọ́ etí: Kí ni Otitis Media? Báwo ni mà á ṣe mọ́ etí?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Lo Arclight:</strong> <strong><em>Lumière UV, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'ọkùnrin, àwọ̀ pupa, kí ni?',
    instructionsJustRight_skin: 'Ọkùnrin 25 ọdún, àwọ̀ pupa lórí apá fún ọjọ́ mẹ́ta. Kò sí oogun tàbí iṣòro àwọ̀ ṣáájú. Àwọ̀ ní ìrora àti ìfarapa.',
    instructionsTooMuch_skin:
      "Ọkùnrin yìí dé ilé ìwòsàn lónìí. Ó wọ ilé pẹ̀lú àwọ̀ pupa, ó sì rántí pé oúnjẹ tí ó jẹ̀ ń nípa lórí àwọ̀ rẹ̀. Mo rí omi àti etí pupa. Ó fẹ́ ìrànlọ́wọ́—ọkùnrin gígùn, àwọ̀ pupa, ní ìbànújẹ nípa pigment àti ìfarapa. Ó béèrè pé, 'Kí ni èyí?'",
    instructionsAdditionalQuery_skin: 'Alan tún dáhùn ìbéèrè nípa ẹ̀kọ́ àwọ̀: Kí ni Eczema? Báwo ni mà á ṣe rí réseau pigment ?',
    instructionsLabelTooLittle: 'Kéré jù',
    instructionsLabelJustRight: 'Dáadáa',
    instructionsLabelTooMuch: 'Púpò jù',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan jẹ́ olùrànlọ́wọ́ AI fún àwọn akẹ́kọ̀ọ́ àti àwọn tí kò ní rí ìṣòro ojú, etí tàbí àwọ̀ ní gbogbo igba. Kọ tàbí sọ ní kedere, kí o sì yago fún fífi orúkọ tàbí àlàyé tó lè jẹ́ kí a mọ ẹni náà.',
    goodLuck: 'Oríire!',
    namePlaceholder: 'Orúkọ',
    // rolePlaceholder: 'Ipò',

    // --- NEW "Experience" Dropdown Translations (Needs review for Yoruba) ---
    experiencePlaceholder: 'Ìrírí',
    experienceStudentRefresher: 'Akẹ́kọ̀ọ́ / Atúnṣe',
    experienceConfidentCore: 'Ìmọ̀ Pàtàkì Tí ó Dájú',
    experienceExpert: 'Amòye',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 ọdún',
    experienceOption2: '1-3 ọdún',
    experienceOption3: '3-7 ọdún',
    experienceOption4: '>7 ọdún',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Àfọ̀kànwá',
    aimsOption1: 'Ìmọ̀ràn kejì',
    aimsOption2: 'Àwárí ìṣòro',
    aimsOption3: 'Ìbánisọ̀rọ̀ tó dáa',
    */
    contactPlaceholder: 'Ìbánisọ̀rọ̀ (imeèlì/foònù)',
    acceptButton: 'Gba',

    images: "Aworan",
    help: "Iranlowo",
    screenshot: "Sikirinshọt",
    refer: "Tunlo",
    comingSoon: "Nbo laipẹ...",
  },

  // 16) Igbo - ig
  ig: {
    eyesEars: 'Anya, Ntị, Akpụkpọ',
    goodHistory: 'Akụkọ ọma',
    examineWell: 'Leda anya nke ọma',
    useArclight: 'Jiri Arclight',
    howCanIHelp: 'Kedu ka m ga-esi nyere gị aka taa?',
    alanMistakes: `Alan nwere ike mehiere. Jiri amamihe dọkịta. ${new Date().getMonth() + 1}/25,`,
    login: 'Banye',
    enterPassword: 'Tinye okwu nzuzo',
    register: 'Debanye',
    name: 'Aha',
    password: 'Okwu nzuzo (ọnụọgụ 4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Igbo) ---
    aimsPlaceholder: 'Ebumnobi',
    aimsEyes: 'Anya',
    aimsEars: 'Ntị',
    aimsSkin: 'Akpụkpọ',
    aimsVeterinary: 'Anụmanụ',
    aimsChildMaternal: 'Nwa/Nne',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Orụ ọrụ ahụike',
    nurse: 'Nọọsụ',
    ophthalmicOfficer: 'Ọrụ elekọta anya',
    medicalStudent: 'Akwụkwọ ọgụgụ dọkịta',
    physicianAssociate: 'Onyinye aka dọkịta',
    generalPractitioner: "Dọkịta n'ozizi niile",
    hospitalDoctor: 'Dọkịta ụlọ ọgwụ',
    ophthalmologist: 'Dọkịta anya',
    optometrist: 'Optometrist',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Mgbasa Oke Ntị, imi na akpịrị',
    pharmacist: 'Dọkịta ọgwụ',
    audiologist: 'Onye na-elebara ntị anya',
    earCarePractitioner: 'Onye nlekọta ntị',
    dermatologist: 'Dọkịta akpụkpọ',
    */

    instructionsButton: 'Otu esi eji ya',
    eyeButton: 'Anya',
    earButton: 'Ntị',
    skinButton: 'Akpụkpọ',
    videosButton: 'Vidiyo',
    atomsButton: 'Atoms',
    toolsButton: 'Ngwá ọrụ',
    arclightProjectButton: 'Projek Arclight',
    linksButton: 'Njikọ',
    aboutButton: 'Banyere',

    passwordTitle: 'Tinye okwuntinye Alan rẹ',
    passwordPlaceholder: 'Okwuntinye (Password)',
    passwordErrorMsg: 'Okwuntinye adịghị irè. Biko nwalee ozo',
    passwordSubmitBtn: 'Nyefee',
    noCodeLine:
      "Enweghị ma ọ́bù kodu ezighi ezi? Kpọtụrụ anyị <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>ebe a</a>",

    eyeMarqueeLine1: 'Kedu ihe glaucoma na-ekwu?',
    eyeMarqueeLine2: 'Olee otú m ga-esi hụ diski anya (optic disc) site na Arclight?',
    eyeMarqueeLine3: "Nwoke dị afọ 25, anya uhie ruo ụbọchị 3, ịsụfu ìhè, ntakịrị belata n'anya",
    eyeMarqueeLine4: 'Gwa m gbasara iritis',
    eyeMarqueeLine5: 'M ga-eziga cataract amuru ya site na ime ime ozugbo?',
    eyeMarqueeLine6: "Nwanyi dị afọ 65, anya dọwara, enweghị iko. Oke anya n'ihu dị mma, lens na-egbuke egbuke",
    eyeMarqueeLine7: 'Nne na-echegbu onwe ya: nwa nwere pupil ọcha, anaghị ahụ anya na anya ahụ',

    earMarqueeLine1: 'Kedu ihe otitis media?',
    earMarqueeLine2: 'Enwere m ike ịhụ membrane eze ntị site na Arclight m?',
    earMarqueeLine3: "Okorobịa dị afọ 16, nkwara n'ututu ntị ụbọchị 2, itch, inụ nti ọma",
    earMarqueeLine4: 'Gwa m gbasara syringing (icha ntị)',
    earMarqueeLine5: 'M ga-eziga mastoiditis ozugbo?',
    earMarqueeLine6: 'Nwoke dị afọ 73, inụ nti ya adịghị mma. A naghị ahụ ogbugbu ntị nke ọma. A na-ahụ wax ntị nikan',
    earMarqueeLine7: 'Nwa ntị na-anaghị aza ụda. Owere ọnwa ole na ole',

    userInfoTitle: 'Ozi Onye Ọrụ',
    userName: 'Aha',
    userContact: 'Kekọrịta',
    userRole: 'Ọrụ',
    userAimsPopupLabel: "Ebumnobi",
    // userAims: 'Ebumnobi',
    userLatLong: 'Lat & Long',
    userArea: 'Ebe',
    userCountry: 'Mba',
    userVersion: 'Nsụgharị',
    userDateTime: 'Ụbọchị & Oge',
    geolocationButton: 'Ọnọdụ',
    geoInfoText: 'Ịpị "Ọnọdụ" ga-ekekọrịta ebe dị nkenke (latitude/longitude). Nke a ga-enyere aka inye nduzi na nhọrọ ka mma.',

    pageTitle_howToExamineEye: 'Otu esi ele anya',
    frontOfEyeHeading: "Ụdị Anya N'iru",
    frontOfEyeText:
      "Le anya ma tụnyere: <em>ziri ezi,</em> <em>aka nri,</em> <em>aka ekpe,</em> <em>elu,</em> ala<br><strong><u>Nọ nso ma debe</u></strong>. Lelee: <em>mkpu,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Jiri <span style='color: orange;'>fluro</span> maka ulcers nke cornea ma ọ bụ ntakịrị mmerụ",
    fundalReflexHeading: 'Mgbaàmà Fundal',
    fundalReflexText:
      'Ụlọ dị <em>ndụpụ</em>, nwaanyị ọṅụ; n’ọkara ogologo aka – tụnyere mgbaàmà<br>Dị otu: <em>Ịdị ọkụ,</em> <em>Agba,</em> <em>Ụdị</em><br>Ruo mgbe ịchọpụtara nkọwa: <em>Nkata, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Akụkụ azụ nke anya',
    backOfEyeText:
      'Jiri anya nri lee anya nri nke onye ọrịa; nke ekpe maka nke ekpe<br>Onye ọrịa ga-ele anya ozugbo, ọ bụghị n’ụzọ ọkụ; nso chọọ optic disc (Dilate = mma ịhụ)<br>Gụọ disc: <em>Mpaghara,</em> <em>Agba,</em> <em>Ikpuru</em>. Soro akwara ukwu, wee gwa onye ọrịa ka o lee ọkụ ozugbo iji hụ macula',
    additionalText_eye:
      "Mara disc gị: nkịtị, <span style='color:red; font-weight:bold;'>gbawara,</span> <span style='color:red;'>akụkụ ọhụrụ,</span> <span style='color:orange;'>akpọrọ,</span> <span style='color:green;'>ọrọ</span><br>&gt;Mee mgbalị ugboro ugboro&lt;",

    pageTitle_howToExamineEar: 'Otu esi ele ntị',
    allAroundEarHeading: 'Mpaghara gbara ntị',
    allAroundEarText:
      'Lelee: <em>pinna, </em><em>tragus, </em><em>mastoid</em> maka bọl, ntakịrị mgbu ma ọ bụ mmịpụ<br>Gbaa pinna nwayọ, hụ ma e nwere mgbu',
    earCanalHeading: 'Ụzọ ntị',
    earCanalText:
      'Tụgharịa isi, <strong><u>jide Arclight dị ka mkpịsị akwụkwọ</u></strong><br>Tụọ pinna elu/azụ (ndị okenye) ma ọ bụ ala/azụ (nwatakịrị)<br>Tinye speculum (4.5mm maka ndị okenye, 2.5mm maka ụmụaka), kwụsaa ntutu, tụgharịa ma ọ bụrụ na ọ dị mkpa<br>Lelee: <em>ntụpọ,</em> <em>mkpofu,</em> <em>mgbasa ọrịa</em>',
    tympanicMembraneHeading: 'Ọkwa tympanic',
    tympanicMembraneText:
      'Chọpụta njide malleus, ìhè na-acha, na attic<br>Cheta: <em>agba,</em> <em>ọnọdụ,</em> <em>ịdị ọcha</em><br>Lelee ma e nwere oghere, mmiri ma ọ bụ akara mmerụ',
    additionalText_ear:
      "Mara TM gị: nke nkịtị, <span style='color:red; font-weight:bold;'>uhie</span>, <span style='color:orange;'>gbasara</span>, <span style='color:green;'>ezughị oke</span>, <span style='color:purple;'>erughị ala</span><br>&gt;Mee mgbalị mgbe niile&lt;",

    pageTitle_howToExamineSkin: 'Otu esi ele akpụkpọ anụ',
    generalObservationHeading: 'Nlele zuru oke',
    generalObservationText: 'Lelee mkpụrụ, <em>ngbanwe agba</em> na nkesa<br>Tinye aka nwayọọ iji mata ọdịdị, okpomọkụ ma ọ bụ ntakịrị mgbu',
    uvLightHeading: 'UV (Wood’s) ìhè',
    uvLightText:
      "Na ime ụlọ jụụ, lelee ìhè pụrụ iche:<br><span style='color:teal;'>tinea (acha anụnụ anụnụ-acha akwụkwọ ndụ)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (acha ọlaọcha-acha oroma)</span>, <span style='color:#FF4040;'>erythrasma (acha uhie coral)</span>, <span style='color:blue;'>vitiligo (acha anụnụ anụnụ-acha ọcha)</span>, <span style='color:orange;'>acne (acha oroma-acha uhie)</span>, <span style='color:#BFEFFF;'>head lice nits (acha ọcha-acha anụnụ anụnụ)</span>",
    dermoscopyHeading: 'Dermoscopy',
    dermoscopyText:
      '<strong><u>Jide Arclight polariser dị ka mkpịsị akwụkwọ</u></strong>, lelee: <strong>ABCDE</strong> (<em>Adịghị nha</em>, <em>Mpaghara</em>, <em>Agba</em>, <em>Obosara &gt;6mm</em>, <em>Ntozu</em>)<br>Gụọ: PDSBV (<em>Netwọkụ pigment</em>, <em>Mpịakọta</em>, <em>Ahịrị</em>, <em>acha anụnụ anụnụ-acha ọcha</em>, <em>Akwa</em>)',
    additionalText_skin:
      "Mara lesion gị: nke nkịtị, <span style='color:red;'>na-atụ ụjọ</span>, <span style='color:orange;'>na-afụ ọkụ</span><br>&gt;Mee mgbalị mgbe niile&lt;",

    pageTitle_aboutAlan: 'Banyere Alan',
    aboutAlanText:
      "Alan bụ onye enyemaka nyocha AI maka anya, ntị na akpụkpọ anụ, nke nwere: ihe nlereanya asụsụ isi na usoro akara. Amamihe. Nnọọ dịrị gị. Nke a bụ nke kachasị elu.<br><br>Ụmụ ihe ọmụmụ ọgwụ, ihe ọmụma mpaghara na onyonyo, etinyere ha iji kwado ọrụ dị iche iche dịka ndị na-arụ ọrụ ahụike na dọkịta izugbe. Mkparịta ụka dị mkpụmkpụ na-emepụta nyocha na atụmatụ njikwa. Ojiji Arclight dị n'ime ya n'ụdị niile.<br>",
    aboutAlanListItem1: 'Ọdụm nke ọkachamara – ihu igwe tropikal/ọkụ',
    aboutAlanListItem2: 'Mara Arclight',
    aboutAlanEfficient: '<strong>Ọrụ ọma</strong> – asụsụ dị mkpụmkpụ na doro anya',
    aboutAlanEasy: '<strong>Dị mfe iji</strong> – ngwa, olu, ịhụ',
    aboutAlanExplainable: '<strong>Nkọwa zuru ezu</strong> – eziokwu/usoro, onyonyo',
    aboutAlanEncouraging: '<strong>Nkwado</strong> – ekele, onye nkuzi',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Ntuziaka',
    instructionsIntro:
      'Alan bụ onye enyemaka AI maka ụmụ akwụkwọ na ndị na-ahụkarị ihe gbasara anya, ntị, ma ọ bụ akpụkpọ anụ. Dee ma ọ bụ kwuo nke ọma, ma zere ịkọpụta aha ma ọ bụ nkọwa ndị na-egosi onye ahụ. Lezienụ anya nke ọma n’isi/ihu/akụkụ ahụ, wee nyochaa anya ma ọ bụ ntị abụọ. Nwee ezigbo ọganihu!',
    instructionsPatientPrompt: 'Kọọrọ Alan gbasara ọrịa onye gị:',
    instructionsPatientDetail1: 'nsogbu na mmalite',
    instructionsPatientDetail2: 'ihe ị na-ahụ',
    instructionsPatientDetail3: 'ihụ anya na pupil',
    instructionsPatientDetail4: 'afọ, okike, ọgwụ',
    instructionsUseArclight_default: 'Jiri Arclight: ihu, fundal reflex, azụ nke anya.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Jiri Arclight:</strong> <strong><em>ihu, fundal reflex, azụ nke anya.</em></strong>',
    instructionsTooLittle_eye: 'ọkànwà, anya ọbara, gịnị?',
    instructionsJustRight_eye:
      'Ọkànwà afọ 25, anya ọbara ruo ụbọchị 3. Enweghị ọgwụ ma ọ bụ nsogbu anya gara aga. Ọrịa, mmiri n’anya, otu akara ọcha na kornea. Pupil dị mma, ịhụ anya 6/12 na 6/6 n’aka nke ọzọ.',
    instructionsTooMuch_eye:
      "Ọkànwà a bịara ụlọ ọgwụ taa. Ọ na-anya ụgbọ ala bịa n’ime ụlọ, anya ya bụ ọbara, ugbu a ọ chere na nri ọ riri na-emetụta anya ya. Ahụrụ m mmiri na nkịta ọbara. Ọ chọrọ enyemaka—ọkànwà dị elu, anya mmiri, echegbu onwe ya gbasara kornea na ọrịa. Ọ jụrụ, 'Gịnị bụ nke a?'",
    instructionsAdditionalQuery_eye: 'Alan na-aza ajụjụ gbasara mmụta anya: Gịnị bụ Iritis? Kedu ka m ga-esi hụ retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Jiri Arclight:</strong> <strong><em>gburugburu ntị, canal, tympan.</em></strong>',
    instructionsTooLittle_ear: 'ọkànwà, ntị ọbara, gịnị?',
    instructionsJustRight_ear:
      'Ọkànwà afọ 25, ntị ọbara ruo ụbọchị 3. Enweghị ọgwụ ma ọ bụ nsogbu ntị gara aga. Ọrịa, ntị na-apụta mmiri. Tympan ọbara, ntị dara ada na otu ma dị mma na nke ọzọ.',
    instructionsTooMuch_ear:
      "Ọkànwà a bịara ụlọ ọgwụ taa. Ọ batara n’ime ụlọ na ntị ọbara, ugbu a ọ chere na nri ọ riri na-emetụta ntị ya. Ahụrụ m oghere na ntị ọbara. Ọ jụrụ, 'Gịnị bụ nke a?'",
    instructionsAdditionalQuery_ear: 'Alan na-aza ajụjụ gbasara mmụta ntị: Gịnị bụ Otitis Media? Kedu ka m ga-esi sachaa ntị?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Jiri Arclight:</strong> <strong><em>UV ìhè, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'ọkànwà, akpụkpọ anụ ọbara, gịnị?',
    instructionsJustRight_skin:
      'Ọkànwà afọ 25, ebe akpụkpọ anụ ọbara ruo ụbọchị 3. Enweghị ọgwụ ma ọ bụ nsogbu akpụkpọ anụ gara aga. Akpụkpọ anụ na-ewe iwe ma na-eme mkpọtụ.',
    instructionsTooMuch_skin:
      "Ọkànwà a bịara ụlọ ọgwụ taa. Ọ batara n’ime ụlọ na akpụkpọ anụ ọbara, ugbu a ọ chere na nri ọ riri na-emetụta akpụkpọ ya. Ahụrụ m mmiri na ntakịrị ogwe. Ọ jụrụ, 'Gịnị bụ nke a?'",
    instructionsAdditionalQuery_skin: 'Alan na-aza ajụjụ gbasara mmụta akpụkpọ: Gịnị bụ Eczema? Kedu ka m ga-esi hụ pigment network?',
    instructionsLabelTooLittle: 'Obere nke ukwuu',
    instructionsLabelJustRight: 'Zuru oke',
    instructionsLabelTooMuch: 'Karịrị oke',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan bụ onye enyemaka AI maka ụmụ akwụkwọ na ndị na-ahụkarị nsogbu anya, ntị ma ọ bụ akpụkpọ anụ. Dee ma ọ bụ kwuo nke ọma ma zere ikpughe aha ma ọ bụ nkọwa nke ga-eme ka a mata onye ahụ.',
    goodLuck: 'Ịga nke ọma!',
    namePlaceholder: 'Aha',
    // rolePlaceholder: 'Ọrụ',

    // --- NEW "Experience" Dropdown Translations (Needs review for Igbo) ---
    experiencePlaceholder: 'Ahụmahụ',
    experienceStudentRefresher: 'Nwa akwukwo / Ntughari',
    experienceConfidentCore: 'Obi ike isi ihe omuma',
    experienceExpert: 'Onye okachamara',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 afọ',
    experienceOption2: '1-3 afọ',
    experienceOption3: '3-7 afọ',
    experienceOption4: '>7 afọ',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Ebumnuche',
    aimsOption1: 'Nzọụkwụ nke abụọ',
    aimsOption2: 'Nchọpụta ọrịa',
    aimsOption3: 'Kparịta ụka nke ọma',
    */
    contactPlaceholder: 'Kpọtụrụ (email/ekwentị)',
    acceptButton: 'Nabata',

    images: "Ihe oyiyi",
    help: "Enyemaka",
    screenshot: "Screenshot",
    refer: "Ziga",
    comingSoon: "Na-abịa ngwa ngwa...",
  },

  // 17) Zulu - zu
  zu: {
    eyesEars: 'Amehlo, Indlebe, Isikhumba',
    goodHistory: 'Umlando Omuhle',
    examineWell: 'Hlola Kahle',
    useArclight: 'Sebenzisa i-Arclight',
    howCanIHelp: 'Ngingakusiza kanjani namuhla?',
    alanMistakes: `Alan angase enze amaphutha. Sebenzisa ukuhlola kwezokwelapha. ${new Date().getMonth() + 1}/25,`,
    login: 'Ngena',
    enterPassword: 'Faka Iphasiwedi',
    register: 'Bhalisa',
    name: 'Igama',
    password: 'Iphasiwedi (izinombolo ezingu-4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Zulu) ---
    aimsPlaceholder: 'Izinhloso',
    aimsEyes: 'Amehlo',
    aimsEars: 'Izindlebe',
    aimsSkin: 'Isikhumba',
    aimsVeterinary: 'Izilwane',
    aimsChildMaternal: 'Izingane/Omama',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Umsebenzi Wezempilo',
    nurse: 'Unesi',
    ophthalmicOfficer: 'Isisebenzi Sezokwelapha Amehlo',
    medicalStudent: 'Umfundi Wezokwelapha',
    physicianAssociate: 'Umsekeli kadokotela',
    generalPractitioner: 'Udokotela Jikelele',
    hospitalDoctor: 'Udokotela WeSibhedlela',
    ophthalmologist: 'Udokotela Wamehlo',
    optometrist: 'Umhloli Wamehlo',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Udokotela Wezindlebe, Ikhala, Nomphimbo',
    pharmacist: 'Umthengisi Womuthi',
    audiologist: 'Isazi Sokuzwa',
    earCarePractitioner: 'Umnakekeli Wendlebe',
    dermatologist: 'Udokotela Wesikhumba',
    */

    instructionsButton: 'Indlela yokusebenzisa',
    eyeButton: 'Ihlo',
    earButton: 'Indlebe',
    skinButton: 'Isikhumba',
    videosButton: 'Amavidiyo',
    atomsButton: 'Atoms',
    toolsButton: 'Amathuluzi',
    arclightProjectButton: 'Iphrojekthi ye-Arclight',
    linksButton: 'Izixhumanisi',
    aboutButton: 'Mayelana',

    passwordTitle: 'Faka iphasiwedi yokumenywa kuka-Alan',
    passwordPlaceholder: 'Iphasiwedi',
    passwordErrorMsg: 'Iphasiwedi ayilungile. Zama futhi',
    passwordSubmitBtn: 'Thumela',
    noCodeLine:
      "Awunawo noma awulungile ikhodi? Xhumana nathi <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>lapha</a>",

    eyeMarqueeLine1: 'Uyini i-glaucoma?',
    eyeMarqueeLine2: 'Ngingayibona kanjani i-optic disc ngisebenzisa i-Arclight?',
    eyeMarqueeLine3: 'Indoda eneminyaka engu-25, iso elibomvu, izinsuku ezi-3, ukwesaba ukukhanya, imboni isehla kancane',
    eyeMarqueeLine4: 'Ngitshele nge-iritis',
    eyeMarqueeLine5: 'Ngabe kumele ngidlulisele i-cataract yezelamani ngokushesha?',
    eyeMarqueeLine6: 'Owesifazane oneminyaka engu-65, ukubona kuncane, akagqoki amagalasi. Ingaphambili ilungile, ilensi ibemdaka',
    eyeMarqueeLine7: 'Umama ukhathazekile ngomntwana onompintshe omhlophe, akaboni kulelo iso',

    earMarqueeLine1: 'Yini i-otitis media?',
    earMarqueeLine2: 'Ngingabona i-tympanic membrane nge-Arclight yami?',
    earMarqueeLine3: 'Insizwa eneminyaka engu-16, ubuhlungu epuletini izinsuku ezi-2, ukuqwasha, ukuzwa kulungile',
    earMarqueeLine4: 'Ngitshele nge-syringing (ukuhlanza indlebe)',
    earMarqueeLine5: 'Ngabe kumele ngidlulisele i-mastoiditis ngokushesha?',
    earMarqueeLine6: 'Indoda eneminyaka engu-73, ukuzwa kuncane. Inzila yendlebe ayibonakali kahle, ngibona umsizi wewax kuphela',
    earMarqueeLine7: 'Ingane ayiphenduli emsindweni. Sekuphele izinyanga',

    userInfoTitle: 'Ulwazi Lomsebenzisi',
    userName: 'Igama',
    userContact: 'Imininingwane Yokuxhumana',
    userRole: 'Indima',
    userAimsPopupLabel: "Izinhloso",
    // userAims: 'Izinhloso',
    userLatLong: 'Ubude no Ububanzi',
    userArea: 'Indawo',
    userCountry: 'Izwe',
    userVersion: 'Uhlobo',
    userDateTime: 'Usuku nesikhathi',
    geolocationButton: 'Ukuchazwa Kwesindawo',
    geoInfoText:
      'Uma uchofoza "Ukuchazwa Kwesindawo", kuzokwabelana ngendawo enembile (ububanzi/ubude). Lokhu kusiza ekunikezeni iziqondiso nezinketho ezingcono.',

    pageTitle_howToExamineEye: 'Indlela yokuhlola iso',
    frontOfEyeHeading: 'Ingxenye Yokuqala Yeso',
    frontOfEyeText:
      "Bheka uqhathanise amehlo: <em>qondile,</em> <em>kwesokudla,</em> <em>kwesobunxele,</em> <em>phezulu,</em> phansi<br><strong><u>Bamba futhi usondele</u></strong>. Hlola: <em>imiphango,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Sebenzisa <span style='color: orange;'>fluro</span> kumabhakede noma ukungcolisa i-cornea",
    fundalReflexHeading: 'Ukuphendula KweFundal',
    fundalReflexText:
      'Igumbi elinemibala <em>emnyama</em>, umntwana uyajabula; kude ngokwezingalo – qhathanisa ukuphendula<br>Okulinganayo: <em>Ukukhanya,</em> <em>Umbala,</em> <em>Uhlobo</em><br>Sondela ukuze ubone imininingwane: <em>Isilonda, i-cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Ingemuva Yeso',
    backOfEyeText:
      'Sebenzisa iso elingakwesokudla ukubuka iso lomuntu; kwesokunxele ukubuka isokunxele<br>Umuntu kufanele abheke ngqo, hhayi ebheke ekukhanyeni; sondela bese uthola i-optic disc (Dilate = ukubuka okuhle kakhulu)<br>Bheka i-disc: <em>Umgca,</em> <em>Umbala,</em> <em>Ikhapu</em>. Landela imithambo emikhulu, bese ucela umuntu abheke ngqo ekukhanyeni ukuze abone i-macula',
    additionalText_eye:
      "Yazi ama-disc akho: ajwayelekile, <span style='color:red; font-weight:bold;'>afiphele,</span> <span style='color:red;'>imithambo emisha,</span> <span style='color:orange;'>echotshozwayo,</span> <span style='color:green;'>ayacace</span><br>&gt;Zijwayeze ngokujwayelekile&lt;",

    pageTitle_howToExamineEar: 'Indlela yokuhlola indlebe',
    allAroundEarHeading: 'Okuzungezile indlebe',
    allAroundEarText:
      'Hlola: <em>pinna, </em><em>tragus, </em><em>mastoid</em> ukubona amacembe, ukuvuvukala noma ukuphuma kokuqukethwe<br>Cindezela pinna kancane, uqaphele uma kunobuhlungu',
    earCanalHeading: 'Umsele wentlebe',
    earCanalText:
      'Biza ikhanda, <strong><u>bamba i-Arclight njengombhalo</u></strong><br>Donsa pinna phezulu/emuva (kubantu abadala) noma phansi/emuva (kubantwana)<br>Faka i-speculum (4.5mm kubantu abadala, 2.5mm ezinganeni), cindezela phezu kwezinwele, ujikele uma kudingeka<br>Bheka: <em>ukungcola,</em> <em>izinto ezingcolile,</em> <em>ukutheleleka</em>',
    tympanicMembraneHeading: 'Ithambo lentlebe',
    tympanicMembraneText:
      'Thola i-handle ye-malleus, ukubonakala kokukhanya, kanye ne-attic<br>Qaphela: <em>umbala,</em> <em>isikhundla,</em> <em>ukucaca</em><br>Bheka ukuphuka, uketshezi noma ukusilela',
    additionalText_ear:
      "Yazi i-TM yakho: evamile, <span style='color:red; font-weight:bold;'>bomvu</span>, <span style='color:orange;'>ekhuphukile</span>, <span style='color:green;'>ehogile</span>, <span style='color:purple;'>ephekiwe</span><br>&gt;Zijwayeze njalo&lt;",

    pageTitle_howToExamineSkin: 'Indlela yokuhlola isikhumba',
    generalObservationHeading: 'Ukubuka okugcwele',
    generalObservationText:
      'Hlola izimpondo, <em>ukushintsha kombala</em> nokusatshalaliswa<br>Thinta kancane ukuze ubone umumo, izinga lokushisa noma ubuhlungu',
    uvLightHeading: 'Ukukhanya kwe-UV (Wood’s)',
    uvLightText:
      "Egumbini elimnyama, hlola i-fluorescence ebonakalayo:<br><span style='color:teal;'>tinea (oluhlaza okwesibhakabhaka-oluhlaza)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (ophuzi okuxubile)</span>, <span style='color:#FF4040;'>erythrasma (obomvu okungokwesikhumba)</span>, <span style='color:blue;'>vitiligo (oluhlaza okwesibhakabhaka-omhlophe)</span>, <span style='color:orange;'>acne (ophephuli okuxubile)</span>, <span style='color:#BFEFFF;'>amaqanda amahlophe (oluhlaza okuncane)</span>",
    dermoscopyHeading: 'Dermoskopi',
    dermoscopyText:
      '<strong><u>Bamba i-Arclight polariser njengombhalo</u></strong>, hlola: <strong>ABCDE</strong> (<em>Ukungafani</em>, <em>Umngcele</em>, <em>Umbala</em>, <em>Ububanzi &gt;6mm</em>, <em>Eshintsha</em>)<br>Bheka: PDSBV (<em>Inethi ye-pigment</em>, <em>Amaphuzu</em>, <em>Imigqa</em>, <em>Oluhlaza okwesibhakabhaka-omhlophe</em>, <em>Izicubu zegazi</em>)',
    additionalText_skin:
      "Yazi lesion yakho: evamile, <span style='color:red;'>eyosabekayo</span>, <span style='color:orange;'>eyovuvukileyo</span><br>&gt;Zijwayeze njalo&lt;",

    pageTitle_aboutAlan: 'Mayelana noAlan',
    aboutAlanText:
      'UAlan ungumsizi wezokuhlola we-AI weziso, izindlebe kanye nesikhumba, okuhlanganisa imodeli yolimi eyisisekelo kanye ne-logiki yesimboli. Uhlakaniphile. Unesizotha. Wakamuva.<br><br>Ulwazi lwezokwelapha, lwendawo kanye nezithombe, kulungiselelwe izindima ezihlukene ezifana nabasebenzi bezempilo kanye nodokotela abajwayelekile. Ingxoxo emfushane idala isifo kanye nohlelo lokuphatha. Ukusetshenziswa kwe-Arclight kufakiwe kuyo yonke indawo.<br>',
    aboutAlanListItem1: 'Isisekelo sabachwepheshe – isimo sezulu esishisayo/esifudumele',
    aboutAlanListItem2: 'Uyakwazi i-Arclight',
    aboutAlanEfficient: '<strong>Okusebenzayo</strong> – ulimi olufushane nolulula',
    aboutAlanEasy: '<strong>Kulula ukuyisebenzisa</strong> – uhlelo lokusebenza, izwi, ukubona',
    aboutAlanExplainable: '<strong>Okuchazekayo</strong> – amaqiniso/imithetho, izithombe',
    aboutAlanEncouraging: '<strong>Okukhuthazayo</strong> – uzwelo, umfundisi',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Imiyalelo',
    instructionsIntro:
      'Alan ungumsizi we-AI wabafundi nalabo abambalwa abahlangabezana nezimo zamehlo, izindlebe noma isikhumba. Bhala noma khuluma ngokusobala futhi ugweme ukukhombisa amagama noma imininingwane ebakhomba umuntu. Bheka kahle ekhanda/ubuso/ingxenye yomzimba, uhlolisise amehlo/izindlebe zombili. Inhlanhla enhle!',
    instructionsPatientPrompt: 'Tshela uAlan mayelana nomtholampilo wakho:',
    instructionsPatientDetail1: 'inkinga nesiqalo',
    instructionsPatientDetail2: 'lokho okubonayo',
    instructionsPatientDetail3: 'umbono kanye namapupile',
    instructionsPatientDetail4: 'iminyaka, ubulili, imithi',
    instructionsUseArclight_default: 'Sebenzisa i-Arclight: phambili, fundal reflex, emuva kweso.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Sebenzisa i-Arclight:</strong> <strong><em>phambili, fundal reflex, emuva kweso.</em></strong>',
    instructionsTooLittle_eye: 'indoda, iso elibomvu, kwenzekani?',
    instructionsJustRight_eye:
      'Indoda engu-25, iso elibomvu imihla emi-3. Ayikho imithi noma inkinga yamehlo ngaphambili. Ubuhlungu, ukuchama kwamehlo, iphuzu elimhlophe ku-cornea. Amapupile alungile, umbono 6/12 no-6/6 kwenye iso.',
    instructionsTooMuch_eye:
      "Le ndoda ingenile klinikhi namuhla. Iqhube imoto yangenela isakhiwo, iso layo libomvu, manje icabanga ukuthi ukudla okudliweyo kuyayithinta iso layo. Ngiyabona ukuchama kwamehlo nemiphetho ebomvu. Ifuna usizo—indoda ende, amehlombe amanzi, ekhathazekile nge-cornea nobuhlungu. Ithetha, 'Kuyini lokhu?'",
    instructionsAdditionalQuery_eye: 'Alan uphendula imibuzo yokufundisa mayelana namehlo: Kuyini Iritis? Ngingayibona kanjani i-retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Sebenzisa i-Arclight:</strong> <strong><em>jikeleza izindlebe, canal, drum.</em></strong>',
    instructionsTooLittle_ear: 'indoda, izindlebe ezibomvu, kwenzekani?',
    instructionsJustRight_ear:
      'Indoda engu-25, izindlebe ezibomvu imihla emi-3. Ayikho imithi noma inkinga yezindlebe ngaphambili. Ubuhlungu, ukukhipha okuthile ezindlebeni. Drum ibomvu, ukuzwa kuyancipha kwindlebe elibi kodwa kulungile kwelinye.',
    instructionsTooMuch_ear:
      "Le ndoda ingenile klinikhi namuhla. Iqhube imoto yangenela isakhiwo, izindlebe zayo ezibomvu, icabanga ukuthi ukudla okudliweyo kuyayithinta. Ngiyabona ukukhipha nokubomvu. Ifuna usizo—indoda ende, izindlebe ezimanzi, ekhathazekile ngokuzwa nobuhlungu. Ithetha, 'Kuyini lokhu?'",
    instructionsAdditionalQuery_ear:
      'Alan uphendula imibuzo yokufundisa mayelana nezindlebe: Kuyini Otitis Media? Ngingazihlambulula kanjani izindlebe?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Sebenzisa i-Arclight:</strong> <strong><em>ukukhanya kwe-UV, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'indoda, isikhumba esibomvu, kwenzekani?',
    instructionsJustRight_skin:
      'Indoda engu-25, isikhumba esibomvu isiqeshwa imihla emi-3. Ayikho imithi noma inkinga yesikhumba ngaphambili. Isikhumba siyakhathala futhi siyacasuka.',
    instructionsTooMuch_skin:
      "Le ndoda ingenile klinikhi namuhla. Iqhube imoto yangenela isakhiwo, isikhumba sayo sibomvu, icabanga ukuthi ukudla okudliweyo kuyayithinta. Ngiyabona ukuchama nokubomvu. Ifuna usizo—indoda ende, isikhumba esibomvu, ekhathazekile nge-pigment kanye nokucasuka. Ithetha, 'Kuyini lokhu?'",
    instructionsAdditionalQuery_skin:
      'Alan uphendula imibuzo yokufundisa mayelana nesikhumba: Kuyini Eczema? Ngingayibona kanjani inethi ye-pigment?',
    instructionsLabelTooLittle: 'Kancane kakhulu',
    instructionsLabelJustRight: 'Kulungile',
    instructionsLabelTooMuch: 'Kakhulu kakhulu',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ungumsizi we-AI wabafundi nalabo abambalwa abahlangabezana nezinkinga zamehlo, izindlebe noma isikhumba. Bhala noma khuluma ngokusobala, ugweme ukubonisa amagama noma imininingwane ebakhomba. Bheka kahle ekhanda, ebusweni noma engxenyeni yomzimba, bese uhlola amehlo/izindlebe zombili.',
    goodLuck: 'Inhlanhla enhle!',
    namePlaceholder: 'Igama',
    // rolePlaceholder: 'Indima',

    // --- NEW "Experience" Dropdown Translations (Needs review for Zulu) ---
    experiencePlaceholder: 'Ulwazi',
    experienceStudentRefresher: 'Umfundi / Ukuvuselela',
    experienceConfidentCore: 'Ulwazi Oluyisisekelo Oluthembekile',
    experienceExpert: 'Uchwepheshe',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 unyaka',
    experienceOption2: '1-3 unyaka',
    experienceOption3: '3-7 unyaka',
    experienceOption4: '>7 unyaka',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Izinhloso',
    aimsOption1: 'Umbono wesibili',
    aimsOption2: 'Ukubheka isimo',
    aimsOption3: 'Ukuxhumana kangcono',
    */
    contactPlaceholder: 'Xhumana (imeyili/umakhalekhukhwini)',
    acceptButton: 'Yamukela',

    images: "Izithombe",
    help: "Usizo",
    screenshot: "Isithombe-skrini",
    refer: "Bhekisa",
    comingSoon: "Kuze maduzane...",
  },

  // 18) Amharic - am
  am: {
    eyesEars: 'አይኖች፣ ጆሮዎች፣ ቆዳ',
    goodHistory: 'ጥሩ ታሪክ',
    examineWell: 'በጥሞት መመርመር',
    useArclight: 'Arclight ይጠቀሙ',
    howCanIHelp: 'እንዴት ልረዳህ/ልረድሽ?',
    alanMistakes: `Alan ሊስተዋል ይችላል። ክሊኒካዊ ፍርድ ይጠቀሙ። ${new Date().getMonth() + 1}/25,`,
    login: 'ግባ',
    enterPassword: 'የማለፊያ ቃል ያስገቡ',
    register: 'መመዝገብ',
    name: 'ስም',
    password: 'የማለፊያ ቃል (4 ዲጂት)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Amharic) ---
    aimsPlaceholder: 'ዓላማዎች',
    aimsEyes: 'አይኖች',
    aimsEars: 'ጆሮዎች',
    aimsSkin: 'ቆዳ',
    aimsVeterinary: 'የእንስሳት ህክምና',
    aimsChildMaternal: 'ህጻን/እናት',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'የጤና ሰራተኛ',
    nurse: 'አስተባባሪ/ነርስ',
    ophthalmicOfficer: 'የዓይን ህክምና ባለሙያ',
    medicalStudent: 'የሕክምና ተማሪ',
    physicianAssociate: 'የሐኪም አጋር',
    generalPractitioner: 'አጠቃላይ ጤና ሀኪም',
    hospitalDoctor: 'የሆስፒታል ጤና ባለሙያ',
    ophthalmologist: 'የዓይን ሀኪም',
    optometrist: 'አንቶሜትሪስት',
    orthoptist: 'ኦርቶፕቲስት',
    entSpecialist: 'የጆሮ አፍንጫ ደረት ባለሙያ',
    pharmacist: 'መድሃኒት አቅራቢ',
    audiologist: 'የመስማት ባለሙያ',
    earCarePractitioner: 'የጆሮ አግዟ ባለሙያ',
    dermatologist: 'የቆዳ ሀኪም',
    */

    instructionsButton: 'እንዴት እንደሚጠቀሙ',
    eyeButton: 'አይን',
    earButton: 'ጆሮ',
    skinButton: 'ቆዳ',
    videosButton: 'ቪዲዮዎች',
    atomsButton: 'አቶሞች',
    toolsButton: 'መሳሪያዎች',
    arclightProjectButton: 'Arclight ፕሮጀክት',
    linksButton: 'ሊንኮች',
    aboutButton: 'ስለ',

    passwordTitle: 'የAlan ግብዣ ፓስወርድ አስገባ',
    passwordPlaceholder: 'ፓስወርድ',
    passwordErrorMsg: 'ፓስወርዱ አይገባም። እባክህ እንደገና ፍትሽ',
    passwordSubmitBtn: 'አስረክብ',
    noCodeLine: "ኮድ የለም ወይም በተሳሳተ? ከኛ <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>እዚህ</a> ጋር ይግኙ",

    eyeMarqueeLine1: 'ግላውኮማ ምንድነው?',
    eyeMarqueeLine2: 'በArclight የአይን ወይን አካል (optic disc) እንዴት ማየት እችላለሁ?',
    eyeMarqueeLine3: 'ወንድ 25 ዓመት, ቀይ አይን 3 ቀን, በብርሃን ፍርሃት, የማየት በጥቂት ተቀነሰ',
    eyeMarqueeLine4: 'ስለ iritis ንገረኝ',
    eyeMarqueeLine5: 'በተፈጥሮ የተፈጠረ ካትራክት አድርሳለሁ?',
    eyeMarqueeLine6: 'ሴት 65 ዓመት, ራዕይ ደካማ, መነጽር አትለብስም። ፊት ጥሩ ነው፣ ጭልፋ ያለ ዓይን።',
    eyeMarqueeLine7: 'እናት ተጨንቃለች: ሕፃን ነጣ ያለ ቆዳ በዓይን, ምንም አይታይም በዚያ አይን',

    earMarqueeLine1: 'የመካከለኛ ጆሮ በሽታ ምንድነው?',
    earMarqueeLine2: 'በArclight የጆሮ ታይምፓኒክ ሜምብሬን ማየት እችላለሁ?',
    earMarqueeLine3: 'ወጣት 16 ዓመት, ጆሮ ጉር 2 ቀን, እንቅስቃሴ, መስማት ጥሩ ነው',
    earMarqueeLine4: 'ስለ ጆሮ ሲሪንግ ንገረኝ',
    earMarqueeLine5: 'ማስቶይድይቲስ በአጊዜ መላክ አለብኝ?',
    earMarqueeLine6: 'ወንድ 73 ዓመት, መስማት ደካማ. ጆሮው የታየ አይሆንም, እናቆራራለሁ ጆሮ ሉቃቅ',
    earMarqueeLine7: 'ሕፃኑ በጊዜው አንደበት አይሰማም. ከብዙ ወራት ጀምሮ',

    userInfoTitle: 'የተጠቃሚ መረጃ',
    userName: 'ስም',
    userContact: 'የመገናኘት መረጃ',
    userRole: 'ተግባር',
    userAimsPopupLabel: "ዓላማዎች",
    // userAims: 'ዓላማዎች',
    userLatLong: 'Lat & Long',
    userArea: 'አካባቢ',
    userCountry: 'ሀገር',
    userVersion: 'ስሪት',
    userDateTime: 'ቀን & ሰዓት',
    geolocationButton: 'ቦታ መለኪያ',
    geoInfoText: 'በ"ቦታ መለኪያ" ላይ በመጫን የትክክለኛ ቦታ (የርዝመ/የሰፊነት) ይጋራል። ይህም የተሻለ መምሪያና አማራጭ ስርዓት መስጠት ይረዳል።',

    pageTitle_howToExamineEye: 'እንዴት ዓይን መፈተን እንደሚገባ',
    frontOfEyeHeading: 'የዓይን ፊት ክፍል',
    frontOfEyeText:
      "ዓይኖችን ተመልከትና አዛዥ አድርጉ: <em>ቀጥተኛ,</em> <em>ቀኝ,</em> <em>ግራ,</em> <em>ከፍ,</em> ዝቅ<br><strong><u>ቅርብ በሆነ ሁኔታ ይቆዩ</u></strong>። ይፈትኑ: <em>ዕፀ,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>ለcorneal የሆኑ የእብድ ቦታዎች ወይም ጉድለቶች <span style='color: orange;'>fluro</span> ይጠቀሙ",
    fundalReflexHeading: 'የFundal መልስ',
    fundalReflexText:
      'ብርቱ በሆነ ክፍል ቤት, ሕፃን ደስ ይበላቸዋል; ከእጅ ርቀት ላይ – መልሶችን አዛዥ ይኖሩ<br>እኩል: <em>ብርሃን,</em> <em>ቀለም,</em> <em>ቅርፅ</em><br>ተጨማሪ ዝርዝሮች ለማየት ቅርብ ይሁኑ: <em>ምልክት, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'የዓይን ዳር ክፍል',
    backOfEyeText:
      'ቀኝ ዓይን በመጠቀም የታካሚውን ቀኝ ዓይን ይመልከቱ; ግራውን ለግራ ይመልከቱ<br>ታካሚው ቀጥተኛ መመልከት አለበት እንጂ ወደ ብርሃን አይተው። ቅርብ ይሁኑና optic disc ይፈልጉ (Dilate = ምርጥ እይታ)<br>disc ይጥናቀቁ: <em>ጎን,</em> <em>ቀለም,</em> <em>ኩፕ</em>. ትልቅ ደም አቀፎችን ይከተሉ፣ ከዚያም ታካሚውን ቀጥተኛ ወደ ብርሃን ይተው ማኩላን ያዩ ብለው ይጠይቁ',
    additionalText_eye:
      "disc ያውቁ: መለመድ, <span style='color:red; font-weight:bold;'>ተበሳጨ,</span> <span style='color:red;'>አዲስ ደም አቀፎች,</span> <span style='color:orange;'>ተከፍቷ,</span> <span style='color:green;'>ዝቅተኛ</span><br>&gt;በዘመኑ ልምድ ያድርጉ&lt;",

    pageTitle_howToExamineEar: 'እንዴት ጆሮን መፈተን እንደሚገባ',
    allAroundEarHeading: 'የጆሮ ዙሪያ',
    allAroundEarText: 'ይፈትኑ: <em>ፒና, </em><em>ትራግስ, </em><em>ማስቶይድ</em> ለክብ, ስሜት ችግኝ ወይም ማስጠንቀቂያ<br>ፒናን በርካታ ዝርዝር ይንቀሳቀሱ እና ማንኛውንም ህመም ያሳዩ',
    earCanalHeading: 'የጆሮ ትስስር',
    earCanalText:
      'ራስን ይጎዱ፣ <strong><u>Arclightን እንደ እቃ ተቆም ይያዙ</u></strong><br>ፒናን ለማየት ለሕዝብ (ታዋቂዎች) ወይም ለልጆች (ታውቂዎች) ወደ ላይ/ወደ ኋላ ይጫኑ<br>ስፔኩለም ያስገቡ (ታዋቂ: 4.5mm, ልጆች: 2.5mm)፣ ጸጉርን ይነጻሉ፣ ከሚያስፈልግ በሌላ በሙሉ ይቀየሩ<br>ይፈልጉ: <em>ጆሮ ስር,</em> <em>ቅርጸ ነጭ,</em> <em>በሽታ</em>',
    tympanicMembraneHeading: 'ጆሮ ጭንቅላት',
    tympanicMembraneText: 'የማሌዎስ እጅ ይወቁ፣ የብርሃን ተመልከትና አቲክን ይለዩ<br>ማስታወቂያ: <em>ቀለም,</em> <em>ቦታ,</em> <em>ግልጽነት</em><br>ፍቺ ፣ ፍሳሽ ወይም ምልክት ይፈልጉ',
    additionalText_ear:
      "የጆሮዎን ጭንቅላት ያውቁ፦ ተፈጥሮ, <span style='color:red; font-weight:bold;'>ቀይ</span>, <span style='color:orange;'>ተነሳሽ</span>, <span style='color:green;'>ተቀንስ</span>, <span style='color:purple;'>ተፈታ</span><br>&gt;ተደጋጋሚ ተሞክሩ&lt;",

    pageTitle_howToExamineSkin: 'እንዴት የቆዳን መፈተን እንደሚገባ',
    generalObservationHeading: 'የጠቅላላ ትንታኔ',
    generalObservationText: 'ቁስል እና <em>ቀለም ለውጦች</em> ያሳዩ፣ ተመን ይፈትኑ<br>በቀስተ ልብ ቆዳውን ይጭሩ ለቅርጸት፣ ሙቀት ወይም ስሜት ይረዱ',
    uvLightHeading: 'የUV (Wood’s) ብርሃን',
    uvLightText:
      "በጥቁር ክፍል ውስጥ የሚታየውን ፍሎሮሴንስ ይፈትኑ:<br><span style='color:teal;'>ቲኒያ (ሰማያዊ-ሰማያዊ)</span>, <span style='color:#FF7F50;'>ፒቲሪያሲስ ቨርሲኮለር (ብርቱ ብርቱ)</span>, <span style='color:#FF4040;'>ኤሪትራስማ (ወይዘሮ ቀይ)</span>, <span style='color:blue;'>ቪቲሊጎ (ሰማያዊ-ነጭ)</span>, <span style='color:orange;'>አክኔ (ብርቱ ቀይ)</span>, <span style='color:#BFEFFF;'>የራስ ሙቅ ነገር (ቀለም ቀለም)</span>",
    dermoscopyHeading: 'የቆዳ መሳሪያ አሳይ',
    dermoscopyText:
      '<strong><u>Arclight ፖላራይዘርን እንደ ብራሽ ይይዙ</u></strong>፣ ይፈትኑ: <strong>ABCDE</strong> (<em>ያልተመሳሰሉ</em>, <em>ገደብ</em>, <em>ቀለም</em>, <em>ኮር ላይ &gt;6mm</em>, <em>የሚለዋዋጭ</em>)<br>ይጥኑ: PDSBV (<em>የቀለም ኔትወርክ</em>, <em>ነጥቦች</em>, <em>መስመሮች</em>, <em>ሰማያዊ-ነጭ</em>, <em>የደም ተስፋ</em>)',
    additionalText_skin:
      "የቆዳዎን ሕመም ያውቁ፡ ተፈጥሮ, <span style='color:red; font-weight:bold;'>ተጠላ</span>, <span style='color:orange;'>ተነሳ</span><br>&gt;ተደጋጋሚ ተሞክሩ&lt;",

    pageTitle_aboutAlan: 'ስለ Alan',
    aboutAlanText:
      'Alan የአይ ፣ ጆሮ እና ቆዳ ምርመራ አስተዳደር ነው፣ በመሠረታዊ ቋንቋ ሞዴል እና በምልክት ሎጂክ የተገነባ ነው። ብልጥ ነው። ጥንቃቄ አለው። ከዘመናዊ ሁኔታ ጋር ይዛል።<br><br>ክሊኒካዊ፣ የአካባቢ እውቀት እና ፎቶዎች ለጤና ሰራተኞች እና ለአጠቃላይ ሐኪሞች ተስማሚ ይሆናሉ። አጭር ውይይት ምርመራ እና የአስተዳደር እቅድ ይፈጥራል። የArclight አጠቃቀም በሙሉ ተካትቷል።<br>',
    aboutAlanListItem1: 'የባለሙያ መሠረት – የሙቀት/የአልጋ አየር',
    aboutAlanListItem2: 'የArclight ስለ ሆነ ያውቃል',
    aboutAlanEfficient: '<strong>ተግባራዊ</strong> – አጭር፣ ቀላል ቋንቋ',
    aboutAlanEasy: '<strong>ቀላል ለመጠቀም</strong> – መተግበሪያ፣ ድምፅ፣ ራዕይ',
    aboutAlanExplainable: '<strong>ልብስ የሚያሳይ</strong> – እውነቶች/ህጎች፣ ፎቶዎች',
    aboutAlanEncouraging: '<strong>የሚነጋገር</strong> – ርኩስነት፣ መምህር',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'መመሪያዎች',
    instructionsIntro:
      'Alan የአይ፣ ጆሮ እና ቆዳ ምርመራ አስተዳደር ነው፣ ለተማሪዎች እና ከጊዜ ወደ ጊዜ ብቻ የሚታዩ ክስተቶች ይደርሳሉ። በግልጽ ይፃፉ ወይም ይናገሩ、እና የሚገልጽ ስሞች ወይም ዝርዝሮች አትገልጹ። ራስ/ፊት/ክፍልን በፍጹም ይመልከቱ እና ሁለቱንም ዓይኖች/ጆሮዎች ይፈትኑ። የተሻለ ሁኔታ ይሁን!',
    instructionsPatientPrompt: 'ስለ ሕመም ለAlan ይናገሩ፡',
    instructionsPatientDetail1: 'ችግኝ እና መነሻ',
    instructionsPatientDetail2: 'የሚታየው',
    instructionsPatientDetail3: 'ራዕይ እና የዓይን ሕብረት',
    instructionsPatientDetail4: 'እድሜ፣ ፆታ፣ መድሃኒት',
    instructionsUseArclight_default: 'Arclight ተጠቀሙ፡ ፊት፣ fundal reflex፣ የዓይን ዳር።',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Arclight ተጠቀሙ፡</strong> <strong><em>ፊት፣ fundal reflex፣ የዓይን ዳር።</em></strong>',
    instructionsTooLittle_eye: 'ወንድ ሰው፣ ቀይ ዓይን፣ ምን ነው?',
    instructionsJustRight_eye: 'ወንድ 25 ዓመት፣ ቀይ ዓይን ለ3 ቀናት። ቀደም ምንም መድሃኒት ወይም የዓይን ችግኝ አልነበረም። ህመም፣ ውሃ በዓይን፣ በኮርኔያ ላይ አንድ ነጭ ነጭ።',
    instructionsTooMuch_eye:
      'ይህ ወንድ ዛሬ ወደ ክሊኒክ መጣ። በመኪና ተንስቷ ህንፃ ውስጥ ገባ፣ ዓይኑ ቀይ ነው፣ እና እርሱ የተባለው ምግብ የሚተግበር እንደሆነ ያስባል። ውሃ እና ቀይ ጎኖች አሉ። እርሱ እርዳታ ይፈልጋል፤ ርዝመቱ ከፍ ያለ፣ ዓይኖቹ ውሃ ያሉ፣ ስለ ኮርኔያ እና ህመም ተጨንቀው ናቸው። እርሱ “ይህ ምንድነው?” ይላል።',
    instructionsAdditionalQuery_eye: 'Alan ደግሞ ስለ ዓይን ትምህርት ጥያቄዎች ይሰጣል፡ Iritis ምንድነው? ራዕይን እንዴት እየተመለከተ እንደምታየው?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Arclight ተጠቀሙ፡</strong> <strong><em>በሙሉ ዙሪያ የጆሮ፣ canal፣ tympan.</em></strong>',
    instructionsTooLittle_ear: 'ወንድ ሰው፣ ጆሮ ቀይ፣ ምን ነው?',
    instructionsJustRight_ear: 'ወንድ 25 ዓመት፣ ጆሮ ቀይ ለ3 ቀናት። ቀደም ምንም መድሃኒት ወይም ጆሮ ችግኝ አልነበረም። ህመም፣ የጆሮ ውሃ፣ ቀይ tympan፣ ስሰም በጭንቅላት ዝቅ ነው ግን በሌላ ጆሮ ጥሩ ነው።',
    instructionsTooMuch_ear:
      'ይህ ወንድ ዛሬ ወደ ክሊኒክ መጣ። በመኪና ተንስቷ ህንፃ ውስጥ ገባ፣ ጆሮዎቹ ቀይ ናቸው፣ እና እርሱ የተባለው ምግብ ጆሮዎቹን እንደሚተግበር ያስባል። እኔ የጆሮ ውሃን እና ቀይ ጎኖችን እቃለሁ። እርሱ እርዳታ ይፈልጋል፤ ርዝመቱ ከፍ ያለ፣ ጆሮ ውሃ ያሉ፣ ስለ ስሰም እና ህመም ተጨንቀው ናቸው። እርሱ “ይህ ምንድነው?” ይላል።',
    instructionsAdditionalQuery_ear: 'Alan ደግሞ ስለ ጆሮ ትምህርት ጥያቄዎች ይሰጣል፡ Otitis Media ምንድነው? እንዴት እንደምታሰጥ ጆሮ?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Arclight ተጠቀሙ፡</strong> <strong><em>UV ብርሃን፣ dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'ወንድ ሰው፣ ቆዳ ቀይ፣ ምን ነው?',
    instructionsJustRight_skin: 'ወንድ 25 ዓመት፣ ቆዳ ቀይ ቦታ 3 ቀናት። ቀደም ምንም መድሃኒት ወይም ቆዳ ችግኝ አልነበረም።',
    instructionsTooMuch_skin:
      'ይህ ወንድ ዛሬ ወደ ክሊኒክ መጣ። በመኪና ተንስቷ ህንፃ ውስጥ ገባ፣ ቆዳው ቀይ ነው፣ እና እርሱ የተባለው ምግብ ቆዳውን እንደሚተግበር ያስባል። እኔ ውሃን እና ቀይ ጎኖችን እቃለሁ። እርሱ እርዳታ ይፈልጋል፤ ርዝመቱ ከፍ ያለ፣ ቆዳ ቀይ ናቸው፣ ስለ pigment እና እሳት ተጨንቀው ናቸው። እርሱ “ይህ ምንድነው?” ይላል።',
    instructionsAdditionalQuery_skin: 'Alan ደግሞ ስለ ቆዳ ትምህርት ጥያቄዎች ይሰጣል፡ Eczema ምንድነው? እንዴት እንደምታሰጥ network ya pigment?',
    instructionsLabelTooLittle: 'በጣም ትንሽ',
    instructionsLabelJustRight: 'በትክክል',
    instructionsLabelTooMuch: 'በጣም ብዙ',

    // --- Onboarding Page Translations ---
    instructionText: 'Alan የአይ፣ ጆሮ እና ቆዳ ምርመራ አስተዳደር ነው፣ ለተማሪዎች እና ለበጊዜ ብቻ የሚታዩ ክስተቶች። እባክዎ ግልጽ ይፃፉ ወይም ይናገሩ፣ እና ስም ወይም ዝርዝሮችን አትገልጹ።',
    goodLuck: 'ሞገስ ይሁን!',
    namePlaceholder: 'ስም',
    // rolePlaceholder: 'ሚና',

    // --- NEW "Experience" Dropdown Translations (Needs review for Amharic) ---
    experiencePlaceholder: 'ልምድ',
    experienceStudentRefresher: 'ተማሪ / ማደሻ',
    experienceConfidentCore: 'በራስ የመተማመን ዋና እውቀት',
    experienceExpert: 'ባለሙያ',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 ዓመት',
    experienceOption2: '1-3 ዓመት',
    experienceOption3: '3-7 ዓመት',
    experienceOption4: '>7 ዓመት',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'ግብዓት',
    aimsOption1: 'ሁለተኛ አስተያየት',
    aimsOption2: 'ሁኔታ ፍለጋ',
    aimsOption3: 'የተሻለ አውታረ ግንኙነት',
    */
    contactPlaceholder: 'እውቅ (ኢሜል/ስልክ)',
    acceptButton: 'ተቀበል',

    images: "ሥዕሎች",
    help: "እርዳታ",
    screenshot: "Screenshot",
    refer: "አስተላለፍ",
    comingSoon: "በቅርቡ...",
  },

  // 19) Shona - sn
  sn: {
    eyesEars: 'Maziso, Nzeve, Ganda',
    goodHistory: 'Nhoroondo Yakanaka',
    examineWell: 'Ongorora Zvakanaka',
    useArclight: 'Shandisa Arclight',
    howCanIHelp: 'Ndingakubatsira sei nhasi?',
    alanMistakes: `Alan anogona kukanganisa. Shandisa unyanzvi hwekiriniki. ${new Date().getMonth() + 1}/25,`,
    login: 'Pinda',
    enterPassword: 'Isa password',
    register: 'Nyoresa',
    name: 'Zita',
    password: 'Password (4 digits)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Shona) ---
    aimsPlaceholder: 'Zvinangwa',
    aimsEyes: 'Maziso',
    aimsEars: 'Nzeve',
    aimsSkin: 'Ganda',
    aimsVeterinary: 'Zvipfuyo',
    aimsChildMaternal: 'Mwana/Amai',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Mushandi weutano',
    nurse: 'Mukoti',
    ophthalmicOfficer: 'Mukoti weMaziso/Kiriniki',
    medicalStudent: 'Mudzidzi weChiremba',
    physicianAssociate: 'Mubatsiri weChiremba',
    generalPractitioner: 'Chiremba weZvose',
    hospitalDoctor: 'Chiremba weChipatara',
    ophthalmologist: 'Chiremba weMaziso',
    optometrist: 'Nyanzvi yezviono',
    orthoptist: 'Nyanzvi yekugadzirisa kuona',
    entSpecialist: 'Chiremba weNzeve, Mhuno, & Mhuno',
    pharmacist: 'Murapi wemishonga',
    audiologist: 'Nyanzvi yeKunzwa',
    earCarePractitioner: 'Muiti wekutarisira nzeve',
    dermatologist: 'Chiremba weGanda',
    */

    instructionsButton: 'Maitirwo ekushandisa',
    eyeButton: 'Ziso',
    earButton: 'Nzeve',
    skinButton: 'Ganda',
    videosButton: 'Mavhidhiyo',
    atomsButton: 'Atoms',
    toolsButton: 'Zvishandiso',
    arclightProjectButton: 'Projekiti yeArclight',
    linksButton: 'Zvidziviriro (Links)',
    aboutButton: 'Nezve',

    passwordTitle: 'Isa password yekukokwa kwaAlan',
    passwordPlaceholder: 'Password',
    passwordErrorMsg: 'Password haina kunaka. Edzazve',
    passwordSubmitBtn: 'Tumira',
    noCodeLine: "Hapana kodhi kana yakarasha? Taura nesu <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>pano</a>",

    eyeMarqueeLine1: 'Chii chinonzi glaucoma?',
    eyeMarqueeLine2: 'Ndingawona sei disiki reziso (optic disc) neArclight?',
    eyeMarqueeLine3: 'Murume ane makore 25, ziso dzvuku mazuva 3, kutya chiedza, kuona kwaderera zvishoma',
    eyeMarqueeLine4: 'Ndiudze nezve iritis',
    eyeMarqueeLine5: 'Ndoda here kutumira congenital cataract nekukasika?',
    eyeMarqueeLine6: 'Mukadzi ane makore 65, kuona kusina kusimba, haashandise magirazi. Kumberi kwakanaka, lens yakatsvukuruka',
    eyeMarqueeLine7: 'Amai vanoshushikana: mucheche ane mboni chena, haone pachiso ichocho',

    earMarqueeLine1: 'Chii chinonzi otitis media?',
    earMarqueeLine2: 'Ndinokwanisa kuona guvhu rezeve (tympanic membrane) neArclight yangu here?',
    earMarqueeLine3: 'Mukomana ane makore 16, nzeve inorwadza kwema2 days, kuzara, kunzwa kwakanaka',
    earMarqueeLine4: 'Ndipakurire nezve syringing (kuchenesa nzeve)',
    earMarqueeLine5: 'Ndoda here kukurumidza kutumira mastoiditis?',
    earMarqueeLine6: 'Murume ane makore 73, kunzwa kushoma. Chiteshi chenzeve hachioneki zvakanaka, ndinoona wakisi chete',
    earMarqueeLine7: 'Mucheche haapindure pakunzwa ruzha. Kwave nemwedzi yakati wandei',

    userInfoTitle: 'Ruzivo rweMushandisi',
    userName: 'Zita',
    userContact: 'Kubata',
    userRole: 'Basa',
    userAimsPopupLabel: "Zvinangwa",
    // userAims: 'Zvinangwa',
    userLatLong: 'Lat & Long',
    userArea: 'Nzvimbo',
    userCountry: 'Nyika',
    userVersion: 'Shanduro',
    userDateTime: 'Zuva & Nguva',
    geolocationButton: 'Kuona Nzvimbo',
    geoInfoText:
      'Pakudzvanya "Kuona Nzvimbo", nzvimbo chaiyo (latitude/longitude) ichagoverwa. Izvi zvinobatsira kupa mirayiridzo uye zvirinani zvakasarudzwa.',

    pageTitle_howToExamineEye: 'Maitiro ekuongorora ziso',
    frontOfEyeHeading: 'Kumberi kweZiso',
    frontOfEyeText:
      "Ongorora uye enzanisa maziso: <em>akananga,</em> <em>kurudyi,</em> <em>kuruboshwe,</em> <em>kumusoro,</em> pasi<br><strong><u>Svika pedyo uye rambidza</u></strong>. Ongorora: <em>mavhavha,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Shandisa <span style='color: orange;'>fluro</span> pakutarisa kukuvadza kana kukuvara kwecornea",
    fundalReflexHeading: 'Fundal Reflex',
    fundalReflexText:
      'Imba <em>risina chiedza</em>, mwana anofara; kure nemunwe – enzanisa mwaramutsetse<br>Zvakafanana: <em>Kujeka,</em> <em>Ruvara,</em> <em>Chimiro</em><br>Svika pedyo kuona zvakadzama: <em>Maronda, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Shure kweZiso',
    backOfEyeText:
      'Shandisa ziso rerudyi kuona ziso rerudyi remurwere; reboshwe kuona reboshwe<br>Murwere anofanira kutarisa zvakananga KWETE kuenda kuchiedza; svika pedyo uye tsvaga optic disc (Dilate = kuona kwakanakisa)<br>Ongorora disc: <em>Rutivi,</em> <em>Ruvara,</em> <em>Kapu</em>. Tevera miviri mikuru, wodzoka udzidzise murwere kutarisa zvakananga kuchiedza kuti aone macula',
    additionalText_eye:
      "Ziva madiscs ako: zvakajairika, <span style='color:red; font-weight:bold;'>akuvadzwa,</span> <span style='color:red;'>mitsva miviri,</span> <span style='color:orange;'>akapwanywa,</span> <span style='color:green;'>zvishoma</span><br>&gt;Dzidzira kazhinji&lt;",

    pageTitle_howToExamineEar: 'Maitiro ekuongorora nzeve',
    allAroundEarHeading: 'Nzvimbo yakakomberedza nzeve',
    allAroundEarText:
      'Ongorora: <em>pinna, </em><em>tragus, </em><em>mastoid</em> kuti paine chiumbwa, kusava nyore kana kusvotwa<br>Fambisa pinna zvinyoronyoro, ona kana pane marwadzo',
    earCanalHeading: 'Nzira yenzeve',
    earCanalText:
      'Kakavadza musoro, <strong><u>batidza Arclight senge chinyorwa</u></strong><br>Dhonza pinna kumusoro/kuseri (kuvanhu vakuru) kana kuenda pasi/kuseri (kuvana)<br>Pinza speculum (4.5mm yevakuru, 2.5mm yevana), dzima ntutu, shandura kana zvichidiwa<br>Ongorora: <em>kupera kwewaxa,</em> <em>zvisaririra,</em> <em>hutachiona</em>',
    tympanicMembraneHeading: 'Membranisi yeNzeve',
    tympanicMembraneText: 'Ziva mbira ya malleus, chiedza chinoratidza, attic<br>Ongorora: <em>ruvara</em>, <em>nzvimbo</em>, <em>kujeka</em><br>Tarisa kuboora, mvura kana mavanga',
    additionalText_ear:
      "Ziva maTM ako: echinyakare, <span style='color:red; font-weight:bold;'>dzvuku</span>, <span style='color:orange;'>kuwedzera</span>, <span style='color:green;'>kudzorerwa</span>, <span style='color:purple;'>kupwanya</span><br>&gt;Dzidzira kazhinji&lt;",

    pageTitle_howToExamineSkin: 'Maitiro ekuongorora ganda',
    generalObservationHeading: 'Kuongorora kwakazara',
    generalObservationText: 'Tarisa mapundu, <em>shanduko dzemavara</em> uye kugoverwa<br>Nyatso pfugama kuti unzwe kusimba, kupisa kana kurwadziwa',
    uvLightHeading: 'UV (Wood’s) mwenje',
    uvLightText:
      "Mumba rakadzikama, tarisa kuoneka kwe fluorescence:<br><span style='color:teal;'>tinea (bhuruu-nesvibira)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (orenji-copper)</span>, <span style='color:#FF4040;'>erythrasma (ruvara rwecoral)</span>, <span style='color:blue;'>vitiligo (bhuruu- chena)</span>, <span style='color:orange;'>acne (orenji-ruvara)</span>, <span style='color:#BFEFFF;'>head lice nits (bhuruu-pale)</span>",
    dermoscopyHeading: 'Dermoskopi',
    dermoscopyText:
      '<strong><u>Bata Arclight polariser senge pen</u></strong>, tarisa: <strong>ABCDE</strong> (<em>Asymmetry</em>, <em>Border</em>, <em>Colour</em>, <em>Diameter &gt;6mm</em>, <em>Evolving</em>)<br>Dzidza: PDSBV (<em>Pigment network</em>, <em>Dots</em>, <em>Streaks</em>, <em>Blue-white</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Ziva chironda chako: chakajairika, <span style='color:red;'>chinofungidzirwa</span>, <span style='color:orange;'>chakarwadza</span><br>&gt;Dzidzira kazhinji&lt;",

    pageTitle_aboutAlan: 'NezvaAlan',
    aboutAlanText:
      'Alan ishini yeAI inobatsira mukutarisa ziso, nzeve uye ganda, yakavakirwa pamodeli yemutauro yepakutanga uye pfungwa dzemifananidzo. Inofungisisa. Inonyatsoremekedzwa. Yemazuva ano.<br><br>Ruzivo rwechiremba, rwemuno uye mifananidzo, rwakagadzirirwa mabasa akasiyana-siyana akadai sevashandi vezvehutano nevanoongorora. Hurukuro pfupi inoburitsa chirevo uye zano rekutarisira. Kushandiswa kweArclight kwakabatanidzwa zvizere.<br>',
    aboutAlanListItem1: 'Chivako cheunyanzvi – mamiriro ekunze echipisa/tropical',
    aboutAlanListItem2: 'Anoziva nezve Arclight',
    aboutAlanEfficient: '<strong>Inoshanda</strong> – mutauro mupfupi, wakapfava',
    aboutAlanEasy: '<strong>Zviri nyore kushandisa</strong> – app, inzwi, kuona',
    aboutAlanExplainable: '<strong>Zvinotsanangurwa</strong> – chokwadi/mitemo, mifananidzo',
    aboutAlanEncouraging: '<strong>Inokurudzira</strong> – tsitsi, mudzidzisi',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Zvirayiro',
    instructionsIntro:
      'Alan imubatsiri weAI wevadzidzi uye neavo vanowanzosangana nematambudziko emaonero, nzeve kana ganda zvishoma. Nyora kana kutaura zvakajeka uye dzivirira kupa mazita kana zvimwe zvinoratidza munhu. Tarisa zvizere musoro/viso/chikamu chemuviri uye ongorora maziso/nzeve ese maviri. Rombo rakanaka!',
    instructionsPatientPrompt: 'Taura kuna Alan nezvemurwere wako:',
    instructionsPatientDetail1: 'dambudziko uye kutanga',
    instructionsPatientDetail2: 'zvaunoona',
    instructionsPatientDetail3: 'kuona uye mapupil',
    instructionsPatientDetail4: 'zera, bonde, mushonga',
    instructionsUseArclight_default: 'Shandisa Arclight: pamberi, fundal reflex, kumashure kwemaziso.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Shandisa Arclight:</strong> <strong><em>pamberi, fundal reflex, kumashure kwemaziso.</em></strong>',
    instructionsTooLittle_eye: 'murume, maziso matsvuku, chii?',
    instructionsJustRight_eye:
      'Murume ane makore 25, maziso matsvuku kwemazuva 3. Hapana mushonga kana dambudziko remaziso kare. Kurwadziwa, kuchema kwemaziso, dot chena pa cornea. Mapupil akarongeka, kuona 6/12 uye 6/6 kune rimwe.',
    instructionsTooMuch_eye:
      "Murume uyu akasvika kukiriniki nhasi. Akapinda mudzimba achityaira, maziso ake matsvuku, iye anofunga kuti chikafu chaadya chiri kukanganisa maziso ake. Ndiri kuona kuchema kwemaziso uye mipendero matsvuku. Anoda rubatsiro—murume murefu, maziso anochema, akatya nezve cornea uye kurwadziwa. Anobvunza, 'Chii ichi?'",
    instructionsAdditionalQuery_eye: 'Alan anopindura mibvunzo yekudzidzisa nezvemaonero: Chii chinonzi Iritis? Ndingaona sei retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Shandisa Arclight:</strong> <strong><em>kutenderedza nzeve, canal, drum.</em></strong>',
    instructionsTooLittle_ear: 'murume, nzeve dzakatsvuka, chii?',
    instructionsJustRight_ear:
      'Murume ane makore 25, nzeve dzakatsvuka kwemazuva 3. Hapana mushonga kana dambudziko renzeve kare. Kurwadziwa, kubuda mvura mumenzeve. Drum tsvuku, kunzwa kwakaderera mumenzeve rimwe asi kwakajairika rumwe.',
    instructionsTooMuch_ear:
      "Murume uyu akasvika kukiriniki nhasi. Akapinda mudzimba aine nzeve dzakatsvuka, iye anofunga kuti chikafu chaadya chiri kukanganisa nzeve dzake. Ndiri kuona kubuda mvura uye mipendero matsvuku. Anoda rubatsiro—murume murefu, nzeve dzinochema, akatya nezvekunzwa uye kurwadziwa. Anobvunza, 'Chii ichi?'",
    instructionsAdditionalQuery_ear: 'Alan anopindura mibvunzo yekudzidzisa nezvenzeve: Chii chinonzi Otitis Media? Ndingaichenesa sei nzeve?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Shandisa Arclight:</strong> <strong><em>UV mwenje, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'murume, ganda matsvuku, chii?',
    instructionsJustRight_skin:
      'Murume ane makore 25, ganda rine dombo retsvuku kwemazuva 3. Hapana mushonga kana dambudziko reganda kare. Ganda rinorwadza uye rinorwadza.',
    instructionsTooMuch_skin:
      "Murume uyu akasvika kukiriniki nhasi. Akapinda mudzimba aine ganda matsvuku, iye anofunga kuti chikafu chaadya chiri kukanganisa ganda rake. Ndiri kuona kuchema kwemaziso uye mipendero matsvuku. Anoda rubatsiro—murume murefu, ganda matsvuku, akatya nezve pigment uye kusagadzikana. Anobvunza, 'Chii ichi?'",
    instructionsAdditionalQuery_skin: 'Alan anopindura mibvunzo yekudzidzisa nezveganda: Chii chinonzi Eczema? Ndingaona sei pigment network?',
    instructionsLabelTooLittle: 'Zvishoma',
    instructionsLabelJustRight: 'Zvakaringana',
    instructionsLabelTooMuch: 'Zvakawandisa',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ishini yeAI inobatsira vadzidzi uye avo vanowanzosangana nematambudziko emaonero, nzeve kana ganda. Nyora kana taura zvakajeka uye dzivisa kupa mazita kana zvimwe zvinozivikanwa.',
    goodLuck: 'Rombo rakanaka!',
    namePlaceholder: 'Zita',
    // rolePlaceholder: 'Basa',

    // --- NEW "Experience" Dropdown Translations (Needs review for Shona) ---
    experiencePlaceholder: 'Zviitiko',
    experienceStudentRefresher: 'Mudzidzi / Mutsva',
    experienceConfidentCore: 'Ruzivo rweMusimboti rwakavimbika',
    experienceExpert: 'Nyanzvi',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 gore',
    experienceOption2: '1-3 makore',
    experienceOption3: '3-7 makore',
    experienceOption4: '>7 makore',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Zvinangwa',
    aimsOption1: 'Pfungwa yechipiri',
    aimsOption2: 'Kutarisa chirwere',
    aimsOption3: 'Kutaurirana zviri nani',
    */
    contactPlaceholder: 'Bata (email/foni)',
    acceptButton: 'Gamuchira',

    images: "Mifananidzo",
    help: "Rubatsiro",
    screenshot: "Screenshot",
    refer: "Tumira",
    comingSoon: "Chiri kuuya nokukurumidza...",
  },

  // 20) Kinyarwanda - rw
  rw: {
    eyesEars: 'Amaso, Amatwi, Uruhu',
    goodHistory: 'Amateka Meza',
    examineWell: 'Suzuma Neza',
    useArclight: 'Koresha Arclight',
    howCanIHelp: 'Nakora iki kugufasha uyu munsi?',
    alanMistakes: `Alan ashobora gukosa. Koresha ubushishozi bw’ubuvuzi. ${new Date().getMonth() + 1}/25,`,
    login: 'Injira',
    enterPassword: 'Injiza Ijambo ry’Ibanga',
    register: 'Iyandikishe',
    name: 'Izina',
    password: 'Ijambo ry’Ibanga (imibare 4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Kinyarwanda) ---
    aimsPlaceholder: 'Intego',
    aimsEyes: 'Amaso',
    aimsEars: 'Amatwi',
    aimsSkin: 'Uruhu',
    aimsVeterinary: 'Amatungo',
    aimsChildMaternal: 'Umwana/Umubyeyi',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Umukozi w’Ubuzima',
    nurse: 'Umuforomo',
    ophthalmicOfficer: 'Ushinzwe Ubuvuzi bw’Amaso',
    medicalStudent: 'Umunyeshuri w’Ubuvuzi',
    physicianAssociate: 'Umufasha w’umuganga', 
    generalPractitioner: 'Umuganga Rusange',
    hospitalDoctor: 'Umuganga w’Ibitaro',
    ophthalmologist: 'Umuganga w’Amaso',
    optometrist: 'Umuganga w’Amaso',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Impuguke mu Matwi, Izuru n’Ijosi',
    pharmacist: 'Umucuruzi w’Imiti',
    audiologist: 'Impuguke mu By’Urwumva',
    earCarePractitioner: 'Uwitaho Amatwi',
    dermatologist: 'Umuganga w’Uruhu',
    */

    instructionsButton: 'Uko bikorwa',
    eyeButton: 'Ijisho',
    earButton: 'ugutwi',
    skinButton: 'uruhu',
    videosButton: 'Amashusho',
    atomsButton: 'Atoms',
    toolsButton: 'Ibikoresho',
    arclightProjectButton: 'Umushinga wa Arclight',
    linksButton: 'Ihuza',
    aboutButton: 'Ibyerekeye',

    passwordTitle: 'Injiza ijambo-banga ryo gutumirwa rya Alan',
    passwordPlaceholder: 'Ijambo-banga',
    passwordErrorMsg: 'Ijambo-banga ntabwo rikoreshwa. Ongera ugerageze',
    passwordSubmitBtn: 'Emeza',
    noCodeLine: "Nta kode cyangwa iribeshye? Twandikire <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>aha</a>",

    eyeMarqueeLine1: 'Glaucoma ni iki?',
    eyeMarqueeLine2: 'Nigute nabona optic disc ukoresheje Arclight?',
    eyeMarqueeLine3: 'Umugabo ufite imyaka 25, ijisho ritukura iminsi 3, gutinya urumuri, kureba kugabanuka gatoya',
    eyeMarqueeLine4: 'Mbwira kuri iritis',
    eyeMarqueeLine5: "Naba ngomba kohereza cataract y'umwana bwangu?",
    eyeMarqueeLine6: "Umugore ufite imyaka 65, kubona bike, nta gafasha k'amaso. Imbere y'ijisho imeze neza, lens yarijimye",
    eyeMarqueeLine7: "Nyina arahangayitse: umwana afite ishashi y'amaso yera, nta kureba mu jisho iryo",

    earMarqueeLine1: 'Otitis media ni iki?',
    earMarqueeLine2: "Nshobora kubona urupapuro rw'ugutwi (tympanic membrane) nkoresheje Arclight?",
    earMarqueeLine3: "Umusore w'imyaka 16, ububabare kuri pinna, iminsi 2, kumva byarazimye, ariko yumva neza",
    earMarqueeLine4: 'Mbwira ibyerekeye gushyira amazi mu gutwi (syringing)',
    earMarqueeLine5: 'Naba ngomba kohereza mastoiditis byihuse?',
    earMarqueeLine6: "Umugabo w'imyaka 73, yumva bitameze neza. Umuyoboro w'ugutwi ntiwagaragara neza, mbona cerumen gusa",
    earMarqueeLine7: 'Umwana ntasubiza ijwi. Hashize amezi menshi',

    userInfoTitle: "Amakuru y'Umukoresha",
    userName: 'Izina',
    userContact: 'Amakuru yo kuvugana',
    userRole: 'Inshingano',
    userAimsPopupLabel: "Intego",
    // userAims: 'Intego',
    userLatLong: 'Lat & Long',
    userArea: 'Agace',
    userCountry: 'Igihugu',
    userVersion: 'Icyiciro',
    userDateTime: 'Iminsi & Igihe',
    geolocationButton: 'Kumenya Aho Uri',
    geoInfoText:
      'Uko ukanze kuri "Kumenya Aho Uri", hazasangirwa aho uherereye neza (latitude/longitude). Ibi bifasha gutanga inama n\'amahitamo meza.',

    pageTitle_howToExamineEye: 'Uko wacukumbura ijisho',
    frontOfEyeHeading: "Igice cyo imbere cy'Ijisho",
    frontOfEyeText:
      "Reba ugereranye amaso: <em>by'ukuri,</em> <em>iburyo,</em> <em>ibumoso,</em> <em>hejuru,</em> hepfo<br><strong><u>Fata ube hafi</u></strong>. Saba: <em>amaboko y'ijisho,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Koreshya <span style='color: orange;'>fluro</span> ku bibazo bya cornea n'udukoko",
    fundalReflexHeading: 'Isubirizo rya Fundal',
    fundalReflexText:
      "Icyumba <em>cy'umwijima</em>, umwana arishimye; hafi y'intoki – gereranya isubirizo<br>Bisa: <em>Urumuri,</em> <em>Ibara,</em> <em>Isura</em><br>Gerageza hafi kugira ngo ubone ibisobanuro: <em>Ikimenyetso, cataract, RB, Vit Haem</em>",
    backOfEyeHeading: "Igice cyo inyuma cy'Ijisho",
    backOfEyeText:
      "Koresha ijisho ry'iburyo urebe ijisho ry'uruhande rw'umusuzumwe; ibumoso ku ibumoso<br>Umusuzumwe agomba kureba neza, ATARI mu rumuri; hafi ugishake optic disc (Dilate = isura nziza)<br>Suzuma disc: <em>Urupapuro,</em> <em>Ibara,</em> <em>Igikombe</em>. Kurikirana imiyoboro minini, hanyuma umusabe kureba neza mu rumuri kugira ngo abone macula",
    additionalText_eye:
      "Menya disc zawe: zisanzwe, <span style='color:red; font-weight:bold;'>zizanye uburibwe,</span> <span style='color:red;'>imiyoboro mishya,</span> <span style='color:orange;'>zifunganye,</span> <span style='color:green;'>zibaye ubururu</span><br>&gt;Itondere kenshi&lt;",

    pageTitle_howToExamineEar: 'Uko wacukumbura ikibuno',
    allAroundEarHeading: "Hafi y'ikibuno",
    allAroundEarText:
      'Reba: <em>pinna, </em><em>tragus, </em><em>mastoid</em> niba hari udusabo, ububabare cyangwa gusohora ibimera<br>Himura pinna gahoro, witondere ububabare',
    earCanalHeading: "Inzira y'ikibuno",
    earCanalText:
      'Bikanye umutwe, <strong><u>fata Arclight nko gufata ikaramu</u></strong><br>Hagarika pinna hejuru/inzira (abakuru) cyangwa hasi/inzira (abana)<br>Shyiramo speculum (4.5mm ku bakuru, 2.5mm ku bana), kanda utambuke imisatsi, ujugunye niba bikenewe<br>Shakisha: <em>umuse,</em> <em>ibisigazwa,</em> <em>uburwayi</em>',
    tympanicMembraneHeading: 'Igikoma cy\'ugutwi',
    tympanicMembraneText: 'Menya aho malleus ifashe, urumuri rugaragara, na attic<br>Reba: <em>ibara</em>, <em>umwanya</em>, <em>uko bigaragara</em><br>Reba niba hari umwenge, amazi cyangwa ibikomere',
    additionalText_ear:
      "Menya TM yawe: isanzwe, <span style='color:red; font-weight:bold;'>umutuku</span>, <span style='color:orange;'>yarazamutse</span>, <span style='color:green;'>yagarutse</span>, <span style='color:purple;'>yafunze</span><br>&gt;Imenyere buri gihe&lt;",

    pageTitle_howToExamineSkin: 'Uko wagenzura uruhu',
    generalObservationHeading: 'Kugenzura rusange',
    generalObservationText:
      "Reba uduhunda, <em>impinduka z’amarangi</em> ndetse n'ubusakare<br>Gorora buhoro kugira ngo umenye imiterere, ubushyuhe cyangwa ububabare",
    uvLightHeading: 'Umucyo wa UV (Wood’s)',
    uvLightText:
      "Mu cyumba kimeze mu mwijima, reba umucyo wihariye:<br><span style='color:teal;'>tinea (ubururu n’icyatsi)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (icyatsi-copper)</span>, <span style='color:#FF4040;'>erythrasma (umutuku wa coral)</span>, <span style='color:blue;'>vitiligo (ubururu-umweru)</span>, <span style='color:orange;'>acne (umutuku w’icunga)</span>, <span style='color:#BFEFFF;'>utunenge twa piyo (ubururu bworoshye)</span>",
    dermoscopyHeading: 'Dermoscopy',
    dermoscopyText:
      '<strong><u>Fata Arclight polariser nko gufata ikaramu</u></strong>, reba: <strong>ABCDE</strong> (<em>Ubudasa</em>, <em>Imipaka</em>, <em>Ibara</em>, <em>Diameter &gt;6mm</em>, <em>Irimo guhinduka</em>)<br>Soma: PDSBV (<em>Inshundura ya pigment</em>, <em>Amanota</em>, <em>Imirongo</em>, <em>Ubururu-umweru</em>, <em>Imiyoboro</em>)',
    additionalText_skin:
      "Menya agasohoka kawe: gasanzwe, <span style='color:red;'>gashidutse</span>, <span style='color:orange;'>kabyara ubushyuhe</span><br>&gt;Imenyere buri gihe&lt;",

    pageTitle_aboutAlan: 'Ibyerekeye Alan',
    aboutAlanText:
      'Alan ni umufasha w’ubwenge bwa mashini mu gupima amaso, amatwi n’uruhu, ugizwe n’imashini y’indimi n’ubwenge bushingiye ku bimenyetso. Uzi neza. Ukomeye. Uri ku rwego rwo hejuru.<br><br>Ubumenyi bw’ubuvuzi, ubw’aho n’amafoto bigenewe inshingano zitandukanye nka abakozi b’ubuzima n’abaganga b’ingenzi. Ikiganiro kigufi gitanga isuzuma n’ingamba z’imicungire. Gukoresha Arclight byashyizwe mu bikorwa hose.<br>',
    aboutAlanListItem1: 'Inyubako y’abahanga – ikirere cy’izuba/cy’akanyamuneza',
    aboutAlanListItem2: 'Azwi neza kuri Arclight',
    aboutAlanEfficient: '<strong>Ineza</strong> – amagambo magufi, yoroshye',
    aboutAlanEasy: '<strong>Byoroshye gukoresha</strong> – porogaramu, ijwi, kureba',
    aboutAlanExplainable: '<strong>Bisobanutse</strong> – ukuri/amategeko, amafoto',
    aboutAlanEncouraging: '<strong>Byongera imbaraga</strong> – impuhwe, umwigisha',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Amabwiriza',
    instructionsIntro:
      'Alan ni umufasha wa AI ku banyeshuri ndetse n’abahuye n’ibibazo by’amaso, amatwi cyangwa uruhu rimwe na rimwe. Andika cyangwa vuga neza, wirinde gutangaza amazina cyangwa ibisobanuro bishobora kumenyekana. Reba neza umutwe/ikibuno/igice cy’umubiri, ugenzure amaso/amatwi yombi. Mugire amahirwe masa!',
    instructionsPatientPrompt: 'Bwira Alan ku bijyanye n’umurwayi wawe:',
    instructionsPatientDetail1: 'ikibazo n’aho byatangiye',
    instructionsPatientDetail2: 'ibyo ubona',
    instructionsPatientDetail3: 'ubona n’amapupil',
    instructionsPatientDetail4: 'imyaka, igitsina, imiti',
    instructionsUseArclight_default: 'Koresha Arclight: imbere, reflex ya fundal, inyuma y’ijisho.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Koresha Arclight:</strong> <strong><em>imbere, reflex ya fundal, inyuma y’ijisho.</em></strong>',
    instructionsTooLittle_eye: 'Umugabo, ijisho ritukura, ni iki?',
    instructionsJustRight_eye:
      'Umugabo w’imyaka 25, ijisho ritukura mu minsi 3. Nta miti cyangwa ikibazo cy’ijisho cyigeze kibaho. Kubabara, amazi mu jisho, akantu keza ku kornea. Amapupil meza, ubona 6/12 na 6/6 ku rindi jisho.',
    instructionsTooMuch_eye:
      "Uyu mugabo yinjiye mu ivuriro uyu munsi. Yinjiye mu nyubako atwaye imodoka, ijisho rye ritukura, ubu aratekereza ko ibyo yariye biri kugira ingaruka ku jisho rye. Mboneye amazi n’ibice by’ijisho ritukura. Arashaka ubufasha—umugabo muremure, amaso abira, afite impungenge ku kornea no kubabara. Aravuga ati, 'Iki ni iki?'",
    instructionsAdditionalQuery_eye: 'Alan asubiza n’ibibazo by’uburezi ku jisho: Iki ni Iritis? Nakora nte ngo mbone retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Koresha Arclight:</strong> <strong><em>Hanze y’amatwi, canal, tympan.</em></strong>',
    instructionsTooLittle_ear: 'Umugabo, amatwi atukura, ni iki?',
    instructionsJustRight_ear:
      'Umugabo w’imyaka 25, amatwi atukura mu minsi 3. Nta miti cyangwa ikibazo cy’amatwi cyigeze kibaho. Kubabara, amazi aturuka mu matwi. Tympan itukura, kumva bigoye mu jwi rimwe ariko bisanzwe mu rindi.',
    instructionsTooMuch_ear:
      "Uyu mugabo yinjiye mu ivuriro uyu munsi. Yinjiye mu nyubako n’amatwi atukura, aratekereza ko ibyo yariye bigira ingaruka ku matwi ye. Mboneye amazi n’ibice bitukura. Arashaka ubufasha—umugabo muremure, amatwi anyerera, afite impungenge ku kumva no kubabara. Aravuga ati, 'Iki ni iki?'",
    instructionsAdditionalQuery_ear: 'Alan asubiza n’ibibazo by’uburezi ku matwi: Iki ni Otitis Media? Nakora nte ngo nisukure amatwi?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Koresha Arclight:</strong> <strong><em>urumuri rwa UV, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'Umugabo, uruhu rutukura, ni iki?',
    instructionsJustRight_skin:
      'Umugabo w’imyaka 25, akantu ku ruhu rutukura mu minsi 3. Nta miti cyangwa ikibazo cy’uruhu cyigeze kibaho. Uruhu ruraribwa kandi rworoshye.',
    instructionsTooMuch_skin:
      "Uyu mugabo yinjiye mu ivuriro uyu munsi. Yinjiye mu nyubako, uruhu rwe rutukura, aratekereza ko ibyo yariye bigira ingaruka ku ruhu. Mboneye amazi n’ibice bitukura. Arashaka ubufasha—umugabo muremure, uruhu rutukura, afite impungenge ku bijyanye na pigment no gucika intege. Aravuga ati, 'Iki ni iki?'",
    instructionsAdditionalQuery_skin: 'Alan asubiza n’ibibazo by’uburezi ku ruhu: Iki ni Eczema? Nakora nte ngo mbone réseau ya pigment?',
    instructionsLabelTooLittle: 'Buke cyane',
    instructionsLabelJustRight: 'Bihagije',
    instructionsLabelTooMuch: 'Byinshi cyane',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ni umufasha wa AI ku banyeshuri ndetse n’abahura n’ibibazo by’amaso, amatwi cyangwa uruhu rimwe na rimwe. Andika cyangwa uvuge neza kandi wirinde gutangaza amazina cyangwa ibisobanuro bishobora kumenyekana.',
    goodLuck: 'Ubeho neza!',
    namePlaceholder: 'Izina',
    // rolePlaceholder: 'Umwanya',

    // --- NEW "Experience" Dropdown Translations (Needs review for Kinyarwanda) ---
    experiencePlaceholder: 'Inararibonye',
    experienceStudentRefresher: 'Umunyeshuri / Ukuvugurura',
    experienceConfidentCore: 'Ubumenyi bw\'ibanze bwizewe',
    experienceExpert: 'Impuguke',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 umwaka',
    experienceOption2: '1-3 umwaka',
    experienceOption3: '3-7 umwaka',
    experienceOption4: '>7 umwaka',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Intego',
    aimsOption1: 'Inama ya kabiri',
    aimsOption2: 'Gushakisha ikibazo',
    aimsOption3: 'Kuganira neza',
    */
    contactPlaceholder: 'Tumenyeshe (imeyili/telefone)',
    acceptButton: 'Emeza',

    images: "Amafoto",
    help: "Ubufasha",
    screenshot: "Ifoto ya Ekrini",
    refer: "Ohereza",
    comingSoon: "Biraza vuba...",
  },

  // 21) Chichewa (Malawi) - ny
  ny: {
    eyesEars: 'Maso, Makutu, Khungu',
    goodHistory: 'Mbiri Yabwino',
    examineWell: 'Fufuzani Bwino',
    useArclight: 'Gwiritsani Ntchito Arclight',
    howCanIHelp: 'Ndingakuthandizeni bwanji lero?',
    alanMistakes: `Alan angalakwitse. Gwiritsani ntchito chiweruzo cha zamankhwala. ${new Date().getMonth() + 1}/25,`,
    login: 'Lowani',
    enterPassword: 'Lowetsani Chinsinsi',
    register: 'Lembetsani',
    name: 'Dzina',
    password: 'Chinsinsi (manambala 4)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Chichewa) ---
    aimsPlaceholder: 'Zolinga',
    aimsEyes: 'Maso',
    aimsEars: 'Makutu',
    aimsSkin: 'Khungu',
    aimsVeterinary: 'Ziweto',
    aimsChildMaternal: 'Ana/Amayi',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Wogwira Ntchito Zaumoyo',
    nurse: 'Namwino',
    ophthalmicOfficer: 'Ofesi ya Maso',
    medicalStudent: 'Wophunzira Zachipatala',
    physicianAssociate: 'Mnthandizi wa dokotala', 
    generalPractitioner: 'Dokotala Wamba',
    hospitalDoctor: 'Dokotala wa Chipatala',
    ophthalmologist: 'Dokotala wa Maso',
    optometrist: 'Nyanzvi za maso',
    orthoptist: 'Nyanzvi yokonza maonero',
    entSpecialist: 'Katswiri wa ENT',
    pharmacist: 'Wogwira Mankhwala',
    audiologist: 'Katswiri wa Kumva',
    earCarePractitioner: 'Wosamalira Khutu',
    dermatologist: 'Dokotala wa Khungu', 
    */

    instructionsButton: 'Momwe mungagwiritsire ntchito',
    eyeButton: 'Diso',
    earButton: 'Khutu',
    skinButton: 'Khungu',
    videosButton: 'Mavidiyo',
    atomsButton: 'Atoms',
    toolsButton: 'Zida',
    arclightProjectButton: 'Projekiti ya Arclight',
    linksButton: 'Maulalo',
    aboutButton: 'Zokhudza',

    passwordTitle: 'Lowetsani mawu obisika a Alan invitation',
    passwordPlaceholder: 'Mawu obisika',
    passwordErrorMsg: 'Mawu obisika sailakwa. Yesaninso',
    passwordSubmitBtn: 'Tumizani',
    noCodeLine: "Palibe kapena sailakwe? Lumikizanani nafe <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>apa</a>",

    eyeMarqueeLine1: 'Glaucoma ndi chiyani?',
    eyeMarqueeLine2: 'Ndingaone bwanji disiki ya maso (optic disc) pogwiritsa Arclight?',
    eyeMarqueeLine3: "Amuna 25, diso lofiira kwa masiku 3, mantha a kuwala, kuona kuli pansi pang'ono",
    eyeMarqueeLine4: 'Ndiwuzeni za iritis',
    eyeMarqueeLine5: 'Ndiyenera kutumiza cataract yobadwa nayo mwamsanga?',
    eyeMarqueeLine6: 'Mkazi 65, maso ofowoka, alibe magalasi. Gawo lakutsogolo lili bwino, lens yakhala mdima',
    eyeMarqueeLine7: 'Amayi akuda nkhawa: mwana ali ndi diso loyera, safi ra diso limenelo',

    earMarqueeLine1: 'Otitis media ndi chiyani?',
    earMarqueeLine2: 'Ndingaone bwanji membrani ya khutu kudzera pa Arclight?',
    earMarqueeLine3: 'Mnyamata 16, khutu likupweteka kwa masiku 2, kukutitcha, kumva kuli bwino',
    earMarqueeLine4: 'Ndiwuzeni za kusamba khutu (syringing)',
    earMarqueeLine5: 'Ndiyenera kutumiza mwamsanga mastoiditis?',
    earMarqueeLine6: 'Amuna 73, kumva kwake kufooka. Sindingaone bwino potsegula khutu, ndikuona phula lokha',
    earMarqueeLine7: 'Mwana sakuitanira mukumva mawu. Kwapitako miyezi ingapo',

    userInfoTitle: 'Zambiri za Wogwiritsa',
    userName: 'Dzina',
    userContact: 'Lumikizanani',
    userRole: 'Udindo',
    userAimsPopupLabel: "Zolinga",
    // userAims: 'Zolinga',
    userLatLong: 'Lat & Long',
    userArea: 'Malo',
    userCountry: 'Dziko',
    userVersion: 'Baibulo',
    userDateTime: 'Tsiku & Nthawi',
    geolocationButton: 'Kupeza Malo',
    geoInfoText:
      'Pomanga pa "Kupeza Malo", malo (latitude/longitude) omwe ndi koyenera adzasonyezedwe. Izi zimathandiza kupereka malangizo ndi zosankha zabwino.',

    pageTitle_howToExamineEye: 'Momwe Mungasonyeze Dziwitso',
    frontOfEyeHeading: 'Chikondi cha Dziwitso (Mbuyo)',
    frontOfEyeText:
      "Onani ndi kulinganiza maonekedwe: <em>zoyenera,</em> <em>kwoyangʼanira,</em> <em>kwosala,</em> <em>pazitsulo,</em> pansi<br><strong><u>Bwera pafupi ndikukhala wosamalira</u></strong>. Onani: <em>mapalpe,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Gwiritsani ntchito ndi <span style='color: orange;'>fluro</span> pa mavuto a cornea kapena kuwonongeka",
    fundalReflexHeading: 'Chidziwitso cha Fundal',
    fundalReflexText:
      'Chipinda <em>chosapereka kuwala</em>, mwana wokondwa; pa mtima mwa dzanja – kulinganiza chidziwezo<br>Chofanana: <em>Kuwala,</em> <em>Mtundu,</em> <em>Chimake</em><br>Fika pafupi kuti muwone zambiri: <em>Chizindikiro, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Chikondi cha Dziwitso (Chakumbuyo)',
    backOfEyeText:
      "Gwiritsani ntchito kuti muwone dzina la wosanjika; la kumanzere pa la manzere<br>Wosanjika ayenera kuwona mwambo, OSAYENDERA kuwala; bwirani pafupi ndikapeza optic disc (Dilate = kuwona bwino)<br>Dziwani disc: <em>Malire,</em> <em>Mtundu,</em> <em>Chikombe</em>. Tsatirani m'mitundu ya magazi, kenako pempho kwa wosanjika kuti aone macula",
    additionalText_eye:
      "Dziwani mayankho anu: achiwoneka, <span style='color:red; font-weight:bold;'>osafuka,</span> <span style='color:red;'>magazi atsopano,</span> <span style='color:orange;'>osamangidwa,</span> <span style='color:green;'>opanda kuwala</span><br>&gt;Phunzitsani nthawi zonse&lt;",

    pageTitle_howToExamineEar: 'Momwe Mungasonyeze Nzeve',
    allAroundEarHeading: 'Zambiri za nzeve',
    allAroundEarText:
      'Onani: <em>pinna, </em><em>tragus, </em><em>mastoid</em> kuti muwone ngati pali zolemera, kusadandaula kapena kusokoneza<br>Sungani pinna mosaphweka, onani ngati pali ululu',
    earCanalHeading: 'Njira ya nzeve',
    earCanalText:
      'Pangira mutu, <strong><u>kamata Arclight monga patani</u></strong><br>Dhonza pinna kupamwamba/ku chabe (aŵa akulu) kapena kupansi/ku chabe (ana)<br>Ikani speculum (4.5mm kwa akulu, 2.5mm kwa ana), panga nthawi kupeza, sinthani ngati zikufunika<br>Onani: <em>chikoma,</em> <em>zambiri,</em> <em>matenda</em>',
    tympanicMembraneHeading: 'Timpaniki Membreni',
    tympanicMembraneText: 'Zindikirani chogwirira cha malleus, kuwala kowala, ndi attic<br>Zindikirani: <em>mtundu</em>, <em>malo</em>, <em>kuwonekera</em><br>Yang\'anani ngati pali dzenje, madzi kapena zipsera',
    additionalText_ear:
      "Dziwani mayankho anu: achiwoneka, <span style='color:red; font-weight:bold;'>osafuka</span>, <span style='color:orange;'>magazi atsopano</span>, <span style='color:green;'>osamangidwa</span>, <span style='color:purple;'>opanda kuwala</span><br>&gt;Phunzitsani nthawi zonse&lt;",

    pageTitle_howToExamineSkin: 'Momwe Mungasonyeze Khungu',
    generalObservationHeading: 'Kuwerengera Wonse',
    generalObservationText:
      'Onani mapundu, <em>kusintha kwa mtundu</em> komanso kugawidwa<br>Pitani mwachikondi kuti mudziwe mawonekedwe, kutentha kapena kusowa mtima',
    uvLightHeading: 'Chiedza cha UV (Wood’s)',
    uvLightText:
      "Mu chipinda chokhala ndi umphawi, onani kuwonjezeka kwa mwala:<br><span style='color:teal;'>tinea (bluu-kijani)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (achikasu a copper)</span>, <span style='color:#FF4040;'>erythrasma (ofalikira)</span>, <span style='color:blue;'>vitiligo (bluu-oyera)</span>, <span style='color:orange;'>acne (ofalikira-orange)</span>, <span style='color:#BFEFFF;'>head lice nits (bluu-pale)</span>",
    dermoscopyHeading: 'Dermoscopy',
    dermoscopyText:
      '<strong><u>Gwiritsani ntchito Arclight polariser monga patani</u></strong>, onani: <strong>ABCDE</strong> (<em>Asymmetry</em>, <em>Border</em>, <em>Colour</em>, <em>Diameter &gt;6mm</em>, <em>Evolving</em>)<br>Phunzitsani: PDSBV (<em>Pigment network</em>, <em>Dots</em>, <em>Streaks</em>, <em>Blue-white</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Dziwani za lesion yanu: za normal, <span style='color:red;'>zoopseka</span>, <span style='color:orange;'>zopangitsa chisokonezo</span><br>&gt;Phunzitsani nthawi zonse&lt;",

    pageTitle_aboutAlan: 'Zokhudza Alan',
    aboutAlanText:
      'Alan ndi wothandizira wa AI pa kuchunguza maso, matamando ndi khungu, wokhazikitsidwa pa chitsanzo cha chinenero ndi njira za zifanizo. Wadzaza. Wofunikira. Watsopano.<br><br>Chidziwitso cha matibwino, cha mzinda ndi zithunzi, zimapangidwa kuti zikhale zofunikira kwa ntchito monga antchito aumoyo ndi odwala. Kukambirana kwachidule kumapangitsa chidziwitso ndi dongosolo la chithandizo. Kugwiritsa ntchito Arclight kwakhala kuli mkati mwa zonse.<br>',
    aboutAlanListItem1: 'Mphamvu ya akatswiri – mphepo ya tropical/ya kutentha',
    aboutAlanListItem2: 'Wodziwa za Arclight',
    aboutAlanEfficient: '<strong>Wothandiza</strong> – chinenero chachidule, chofunikira',
    aboutAlanEasy: '<strong>Zosavuta kugwiritsa ntchito</strong> – app, mawu, chithunzi',
    aboutAlanExplainable: '<strong>Zofotokozedwa</strong> – zenizeni/mitsogolo, zithunzi',
    aboutAlanEncouraging: '<strong>Zomwe zimakulimbikitsa</strong> – umboni, mphunzitsi',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Malangizo',
    instructionsIntro:
      "Alan ndi muthandizi wa AI kwa ophunzira ndi anthu amene nthawi zina amakhala ndi vutoli la maso, matamando kapena khungu. Lembani kapena fotokozani moyenera ndipo musakhale ndi zambiri zomwe zingabweretse kudziwika. Onani bwino chithunzi cha mutu/maso/chikamu cha thupi ndikuyang'ana maso/matamando awiri. Moni!",
    instructionsPatientPrompt: 'Lembani kwa Alan za zomwe zikuchitika kwa wosanjika wanu:',
    instructionsPatientDetail1: 'vuto ndi kuyamba',
    instructionsPatientDetail2: 'zomwe mumawona',
    instructionsPatientDetail3: 'maonero ndi pupil',
    instructionsPatientDetail4: 'ubale, mtundu, mankhwala',
    instructionsUseArclight_default: 'Gwiritsani ntchito Arclight: patsogolo, reflex ya fundal, pambuyo pa maso.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye:
      '<strong>Gwiritsani ntchito Arclight:</strong> <strong><em>patsogolo, reflex ya fundal, pambuyo pa maso.</em></strong>',
    instructionsTooLittle_eye: 'Munthu, maso ake akuda, chiyani?',
    instructionsJustRight_eye:
      'Munthu wa zaka 25, maso akuda kwa masiku 3. Palibe mankhwala kapena vutoli kale. Maumivu, kuchemka, dot woyera pa kornea. Pupil alili bwino, maonero 6/12 ndi 6/6 ena.',
    instructionsTooMuch_eye:
      "Munthu uyu analowa ku kliniki lero. Amadutsa mu nyumba, maso ake akuda, tsopano amaganiza kuti chakudya adyera chikukhalira maso ake. Ndikuona kuchemka ndi mapeto akuda. Akufuna thandizo—munthu wautali, maso opweteka, okhudzidwa ndi kornea ndi maumivu. Amasonyeza kuti, 'Chiyani ichi?'",
    instructionsAdditionalQuery_eye: 'Alan akuphunzitsa za maso: Chiyani Iritis? Ndingawonere bwanji retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Gwiritsani ntchito Arclight:</strong> <strong><em>zoseka, canal, tympan.</em></strong>',
    instructionsTooLittle_ear: 'Munthu, matamando akuda, chiyani?',
    instructionsJustRight_ear:
      "Munthu wa zaka 25, matamando akuda kwa masiku 3. Palibe mankhwala kapena vutoli kale. Maumivu, kuchoka kwa matamando. Tympan akuda, kumamva kumedewa m'matamando ena koma bwino m'matamando ena.",
    instructionsTooMuch_ear:
      "Munthu uyu analowa ku kliniki lero. Amadutsa mu nyumba ndi matamando akuda, tsopano amaganiza kuti chakudya adyera chikukhalira matamando ake. Ndikuona discharge ndi mapeto akuda. Akufuna thandizo—munthu wautali, matamando opweteka, okhudzidwa ndi kumamva ndi maumivu. Amasonyeza kuti, 'Chiyani ichi?'",
    instructionsAdditionalQuery_ear: 'Alan akuphunzitsa za matamando: Chiyani Otitis Media? Ndingasafitsire matamando bwanji?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Gwiritsani ntchito Arclight:</strong> <strong><em>chiedza cha UV, dermoscopy.</em></strong>',
    instructionsTooLittle_skin: 'Munthu, khungu akuda, chiyani?',
    instructionsJustRight_skin: 'Munthu wa zaka 25, khungu la khungu akuda kwa masiku 3. Palibe mankhwala kapena vutoli kale. Khungu likuvuta.',
    instructionsTooMuch_skin:
      "Munthu uyu analowa ku kliniki lero. Amadutsa mu nyumba ndi khungu akuda, tsopano amaganiza kuti chakudya adyera chikukhalira khungu lake. Ndikuona kuchemka ndi mapeto akuda. Akufuna thandizo—munthu wautali, khungu akuda, okhudzidwa ndi pigment ndi kusokoneza. Amasonyeza kuti, 'Chiyani ichi?'",
    instructionsAdditionalQuery_skin: 'Alan akuphunzitsa za khungu: Chiyani Eczema? Ndingawonere bwanji network ya pigment?',
    instructionsLabelTooLittle: 'Zochepa kwambiri',
    instructionsLabelJustRight: 'Zokwanira',
    instructionsLabelTooMuch: 'Zambiri kwambiri',

    // --- Onboarding Page Translations ---
    instructionText:
      'Alan ndi muthandizi wa AI kwa ophunzira ndi anthu amene nthawi zina amakhala ndi mavuto a maso, matamando kapena khungu. Lembani kapena fotokozani moyenera, ndipo musatengerepo mazina kapena zambiri zomwe zingadutse kudziwika. Onani bwino mutu, maso kapena mbali ya thupi, ndipo onani maso/matamando awiri. Moni!',
    goodLuck: 'Moni!',
    namePlaceholder: 'Dzina',
    // rolePlaceholder: 'Udindo',

    // --- NEW "Experience" Dropdown Translations (Needs review for Chichewa) ---
    experiencePlaceholder: 'Zachitika',
    experienceStudentRefresher: 'Wophunzira / Wotsitsimutsa',
    experienceConfidentCore: 'Chidziwitso Chokhazikika Chokhulupirira',
    experienceExpert: 'Katswiri',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 chaka',
    experienceOption2: '1-3 chaka',
    experienceOption3: '3-7 chaka',
    experienceOption4: '>7 chaka',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Zolinga',
    aimsOption1: 'Chofunikira cha awiri',
    aimsOption2: 'Kufufuza vuto',
    aimsOption3: 'Kufunikira kulankhulana bwino',
    */
    contactPlaceholder: 'Lumikizani (email/phone)',
    acceptButton: 'Chitira',

    images: "Zithunzi",
    help: "Thandizo",
    screenshot: "Chithunzi cha skirini",
    refer: "Tumizirani",
    comingSoon: "Kubwera posachedwa...",
  },

  // 22) Welsh - cy
  cy: {
    eyesEars: 'Llygaid, Clustiau, Croen',
    goodHistory: 'Hanes Da',
    examineWell: "Archwilio'n Dda",
    useArclight: 'Defnyddio Arclight',
    howCanIHelp: 'Sut gallai helpu chi heddiw?',
    alanMistakes: `Gall Alan wneud camgymeriadau. Defnyddiwch farn glinigol. ${new Date().getMonth() + 1}/25,`,
    login: 'Mewngofnodi',
    enterPassword: 'Rhowch Gyfrinair',
    register: 'Cofrestru',
    name: 'Enw',
    password: 'Cyfrinair (4 rhif)',

    // --- NEW "Aims" Dropdown Translations (Needs review for Welsh) ---
    aimsPlaceholder: 'Amcanion',
    aimsEyes: 'Llygaid',
    aimsEars: 'Clustiau',
    aimsSkin: 'Croen',
    aimsVeterinary: 'Milfeddygol',
    aimsChildMaternal: 'Plentyn/Mamolaeth',

    // --- Old Job Roles Commented Out ---
    /*
    healthWorker: 'Gweithiwr Iechyd',
    nurse: 'Nyrs',
    ophthalmicOfficer: 'Swyddog Clinigol Llygaid',
    medicalStudent: 'Myfyriwr Meddygol',
    physicianAssociate: 'Cymhorthydd Meddyg', 
    generalPractitioner: 'Ymarferydd Cyffredinol',
    hospitalDoctor: 'Doctor Ysbyty',
    ophthalmologist: 'Ophthalmolegydd',
    optometrist: 'Optometrydd',
    orthoptist: 'Orthoptist',
    entSpecialist: 'Arbenigwr ENT',
    pharmacist: 'Fferyllydd',
    audiologist: 'Awdiolegydd',
    earCarePractitioner: 'Ymarferydd Gofal Clust',
    dermatologist: 'Dermatolegydd', 
    */

    instructionsButton: 'Sut i ddefnyddio',
    eyeButton: 'Llygad',
    earButton: 'Clust',
    skinButton: 'Croen',
    videosButton: 'Fideos',
    atomsButton: 'Atoms',
    toolsButton: 'Offer',
    arclightProjectButton: 'Prosiect Arclight',
    linksButton: 'Dolenni',
    aboutButton: 'Amdanom',

    passwordTitle: 'Rhowch eich cyfrinair gwahoddiad Alan',
    passwordPlaceholder: 'Cyfrinair',
    passwordErrorMsg: 'Cyfrinair anghywir. Rhowch gynnig arall arni',
    passwordSubmitBtn: 'Gyflwyno',
    noCodeLine: "Dim côd neu côd anghywir? Cysylltwch â ni <a href='https://medicine.st-andrews.ac.uk/arclight/contact/' target='_blank'>yma</a>",

    eyeMarqueeLine1: 'Beth yw glawcoma?',
    eyeMarqueeLine2: "Sut gallaf weld y ddisg optig gyda'r Arclight?",
    eyeMarqueeLine3: 'Dyn 25 mlwydd oed, llygad coch am 3 diwrnod, ofn goleuni, VA wedi lleihau ychydig',
    eyeMarqueeLine4: 'Siaradwch â mi am Iritis',
    eyeMarqueeLine5: 'A ddylwn i gyfeirio cataract cynhenid ar frys?',
    eyeMarqueeLine6: 'Menyw 65 oed, golwg wael, dim sbectol. Blaen y llygad yn iawn, lens niwlog',
    eyeMarqueeLine7: 'Mam yn poeni: babi â phiwpwl gwyn, dim golwg yn y llygad hwnnw',

    earMarqueeLine1: 'Beth yw otitis media?',
    earMarqueeLine2: 'A allaf weld y bilen droellol (tympanic membrane) gyda fy Arclight?',
    earMarqueeLine3: 'Hogyn 16 oed, pinna boenus am 2 ddiwrnod, cosi, clyw da',
    earMarqueeLine4: "Siaradwch â mi am fflwsho'r glust (syringing)",
    earMarqueeLine5: 'A ddylwn i gyfeirio mastoiditis ar frys?',
    earMarqueeLine6: 'Dyn 73 oed, clyw wael. Ni welaf sianel y glust yn glir, dim ond cwyr',
    earMarqueeLine7: "Babi ddim yn ymateb i'r llais. Bu'n fisoedd",

    userInfoTitle: 'Gwybodaeth Defnyddiwr',
    userName: 'Enw',
    userContact: 'Cyswllt',
    userRole: 'Rôl',
    userAimsPopupLabel: "Amcanion",
    // userAims: 'Amcanion',
    userLatLong: 'Lat & Long',
    userArea: 'Ardal',
    userCountry: 'Gwlad',
    userVersion: 'Fersiwn',
    userDateTime: 'Dyddiad & Amser',
    geolocationButton: 'Lleoliad',
    geoInfoText:
      'Trwy glicio ar "Lleoliad", bydd lleoliad mwy manwl (hyd/orf) yn cael ei rannu. Mae hyn yn helpu i gynnig cyfarwyddiadau ac opsiynau gwell.',

    pageTitle_howToExamineEye: "Sut i archwilio'r llygad",
    frontOfEyeHeading: 'Rhag Llygad',
    frontOfEyeText:
      "Gwyliwch a chymharwch y llygaid: <em>syth,</em> <em>ar y dde,</em> <em>ar y chwith,</em> <em>i fyny,</em> i lawr<br><strong><u>Dal a chynhelwch yn agos</u></strong>. Archwiliwch: <em>plygellau,</em> <em>conjunctiva,</em> <em>cornea,</em> <em>pupil</em><br>Defnyddiwch gydag <span style='color: orange;'>fluro</span> ar gyfer ysbeidiau cornea neu lawr-gylchoedd",
    fundalReflexHeading: 'Adlewyrchiad Fundal',
    fundalReflexText:
      'Ystafell <em>tyner</em>, plentyn yn hapus; ar bellter braich – cymharwch adlewyrchiadau<br>Unrhyw un: <em>Disgleirdeb,</em> <em>Lliw,</em> <em>Siâp</em><br>Cymmerwch agos i weld manylion: <em>Marcio, cataract, RB, Vit Haem</em>',
    backOfEyeHeading: 'Cefn Llygad',
    backOfEyeText:
      "Defnyddiwch y llygad dde i weld llygad y claf ar y dde; chwith ar y chwith<br>Rhaid i'r claf edrych yn syth NA PHEN Y GWLÂN; cerdrawch yn agos a dod o hyd i'r disc optig (Dilate = gwelwch orau)<br>Astudewch y disc: <em>Ymylon,</em> <em>Lliw,</em> <em>Cwp</em>. Dilynwch y prif fadau, yna gofynnwch i'r claf edrych yn syth i'r golau i weld y macula",
    additionalText_eye:
      "Adnabod eich disciau: normal, <span style='color:red; font-weight:bold;'>llwys,</span> <span style='color:red;'>ffad,</span> <span style='color:orange;'>cwp,</span> <span style='color:green;'>lliwynn</span><br>>Ymarfer yn aml<",

    pageTitle_howToExamineEar: "Sut i archwilio'r clust",
    allAroundEarHeading: 'O amgylch y clust',
    allAroundEarText:
      'Gwirhewch: <em>clust allanol, </em><em>tragus, </em><em>mastoid</em> am guliau, teimladoldeb neu sychder<br>Symudwch y clust yn gynnil, sylwch ar unrhyw boen',
    earCanalHeading: 'Sianel y clust',
    earCanalText:
      "Cymryd y pen, <strong><u>dal Arclight fel ysgrifell</u></strong><br>Tynnu'r clust i fyny/yn ôl (ar gyfer oedolion) neu i lawr/yn ôl (ar gyfer plant)<br>Mewngofnodwch speculum (4.5mm i oedolion, 2.5mm i blant), gwthio drwg, troi os oes angen<br>Chwilio am: <em>cwmpas,</em> <em>gwasgedd,</em> <em>heint</em>",
    tympanicMembraneHeading: 'Bilen y glust',
    tympanicMembraneText: "Adnabod y ddolen malleus, adlewyrchiad golau, ac atig<br>Nodwch: <em>lliw</em>, <em>lleoliad</em>, <em>tryloywder</em><br>Chwiliwch am dyllu, hylif neu greithiau",
    additionalText_ear:
      "Adnabod eich TM: arferol, <span style='color:red; font-weight:bold;'>coch</span>, <span style='color:orange;'>ymgolli</span>, <span style='color:green;'>ailsefydlu</span>, <span style='color:purple;'>torri</span><br>>Ymarfer yn aml<",

    pageTitle_howToExamineSkin: "Sut i archwilio'r croen",
    generalObservationHeading: 'Sylw cyffredinol',
    generalObservationText: 'Archwiliwch ganghennau, <em>newidiadau lliw</em> a dosbarthiad<br>Teimlwch yn araf am strwythur, tymheredd neu deimlad',
    uvLightHeading: 'Lliw UV (Wood’s)',
    uvLightText:
      "Yn ystafell tywyll, gwirhewch am liw ffater arbennig:<br><span style='color:teal;'>tinea (glas-werdd)</span>, <span style='color:#FF7F50;'>pityriasis versicolor (oren-copper)</span>, <span style='color:#FF4040;'>erythrasma (coral-coch)</span>, <span style='color:blue;'>vitiligo (glas-llen)</span>, <span style='color:orange;'>acne (oren-coch)</span>, <span style='color:#BFEFFF;'>hlafell o glwst (glas-pale)</span>",
    dermoscopyHeading: 'Dermosgop',
    dermoscopyText:
      '<strong><u>Dal y polariser Arclight fel ysgrifell</u></strong>, gwirhewch: <strong>ABCDE</strong> (<em>Anymateb</em>, <em>Ymylon</em>, <em>Lliw</em>, <em>Diametr >6mm</em>, <em>Yn esblygu</em>)<br>Astudewch: PDSBV (<em>Rhwydwaith pigment</em>, <em>Ptiau</em>, <em>Llinellau</em>, <em>Glas-llen</em>, <em>Vascular</em>)',
    additionalText_skin:
      "Adnabod eich lesion: normal, <span style='color:red;'>amheus</span>, <span style='color:orange;'>yn llosgi</span><br>>Ymarfer yn aml<",

    pageTitle_aboutAlan: 'Ynghylch Alan',
    aboutAlanText:
      "Mae Alan yn gynorthwy-ydd diagnostig AI ar gyfer llygaid, clust a chroen, sy'n cyfuno model iaith sylfaenol a rhesymeg symbolaidd. Deallus. Difrifol. Ar flaen y technoleg.<br><br>Mae gwybodaeth glinigol, lleol a delweddau wedi'u teilwra i rolau megis gweithwyr iechyd a meddygon cyffredinol. Mae sgwrs gryno yn cynhyrchu diagnosis a chynllun rheoli. Mae defnydd o Arclight wedi'i mewnosod yn gyfan gwbl.<br>",
    aboutAlanListItem1: 'Sylfaen arbenigol – hinsawdd twrteg/tog',
    aboutAlanListItem2: 'Ymwybodol o Arclight',
    aboutAlanEfficient: '<strong>Efficient</strong> – iaith gryno ac syml',
    aboutAlanEasy: "<strong>Hawdd i'w ddefnyddio</strong> – app, llais, gweledol",
    aboutAlanExplainable: '<strong>Esbonadwy</strong> – ffeithiau/rheolau, delweddau',
    aboutAlanEncouraging: '<strong>Anogol</strong> – empathi, athro',
    aboutAlanDate: 'wjw Jan 25',

    instructionsPageTitle: 'Cyfarwyddiadau',
    instructionsIntro:
      "Mae Alan yn gynorthwy-ddiogel AI ar gyfer myfyrwyr ac eraill sy'n ymgysylltu â achosion llygaid, clust neu gre. Ysgrifennwch neu siaradwch yn glir ac osgoi datgelu enwau neu fanylion adnabod. Archwiliwch yn fanwl ben, wyneb neu ran o'r corff a gwirhewch ddwy lygaid neu glust. Pob lwc!",
    instructionsPatientPrompt: 'Dywedwch wrth Alan am gyflwr eich claf:',
    instructionsPatientDetail1: 'problem a dechrau',
    instructionsPatientDetail2: 'yr hyn rydych yn ei weld',
    instructionsPatientDetail3: 'gweledigaeth a phupils',
    instructionsPatientDetail4: 'oed, rhywedd, meddyginiaeth',
    instructionsUseArclight_default: 'Defnyddiwch Arclight: blaen, adlewyrchiad fundal, cefn y llygad.',
    instructionsBackground_eye: '#dfe7ff',
    instructionsUseArclight_eye: '<strong>Defnyddiwch Arclight:</strong> <strong><em>blaen, adlewyrchiad fundal, cefn y llygad.</em></strong>',
    instructionsTooLittle_eye: 'dyn, llygad coch, beth?',
    instructionsJustRight_eye:
      "Dyn 25 oed, llygad coch am 3 diwrnod. Dim meddyginiaeth na broblem llygad o'r blaen. Poen, llygad yn llifo, dot gwyn ar y cornea. Pupils yn iawn, gweledigaeth 6/12 a 6/6 ar y llygad arall.",
    instructionsTooMuch_eye:
      "Daeth y dyn hwn i glinig heddiw. Fe gyrruodd iddo mewn adeilad gyda llygad coch ac yn awr mae'n credu bod y bwyd a fwydwyd yn effeithio ar ei lygaid. Rwy'n gweld llygad yn llifo a ymylon coch. Mae angen cymorth arno—dyn tal, llygaid yn llifo, pryderol am y cornea a phroen. Mae'n gofyn, 'Beth yw hyn?'",
    instructionsAdditionalQuery_eye: 'Mae Alan hefyd yn ateb cwestiynau dysgu am lygaid: Beth yw Iritis? Sut y gallaf weld y retina?',
    instructionsBackground_ear: '#f2fff2',
    instructionsUseArclight_ear: '<strong>Defnyddiwch Arclight:</strong> <strong><em>o amgylch y clust, sianel, tympan.</em></strong>',
    instructionsTooLittle_ear: 'dyn, clust coch, beth?',
    instructionsJustRight_ear:
      "Dyn 25 oed, clust coch am 3 diwrnod. Dim meddyginiaeth na broblem clust o'r blaen. Poen, llif clust. Tympan coch, sain yn isel yn y clust gwael ond yn iawn yn y clust arall.",
    instructionsTooMuch_ear:
      "Daeth y dyn hwn i glinig heddiw. Fe gyrruodd iddo mewn adeilad gyda chlust coch ac mae'n credu bod y bwyd a fwydwyd yn effeithio ar ei glust. Rwy'n gweld llif clust a ymylon coch. Mae angen cymorth arno—dyn tal, clust yn llifo, pryderol am glywed a phroen. Mae'n gofyn, 'Beth yw hyn?'",
    instructionsAdditionalQuery_ear: 'Mae Alan hefyd yn ateb cwestiynau dysgu am glust: Beth yw Otitis Media? Sut y gallaf lanhau clust?',
    instructionsBackground_skin: '#fddfff',
    instructionsUseArclight_skin: '<strong>Defnyddiwch Arclight:</strong> <strong><em>Lliw UV, dermoscopi.</em></strong>',
    instructionsTooLittle_skin: 'dyn, croen coch, beth?',
    instructionsJustRight_skin:
      "Dyn 25 oed, patch croen coch am 3 diwrnod. Dim meddyginiaeth na broblem croen o'r blaen. Croen poenus ac yn cysgodol.",
    instructionsTooMuch_skin:
      "Daeth y dyn hwn i glinig heddiw. Fe gyrruodd iddo mewn adeilad gyda chroen coch ac mae'n credu bod y bwyd a fwydwyd yn effeithio ar ei chroen. Rwy'n gweld llif a ymylon coch. Mae angen cymorth arno—dyn tal, croen coch, pryderol am y rhwydwaith lliw a chymhelliant. Mae'n gofyn, 'Beth yw hyn?'",
    instructionsAdditionalQuery_skin:
      'Mae Alan hefyd yn ateb cwestiynau dysgu am gofod croen: Beth yw Eczema? Sut y gallaf weld y rhwydwaith pigmented?',
    instructionsLabelTooLittle: 'Rhy fach',
    instructionsLabelJustRight: 'Yn iawn',
    instructionsLabelTooMuch: 'Rhy fawr',

    // --- Onboarding Page Translations ---
    instructionText:
      "Alan yw cynorthwyydd AI ar gyfer myfyrwyr ac eraill sy'n wynebu achosion llygaid, clust neu gre achlysurol. Ysgrifennwch neu siaradwch yn glir ac osgoi datgelu enwau neu fanylion adnabod.",
    goodLuck: 'Pob lwc!',
    namePlaceholder: 'Enw',
    // rolePlaceholder: 'Rôl',

    // --- NEW "Experience" Dropdown Translations (Needs review for Welsh) ---
    experiencePlaceholder: 'Profiad',
    experienceStudentRefresher: 'Myfyriwr / Adnewyddu',
    experienceConfidentCore: 'Gwybodaeth graidd hyderus',
    experienceExpert: 'Arbenigwr',
    // --- Old Experience Options Commented Out ---
    /*
    experienceOption1: '<1 bl',
    experienceOption2: '1-3 bl',
    experienceOption3: '3-7 bl',
    experienceOption4: '>7 bl',
    */

    // --- Old "Aims" Button (multi-select checkboxes) Commented Out ---
    /*
    aimsButton: 'Nodau',
    aimsOption1: 'Achos yr ail farn',
    aimsOption2: 'Chwilio am gyflwr',
    aimsOption3: "Cysylltu'n well",
    */
    contactPlaceholder: 'Cysylltu (e-bost/ffôn)',
    acceptButton: 'Derbyn',

    images: "Delweddau",
    help: "Cymorth",
    screenshot: "Sgrinlun",
    refer: "Cyfeirio",
    comingSoon: "Ar ddod cyn bo hir..."
  }
};
window.translations = translations;