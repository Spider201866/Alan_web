// .eslintrc.js
module.exports = {
  // This tells ESLint to stop looking in parent folders for more configs
  root: true,

  // This defines the environments your code will run in.
  // 'browser: true' is for your front-end JS (like in index.html)
  // 'node: true' is for your back-end JS (server.js)
  // 'es2021: true' enables modern ECMAScript features
  env: {
    browser: true,
    node: true, // <--- This is the most important part for server.js
    es2021: true,
  },

  // This extends a recommended set of rules
  extends: 'eslint:recommended',

  // This section specifies parser options
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module', // Default to ES Modules for front-end code
  },

  // 'overrides' lets you apply different rules to different files
  overrides: [
    {
      // Target only your server.js file
      files: ['server.js'],
      // For this file, change the sourceType to 'script' (which means CommonJS)
      parserOptions: {
        sourceType: 'script', // <--- This is the magic bullet
      },
    },
    {
      // Target all JS files in public/ as ES modules
      files: ['public/**/*.js'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  ],

  // You can add or disable specific rules here if needed
  rules: {
    // Example: If you want to allow console.log in your server file
    'no-console': 'off',
  },
};
