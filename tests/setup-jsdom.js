// any DOM-related shims you need, e.g. canvas mocks
import 'jest-canvas-mock';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
