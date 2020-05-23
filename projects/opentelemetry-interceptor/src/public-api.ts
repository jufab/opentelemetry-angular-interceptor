/*
 * Public API Surface of opentelemetry-interceptor
 */

export { OpentelemetryInterceptorModule } from './lib/opentelemetry-interceptor.module';
export {
  Collector,
  Propagator,
  CommonCollectorConfig,
  JaegerCollectorConfig,
  ZipkinCollectorConfig,
  OtelCollectorConfig,
  OpentelemetryConfig,
} from './lib/configuration/opentelemetry-config';
