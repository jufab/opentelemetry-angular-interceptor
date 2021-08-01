module.exports = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/projects/opentelemetry-interceptor/setupJest.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/opentelemetry-interceptor/',
    '<rootDir>/projects/instrumentation-example/',
    '<rootDir>/projects/interceptor-example/',
    '<rootDir>/cypress/'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/opentelemetry-interceptor/tsconfig.spec.json'
    }
  }
};
