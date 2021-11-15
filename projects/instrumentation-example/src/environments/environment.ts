import {
  OpenTelemetryConfig
} from '../../../opentelemetry-interceptor/src/public-api';

interface IEnvironment {
  production: boolean;
  urlTest: string;
  urlOtelConfig: string;
  openTelemetryConfig?: OpenTelemetryConfig;
}

// Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200/api',
  urlOtelConfig: 'http://localhost:4200/api/config',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
