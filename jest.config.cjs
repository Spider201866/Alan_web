module.exports = {
  projects: [
    {
      displayName: 'api',
      testMatch: ['<rootDir>/tests/api/**/*.test.js'],
      testEnvironment: 'node',
      setupFiles: ['<rootDir>/tests/setup-node.cjs']
    },
    {
      displayName: 'ui',
      testMatch: ['<rootDir>/tests/ui/**/*.test.js'],
      testEnvironment: 'jsdom',
      setupFiles: ['<rootDir>/tests/setup-jsdom.js'],
      transform: { '^.+\\.jsx?$': 'babel-jest' }
    }
  ]
};
