module.exports = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/projects/opentelemetry-interceptor/setupJest.ts'
  ],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/opentelemetry-interceptor/',
    '<rootDir>/projects/instrumentation-example/',
    '<rootDir>/projects/interceptor-example/',
    '<rootDir>/cypress/'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/opentelemetry-interceptor/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        "before": [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer'
        ]
      }
    }
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};
