module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
  },
//  collectCoverageFrom: [
//    '**/*.js',
//    '!**/*.config.js',
//    '!dist/**',
//    '!coverage/**',
//    '!**/node_modules/**',
//  ],
}
