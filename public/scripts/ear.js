// Alan UI - ear.js
import { initExamPage } from './exam-page-init.js';

initExamPage({
  pageTitleKey: 'pageTitle_howToExamineEar',
  sections: [
    {
      headingId: 'allAroundEarHeading',
      headingKey: 'allAroundEarHeading',
      headingFallback: 'All around ear',
      bodyId: 'allAroundEarText',
      bodyKey: 'allAroundEarText',
      bodyFallback: 'Default all around ear text.',
    },
    {
      headingId: 'earCanalHeading',
      headingKey: 'earCanalHeading',
      headingFallback: 'Ear canal',
      bodyId: 'earCanalText',
      bodyKey: 'earCanalText',
      bodyFallback: 'Default ear canal text.',
    },
    {
      headingId: 'tympanicMembraneHeading',
      headingKey: 'tympanicMembraneHeading',
      headingFallback: 'Tympanic membrane',
      bodyId: 'tympanicMembraneText',
      bodyKey: 'tympanicMembraneText',
      bodyFallback: 'Default tympanic membrane text.',
    },
  ],
  additionalTextKey: 'additionalText_ear',
  additionalTextFallback: 'Default additional ear text.',
});
