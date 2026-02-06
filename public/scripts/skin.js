// Alan UI - skin.js | 14th January 2026, WJW
import { initExamPage } from './exam-page-init.js';

initExamPage({
  pageTitleKey: 'pageTitle_howToExamineSkin',
  sections: [
    {
      headingId: 'generalObservationHeading',
      headingKey: 'generalObservationHeading',
      headingFallback: 'General observation',
      bodyId: 'generalObservationText',
      bodyKey: 'generalObservationText',
      bodyFallback: 'Default general observation text.',
    },
    {
      headingId: 'uvLightHeading',
      headingKey: 'uvLightHeading',
      headingFallback: 'UV (Wood\u2019s) light',
      bodyId: 'uvLightText',
      bodyKey: 'uvLightText',
      bodyFallback: 'Default UV light text.',
    },
    {
      headingId: 'dermoscopyHeading',
      headingKey: 'dermoscopyHeading',
      headingFallback: 'Dermoscopy',
      bodyId: 'dermoscopyText',
      bodyKey: 'dermoscopyText',
      bodyFallback: 'Default dermoscopy text.',
    },
  ],
  additionalTextKey: 'additionalText_skin',
  additionalTextFallback: 'Default additional skin text.',
});
