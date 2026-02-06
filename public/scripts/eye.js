// Alan UI - eye.js
import { initExamPage } from './exam-page-init.js';

initExamPage({
  pageTitleKey: 'pageTitle_howToExamineEye',
  sections: [
    {
      headingId: 'frontOfEyeHeading',
      headingKey: 'frontOfEyeHeading',
      headingFallback: 'Front of Eye',
      bodyId: 'frontOfEyeText',
      bodyKey: 'frontOfEyeText',
      bodyFallback: 'Default front of eye text.',
    },
    {
      headingId: 'fundalReflexHeading',
      headingKey: 'fundalReflexHeading',
      headingFallback: 'Fundal Reflex',
      bodyId: 'fundalReflexText',
      bodyKey: 'fundalReflexText',
      bodyFallback: 'Default fundal reflex text.',
    },
    {
      headingId: 'backOfEyeHeading',
      headingKey: 'backOfEyeHeading',
      headingFallback: 'Back of Eye',
      bodyId: 'backOfEyeText',
      bodyKey: 'backOfEyeText',
      bodyFallback: 'Default back of eye text.',
    },
  ],
  additionalTextKey: 'additionalText_eye',
  additionalTextFallback: 'Default additional eye text.',
});
