module.exports = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/projects/opentelemetry-interceptor/setupJest.ts'
  ],
  globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/opentelemetry-interceptor/',
    '<rootDir>/projects/instrumentation-example/',
    '<rootDir>/projects/interceptor-example/',
    '<rootDir>/cypress/'
  ],
  transform: {
    '^.+\\.tsx?$': ['jest-preset-angular', {
      tsconfig: '<rootDir>/projects/opentelemetry-interceptor/tsconfig.spec.json',
    }]
  }
};
