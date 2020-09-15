import { LoggerConfig, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import {
  OpenTelemetryConfig
} from '../../../opentelemetry-interceptor/src/public-api';

interface IEnvironment {
  production: boolean;
  urlTest: string;
  openTelemetryConfig: OpenTelemetryConfig;
  loggerConfig: LoggerConfig;
}

// Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200/api',
  openTelemetryConfig: {
    commonConfig: {
      console: true, // Display trace on console
      production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'example-app', // Service name send in trace
      probabilitySampler: '1' // 75% sampling
    },
    otelcolConfig: {
      url: 'http://localhost:55681/v1/trace', // URL of opentelemetry collector
    }
  },
  loggerConfig: {
    level: NgxLoggerLevel.DEBUG,
    disableConsoleLogging: false,
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
