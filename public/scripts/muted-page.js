import log from './log.js';
import { mountMutedButtons } from './muted.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('muted-buttons-root');
  mountMutedButtons(root).catch((err) => {
    log.error('Failed to mount muted buttons page content:', err);
  });
});
