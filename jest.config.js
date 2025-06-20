// jest.config.js
export default {
  // Indicates that the environment is Node.js
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'mjs', 'cjs'],
  // Support for ES modules
  transform: {}, // Opt-out of Babel/transform for .js files if using native ESM
  // Or, if you need transforms for other things but want .js to be ESM:
  // transform: {
  //   '^.+\\.m?js$': 'babel-jest', // if you were using babel for ESM
  // },
  // Indicates whether each individual test should be reported during the run
  // verbose: true, // Already set in package.json script
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: ['/node_modules/'],
  // Use this pattern to match test files
  // testMatch: [
  //   '**/__tests__/**/*.[jt]s?(x)',
  //   '**/?(*.)+(spec|test).[tj]s?(x)'
  // ],
  // Setup files after env
  // setupFilesAfterEnv: ['./tests/setupTests.js'], // if you have one
  // Necessary for ES Modules support
  extensionsToTreatAsEsm: [], // .js is inferred from package.json type: "module", .mjs is always ESM
  // preset: undefined, // if you are not using a preset like ts-jest
};
