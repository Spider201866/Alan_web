// Alan UI - skin.js
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
      headingFallback: "Wood's lamp",
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
