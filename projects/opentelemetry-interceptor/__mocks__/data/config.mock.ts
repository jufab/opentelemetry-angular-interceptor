import { OpenTelemetryConfig, Collector, Propagator } from '../../src/lib/configuration/opentelemetry-config';

/**
 * @ignore
 */
export const zipkinExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.zipkin,
    propagator: Propagator.b3,
  },
  zipkinConfig: {
    url: "http://localhost"
  }
};


/**
 * @ignore
 */
export const otelcolExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.otelcol,
    propagator: Propagator.httpTrace,
  },
  otelcolConfig: {
    url: "http://localhost"
  }
};


/**
 * @ignore
 */
export const jaegerExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.jaeger,
    propagator: Propagator.b3,
  },
  jaegerConfig: {
    host: "localhost",
    port: 6399
  }
};
