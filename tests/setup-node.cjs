// polyfill TextEncoder for Node
const { TextEncoder } = require('util');
global.TextEncoder = TextEncoder;
