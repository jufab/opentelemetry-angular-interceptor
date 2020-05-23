/*
 * Public API Surface of opentelemetry-interceptor
 */

export { OpenTelemetryInterceptorModule } from './lib/opentelemetry-interceptor.module';
export {
  Collector,
  Propagator,
  CommonCollectorConfig,
  JaegerCollectorConfig,
  ZipkinCollectorConfig,
  OtelCollectorConfig,
  OpenTelemetryConfig,
} from './lib/configuration/opentelemetry-config';
