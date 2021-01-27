module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
  },
}
