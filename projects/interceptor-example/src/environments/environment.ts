import { INGXLoggerConfig, NgxLoggerLevel } from 'ngx-logger';
import { DiagLogLevel } from '@opentelemetry/api';
import { ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { OpenTelemetryConfig } from '../../../opentelemetry-interceptor/src/public-api';

interface IEnvironment {
  production: boolean;
  urlTest: string;
  openTelemetryConfig: OpenTelemetryConfig;
  loggerConfig: INGXLoggerConfig;
}

// Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200/api',
  openTelemetryConfig: {
    commonConfig: {
      console: true, // Display trace on console
      production: true, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'interceptor-example', // Service name send in trace
      resourceAttributes: {
        // extra resource attributes like service.namespace
        [ATTR_SERVICE_VERSION]: 'version 1.0.0', // Service version
      },
      logBody: true, // true add body in a log, nothing otherwise
      probabilitySampler: '1', // 75% sampling
      logLevel: DiagLogLevel.ALL, //ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
    },
    otelcolConfig: {
      url: 'http://127.0.0.1:4318/v1/traces', // URL of opentelemetry collector
      timeoutMillis: '10000',
    },
  },
  loggerConfig: {
    level: NgxLoggerLevel.DEBUG,
    disableConsoleLogging: false,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
