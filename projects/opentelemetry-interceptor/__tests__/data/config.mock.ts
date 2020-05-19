import { OpentelemetryConfig, Collector, Propagator } from 'projects/opentelemetry-interceptor/src/public-api';

export const zipkinExporterConfig: OpentelemetryConfig = {
  commonConfig: {
    serviceName: "test",
    collector: Collector.zipkin,
    propagator: Propagator.b3,
  },
  zipkinConfig: {
    url: "http://localhost"
  }
}
