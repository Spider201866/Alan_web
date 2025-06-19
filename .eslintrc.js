module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Add any specific rules or overrides here
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
};
