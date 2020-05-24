import {
  OpenTelemetryConfig,
  Collector,
  Propagator,
} from '../../../opentelemetry-interceptor/src/public-api';

interface IEnvironment {
  production: boolean;
  urlTest: string;
  openTelemetryConfig: OpenTelemetryConfig;
}

//Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200/api',
  openTelemetryConfig: {
    commonConfig: {
      console: true, //Display trace on console
      production: false, //Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'example-app', //Service name send in trace
      collector: Collector.otelcol, //Enum to specified the collector : OpenTelemetry Collector(otelcol), Zipkin (zipkin), Jaeger (jaeger)
      propagator: Propagator.b3, //Enum to propagator : B3 (b3), HttpTraceContext (httpTrace)
    },
    otelcolConfig: {
      url: 'http://localhost:9090/v1/trace', //URL of opentelemetry collector
    },
    zipkinConfig: {
      url: 'http://localhost:9411/api/v2/spans',
    },
    jaegerConfig: {
      host: 'localhost',
      port: 6832,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
