// polyfill TextEncoder for Node
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
