/*
 * Sync onboarding/instructions intro strings across all languages.
 *
 * Goal: Keep all non-English translations aligned to the meaning of the
 * current English source of truth in `public/translations/en.json`.
 *
 * This script ONLY updates these keys:
 * - instructionText
 * - instructionsIntro
 */

const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join('public', 'translations');

const en = JSON.parse(fs.readFileSync(path.join(TRANSLATIONS_DIR, 'en.json'), 'utf8'));

/**
 * Best-effort, human-curated translations aligned to en.json meaning:
 * "AI learning tool", "Write clearly", "avoid identifying names or details",
 * and in `instructionsIntro` the extra examination guidance + "Good luck!".
 */
const updatesByLang = {
  am: {
    instructionText:
      'Alan ለተማሪዎች እና በአልፎ አልፎ የዓይን/ጆሮ/ቆዳ ኬሶችን የሚያዩ ሰዎች የAI መማሪያ መሳሪያ ነው። ግልጽ ይፃፉ እና ሰውን ሊያስለይ የሚችል ስም ወይም ዝርዝር አታስገቡ።',
    instructionsIntro:
      'Alan ለተማሪዎች እና በአልፎ አልፎ የዓይን/ጆሮ/ቆዳ ኬሶችን ብቻ ለሚያዩ ሰዎች የAI መማሪያ መሳሪያ ነው። ግልጽ ይፃፉ እና ሰውን ሊያስለይ የሚችል ስም ወይም ዝርዝር አታስገቡ። ራስ/ፊት/የሚመለከተውን የሰውነት ክፍል በሙሉ ይመልከቱ እና ሁለቱንም ዓይኖች/ጆሮዎች ይፈትኑ። መልካም እድል!'
  },
  ar: {
    instructionText:
      'آلان أداة تعلّم بالذكاء الاصطناعي للطلاب ولمن لا يرون إلا أحيانًا حالات العين أو الأذن أو الجلد. اكتب بوضوح وتجنب ذكر الأسماء أو التفاصيل المُعرِّفة.',
    instructionsIntro:
      'آلان أداة تعلّم بالذكاء الاصطناعي للطلاب ولمن لا يرون إلا أحيانًا حالات العين أو الأذن أو الجلد. اكتب بوضوح وتجنب ذكر الأسماء أو التفاصيل المُعرِّفة. افحص جيدًا الرأس/الوجه/الجزء المعني من الجسم وافحص كلا العينين/الأذنين. حظًا سعيدًا!'
  },
  bn: {
    instructionText:
      'Alan শিক্ষার্থীদের এবং যারা কেবল মাঝে মাঝে চোখ, কান বা ত্বকের কেস দেখেন তাদের জন্য একটি AI শেখার সরঞ্জাম। স্পষ্ট লিখুন এবং পরিচয়সূচক নাম বা তথ্য এড়িয়ে চলুন।',
    instructionsIntro:
      'Alan শিক্ষার্থীদের এবং যারা কেবল মাঝে মাঝে চোখ, কান বা ত্বকের কেস দেখেন তাদের জন্য একটি AI শেখার সরঞ্জাম। স্পষ্ট লিখুন এবং পরিচয়সূচক নাম বা তথ্য এড়িয়ে চলুন। মাথা/মুখ/শরীরের প্রাসঙ্গিক অংশটি পুরোপুরি দেখে নিন এবং দুই চোখ/কান পরীক্ষা করুন। শুভকামনা!'
  },
  cy: {
    instructionText:
      "Mae Alan yn offeryn dysgu AI ar gyfer myfyrwyr a'r rhai sy'n gweld achosion llygaid, clust neu groen ond o bryd i'w gilydd. Ysgrifennwch yn glir a pheidiwch â datgelu enwau na manylion adnabod.",
    instructionsIntro:
      "Mae Alan yn offeryn dysgu AI ar gyfer myfyrwyr a'r rhai sy'n gweld achosion llygaid, clust neu groen ond o bryd i'w gilydd. Ysgrifennwch yn glir a pheidiwch â datgelu enwau na manylion adnabod. Edrychwch yn ofalus o gwmpas y pen/wyneb/rhan o'r corff a gwirhewch y ddwy lygad/clust. Pob lwc!"
  },
  es: {
    instructionText:
      'Alan es una herramienta de aprendizaje basada en IA para estudiantes y para quienes solo ocasionalmente ven casos de ojos, oídos o piel. Escribe claramente y evita nombres o detalles identificativos.',
    instructionsIntro:
      'Alan es una herramienta de aprendizaje basada en IA para estudiantes y para quienes solo ocasionalmente ven casos de ojos, oídos o piel. Escribe claramente y evita nombres o detalles identificativos. Observa detenidamente la cabeza/cara/parte del cuerpo y examina ambos ojos/oídos. ¡Buena suerte!'
  },
  fa: {
    instructionText:
      'آلن یک ابزار یادگیریِ هوش مصنوعی برای دانشجویان و کسانی است که فقط گاهی با موارد چشم، گوش یا پوست روبه‌رو می‌شوند. واضح بنویسید و از ذکر نام یا جزئیات شناسایی‌کننده پرهیز کنید.',
    instructionsIntro:
      'آلن یک ابزار یادگیریِ هوش مصنوعی برای دانشجویان و کسانی است که فقط گاهی با موارد چشم، گوش یا پوست روبه‌رو می‌شوند. واضح بنویسید و از ذکر نام یا جزئیات شناسایی‌کننده پرهیز کنید. اطراف سر/صورت/بخش مربوطه را کامل بررسی کنید و هر دو چشم/گوش را معاینه کنید. موفق باشید!'
  },
  fr: {
    instructionText:
      "Alan est un outil d’apprentissage basé sur l’IA pour les étudiants et les personnes qui ne voient qu’occasionnellement des cas d’yeux, d’oreilles ou de peau. Écrivez clairement et évitez de mentionner des noms ou des détails permettant d’identifier quelqu’un.",
    instructionsIntro:
      "Alan est un outil d’apprentissage basé sur l’IA pour les étudiants et les personnes qui ne voient qu’occasionnellement des cas d’yeux, d’oreilles ou de peau. Écrivez clairement et évitez de mentionner des noms ou des détails permettant d’identifier quelqu’un. Examinez soigneusement la tête/le visage/la partie du corps concernée et examinez les deux yeux/oreilles. Bonne chance !"
  },
  ha: {
    instructionText:
      'Alan kayan koyon AI ne ga ɗalibai da waɗanda kawai lokaci-lokaci suke ganin matsalolin ido, kunne ko fata. Rubuta a sarari kuma ka guji ambaton sunaye ko bayanan da za su gane mutum.',
    instructionsIntro:
      'Alan kayan koyon AI ne ga ɗalibai da waɗanda kawai lokaci-lokaci suke ganin matsalolin ido, kunne ko fata. Rubuta a sarari kuma ka guji ambaton sunaye ko bayanan da za su gane mutum. Duba sosai a kewayen kai/fuska/ɓangaren jiki da abin ya shafa kuma ka binciki idanu/kunne duka biyun. Sa’a!'
  },
  hi: {
    instructionText:
      'Alan छात्रों और उन लोगों के लिए एक AI शिक्षण उपकरण है जो केवल कभी-कभार आंख, कान या त्वचा के मामलों को देखते हैं। कृपया स्पष्ट लिखें और पहचान बताने वाले नाम या विवरण न दें।',
    instructionsIntro:
      'Alan छात्रों और उन लोगों के लिए एक AI शिक्षण उपकरण है जो केवल कभी-कभार आंख, कान या त्वचा के मामलों को देखते हैं। स्पष्ट लिखें और पहचान बताने वाले नाम या विवरण न दें। सिर/चेहरे/शरीर के संबंधित भाग को पूरी तरह देखें और दोनों आंखें/कान जांचें। शुभकामनाएं!'
  },
  id: {
    instructionText:
      'Alan adalah alat pembelajaran AI untuk pelajar serta mereka yang hanya sesekali melihat kasus mata, telinga, atau kulit. Tulis dengan jelas dan hindari nama atau detail yang dapat mengidentifikasi.',
    instructionsIntro:
      'Alan adalah alat pembelajaran AI untuk pelajar serta mereka yang hanya sesekali melihat kasus mata, telinga, atau kulit. Tulis dengan jelas dan hindari nama atau detail yang dapat mengidentifikasi. Periksa seluruh kepala/wajah/bagian tubuh terkait dan periksa kedua mata/telinga. Semoga sukses!'
  },
  ig: {
    instructionText:
      'Alan bụ ngwá ọrụ ọmụmụ AI maka ụmụ akwụkwọ na ndị na-ahụ naanị mgbe ụfọdụ nsogbu anya, ntị ma ọ bụ akpụkpọ. Dee nke ọma ma zere itinye aha ma ọ bụ nkọwa na-akọwa onye ọrịa.',
    instructionsIntro:
      'Alan bụ ngwá ọrụ ọmụmụ AI maka ụmụ akwụkwọ na ndị na-ahụ naanị mgbe ụfọdụ nsogbu anya, ntị ma ọ bụ akpụkpọ. Dee nke ọma ma zere itinye aha ma ọ bụ nkọwa na-akọwa onye ọrịa. Lelee nke ọma gburugburu isi/ihu/akụkụ ahụ ma nyochaa anya/ntị abụọ. Chioma!'
  },
  ln: {
    instructionText:
      'Alan ezali esaleli ya koyekola ya AI mpo na ba étudiant mpe bato oyo bamonaka mbala moke makambo ya misu, matoyi to poso. Andika polele mpe koboya komonisa nkombo to makambo ya koyeba moto.',
    instructionsIntro:
      'Alan ezali esaleli ya koyekola ya AI mpo na ba étudiant mpe bato oyo bamonaka mbala moke makambo ya misu, matoyi to poso. Andika polele mpe koboya komonisa nkombo to makambo ya koyeba moto. Tala malamu zingazinga ya motó/elongi/eteni ya nzoto mpe tálá miso/matoyi nyonso mibale. Bolamu!'
  },
  ny: {
    instructionText:
      'Alan ndi chida chophunzirira cha AI kwa ophunzira ndi anthu omwe amaona nthawi ndi nthawi basi mavuto a maso, makutu kapena khungu. Lembani momveka bwino ndipo pewani kutchula mayina kapena zambiri zodziwitsa munthu.',
    instructionsIntro:
      'Alan ndi chida chophunzirira cha AI kwa ophunzira ndi anthu omwe amaona nthawi ndi nthawi basi mavuto a maso, makutu kapena khungu. Lembani momveka bwino ndipo pewani kutchula mayina kapena zambiri zodziwitsa munthu. Yang’anani bwino mutu/ nkhope/ gawo la thupi loyenera ndikuunika maso/makutu onse awiri. Mwayi wabwino!'
  },
  pt: {
    instructionText:
      'Alan é uma ferramenta de aprendizagem com IA para estudantes e para quem só ocasionalmente vê casos de olhos, ouvidos ou pele. Escreva claramente e evite nomes ou detalhes identificadores.',
    instructionsIntro:
      'Alan é uma ferramenta de aprendizagem com IA para estudantes e para quem só ocasionalmente vê casos de olhos, ouvidos ou pele. Escreva claramente e evite nomes ou detalhes identificadores. Observe bem cabeça/rosto/parte do corpo e examine ambos os olhos/ouvidos. Boa sorte!'
  },
  rw: {
    instructionText:
      'Alan ni igikoresho cyo kwiga gishingiye kuri AI kigenewe abanyeshuri n’abandi babona rimwe na rimwe gusa indwara z’amaso, amatwi cyangwa uruhu. Andika neza kandi wirinde kuvuga amazina cyangwa ibisobanuro biranga umuntu.',
    instructionsIntro:
      'Alan ni igikoresho cyo kwiga gishingiye kuri AI kigenewe abanyeshuri n’abandi babona rimwe na rimwe gusa indwara z’amaso, amatwi cyangwa uruhu. Andika neza kandi wirinde kuvuga amazina cyangwa ibisobanuro biranga umuntu. Reba neza umutwe/igisura/igice cy’umubiri kibangamiwe kandi ugenzure amaso/amatwi byombi. Murakagira amahirwe!'
  },
  sn: {
    instructionText:
      'Alan chishandiso chekudzidza cheAI chevadzidzi nevanoongorora nyaya dzemaziso, nzeve kana ganda dzinongoitika nguva nenguva. Nyora pachena uye dzivisa mazita kana ruzivo runozivisa munhu.',
    instructionsIntro:
      'Alan chishandiso chekudzidza cheAI chevadzidzi nevanoongorora nyaya dzemaziso, nzeve kana ganda dzinongoitika nguva nenguva. Nyora pachena uye dzivisa mazita kana ruzivo runozivisa munhu. Tarisa musoro/chiso/chikamu chemuviri zvizere uye ongorora maziso/nzeve mbiri. Rombo rakanaka!'
  },
  sw: {
    instructionText:
      'Alan ni chombo cha kujifunzia cha AI kwa wanafunzi na wale wanaoona mara chache tu kesi za macho, masikio au ngozi. Andika wazi, epuka majina au maelezo yanayomtambulisha mtu.',
    instructionsIntro:
      'Alan ni chombo cha kujifunzia cha AI kwa wanafunzi na wale wanaoona mara chache tu kesi za macho, masikio au ngozi. Andika wazi, epuka majina au maelezo yanayomtambulisha mtu. Angalia vizuri kichwa/uso/sehemu ya mwili husika na uchunguze macho/masikio yote mawili. Bahati njema!'
  },
  ur: {
    instructionText:
      'Alan طلباء اور ان افراد کیلئے ایک AI سیکھنے کا آلہ ہے جو صرف کبھی کبھار آنکھ، کان یا جلد کے کیس دیکھتے ہیں۔ واضح لکھیں اور شناخت ظاہر کرنے والے نام یا تفصیلات نہ دیں۔',
    instructionsIntro:
      'Alan طلباء اور ان افراد کیلئے ایک AI سیکھنے کا آلہ ہے جو صرف کبھی کبھار آنکھ، کان یا جلد کے کیس دیکھتے ہیں۔ واضح لکھیں اور شناخت ظاہر کرنے والے نام یا تفصیلات نہ دیں۔ سر/چہرہ/متعلقہ جسمانی حصے کو پوری طرح دیکھیں اور دونوں آنکھیں/کان معائنہ کریں۔ نیک تمنائیں!'
  },
  yo: {
    instructionText:
      'Alan jẹ́ irinṣẹ́ ẹ̀kọ́ AI fún akẹ́kọ̀ọ́ àti àwọn tí wọ́n ń rí ọ̀ràn ojú, etí tàbí awọ̀ lẹ́ẹ̀kọ̀ọ̀kan péré. Kọ kedere, má ṣe darukọ orúkọ tàbí àlàyé tó lè jẹ́ kó dá ẹni mọ̀.',
    instructionsIntro:
      'Alan jẹ́ irinṣẹ́ ẹ̀kọ́ AI fún akẹ́kọ̀ọ́ àti àwọn tí wọ́n ń rí ọ̀ràn ojú, etí tàbí awọ̀ lẹ́ẹ̀kọ̀ọ̀kan péré. Kọ kedere, má ṣe darukọ orúkọ tàbí àlàyé tó lè jẹ́ kó dá ẹni mọ̀. Wo gbogbo orí/ojú/apá ara dáadáa, kí o sì ṣàyẹ̀wò ojú/etí méjèèjì. Oríire!'
  },
  zh: {
    instructionText:
      'Alan 是一款面向学生及仅偶尔遇到眼、耳或皮肤病例者的 AI 学习工具。请清晰书写，并避免写出可识别身份的姓名或细节。',
    instructionsIntro:
      'Alan 是一款面向学生及仅偶尔遇到眼、耳或皮肤病例者的 AI 学习工具。请清晰书写，并避免写出可识别身份的姓名或细节。请全面查看头部/面部/相关部位，并检查双眼/双耳。祝你好运！'
  },
  zu: {
    instructionText:
      'Alan iyithuluzi lokufunda le-AI labafundi nalabo ababona ngezikhathi ezithile kuphela izimo zamehlo, izindlebe noma isikhumba. Bhala ngokusobala futhi ugweme amagama noma imininingwane ekwazi ukukhomba umuntu.',
    instructionsIntro:
      'Alan iyithuluzi lokufunda le-AI labafundi nalabo ababona ngezikhathi ezithile kuphela izimo zamehlo, izindlebe noma isikhumba. Bhala ngokusobala futhi ugweme amagama noma imininingwane ekwazi ukukhomba umuntu. Hlola kahle ikhanda/ubuso/ingxenye yomzimba ethintekile futhi uhlole amehlo/izindlebe zombili. Inhlanhla!'
  }
};

function assertEnglishKeys() {
  const required = ['instructionText', 'instructionsIntro'];
  for (const k of required) {
    if (typeof en[k] !== 'string' || !en[k].trim()) {
      throw new Error(`en.json missing required key/value: ${k}`);
    }
  }
}

function main() {
  assertEnglishKeys();

  const files = fs
    .readdirSync(TRANSLATIONS_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'en.json');

  const updated = [];
  const skipped = [];

  for (const file of files) {
    const lang = file.replace('.json', '');
    const update = updatesByLang[lang];
    if (!update) {
      skipped.push(lang);
      continue;
    }

    const filePath = path.join(TRANSLATIONS_DIR, file);
    const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    obj.instructionText = update.instructionText;
    obj.instructionsIntro = update.instructionsIntro;

    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf8');
    updated.push(lang);
  }

  // eslint-disable-next-line no-console
  console.log(`Updated: ${updated.sort().join(', ')}`);
  if (skipped.length) {
    // eslint-disable-next-line no-console
    console.log(`Skipped (no mapping): ${skipped.sort().join(', ')}`);
  }
}

main();

