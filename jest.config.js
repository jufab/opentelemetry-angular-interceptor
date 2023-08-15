globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: '<rootDir>/projects/opentelemetry-interceptor/tsconfig.spec.json', // this is the project root tsconfig
};


module.exports = {
  verbose: false,
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/projects/opentelemetry-interceptor/src'],
  coverageReporters: ['lcov', ['text', { skipFull: true }]],
  reporters: [
    ['github-actions', { silent: false }],
    'summary',
    ["jest-html-reporters", {
      publicPath: "./jest-report",
      filename: "report.html",
    }],
    ['jest-junit', {
      outputDirectory: '<rootDir>/jest-report',
      outputName: "jest-junit.xml",
      suiteNameTemplate: "opentelemetry-angular-interceptor",

    }]
  ],
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
