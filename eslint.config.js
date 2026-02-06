// eslint.config.js
// Configuration file for ESLint, defining the linting rules for the project.

import globals from 'globals';
import js from '@eslint/js';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  {
    ignores: ['dist/**'],
  },
  // Global configuration for all .js files (ES modules by default due to package.json "type": "module")
  {
    files: ['**/*.js'], // Targets ES module .js files
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        ...globals.browser, // For public/scripts/*.js
        ...globals.node, // For scripts that might run in Node.js environment if any
        // es2021 globals are generally included with ecmaVersion 12+
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-console': 'off', // Keep console logs for this project
    },
  },
  // Configuration for CommonJS files (.cjs)
  {
    files: ['**/*.cjs'], // Targets server.cjs, generate-hash.cjs
    languageOptions: {
      ecmaVersion: 12, // Or latest appropriate for CJS context
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-console': 'off',
    },
  },
  // Configuration for Jest test files
  {
    files: ['tests/**/*.js'], // Target test files
    ...eslintPluginJest.configs['flat/recommended'], // Apply Jest recommended rules
    languageOptions: {
      globals: {
        ...globals.jest, // Add Jest globals
      },
    },
    rules: {
      ...eslintPluginJest.configs['flat/recommended'].rules, // Include Jest plugin rules
      'no-unused-vars': 'error', // Maintain project's preference for no-unused-vars
      'prefer-const': 'error',
      'no-console': 'off', // Maintain project's preference for no-console
      // Add any specific Jest rule overrides here if needed
    },
  },
];
