// jest.config.js
export default {
  testEnvironment: 'node', // Keep 'node' as JSDOM runs in Node
  clearMocks: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs', 'cjs'],
  // No transform property, relying on NODE_OPTIONS for ESM
  // extensionsToTreatAsEsm is not needed due to "type": "module"
};
