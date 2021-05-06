/*
 * Public API Surface of opentelemetry-interceptor
 */
// Interceptor
export { OpenTelemetryInterceptorModule } from './lib/opentelemetry-interceptor.module';
// Exporter
export { OtelColExporterModule } from './lib/services/exporter/otelcol/otelcol-exporter.module';
export { ConsoleSpanExporterModule } from './lib/services/exporter/console/console-span-exporter.module';
export { ZipkinExporterModule } from './lib/services/exporter/zipkin/zipkin-exporter.module';
// Propagator
export { B3PropagatorModule } from './lib/services/propagator/b3-propagator/b3-propagator.module';
export { CompositePropagatorModule } from './lib/services/propagator/composite-propagator/composite-propagator.module';
export { HttpTraceContextPropagatorModule } from './lib/services/propagator/http-trace-context-propagator/http-trace-context-propagator.module';
// tslint:disable-next-line: max-line-length
export { JaegerHttpTracePropagatorModule } from './lib/services/propagator/jaeger-http-trace-propagator/jaeger-http-trace-propagator.module';
// tslint:enable-next-line: max-line-length
export { NoopTextMapPropagatorModule } from './lib/services/propagator/noop-http-text-propagator/noop-text-map-propagator.module';
//Component
export { OtelWebTracerModule } from './lib/otel-webtracer.module';
// Configuration
export {
  CommonCollectorConfig,
  BatchSpanProcessorConfig,
  OtelCollectorConfig,
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
  ZipkinCollectorConfig,
  JaegerPropagatorConfig,
  B3PropagatorConfig,
  InstrumentationConfig,
  OTELCOL_LOGGER,
  CUSTOM_SPAN
} from './lib/configuration/opentelemetry-config';
