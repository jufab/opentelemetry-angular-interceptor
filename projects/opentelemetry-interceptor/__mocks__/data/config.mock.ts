import { OpentelemetryConfig, Collector, Propagator } from '../../src/lib/configuration/opentelemetry-config';

export const zipkinExporterConfig: OpentelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.zipkin,
    propagator: Propagator.b3,
  },
  zipkinConfig: {
    url: "http://localhost"
  }
};

export const otelcolExporterConfig: OpentelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.otelcol,
    propagator: Propagator.httpTrace,
  },
  otelcolConfig: {
    url: "http://localhost"
  }
};

export const jaegerExporterConfig: OpentelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.jaeger,
    propagator: Propagator.composite,
  },
  jaegerConfig: {
    host: "localhost",
    port: 6399
  }
};
