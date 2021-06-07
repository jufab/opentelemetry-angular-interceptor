import { LoggerConfig, NgxLoggerLevel } from 'ngx-logger';
import { DiagLogLevel } from '@opentelemetry/api';
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
      serviceName: 'interceptor-example', // Service name send in trace
      logBody: true, // true add body in a log, nothing otherwise
      probabilitySampler: '1', // 75% sampling
      logLevel: DiagLogLevel.ALL //ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
    },
    otelcolConfig: {
      url: 'http://127.0.0.1:55681/v1/traces', // URL of opentelemetry collector
      attributes: {
        "test": "test"
      }
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

