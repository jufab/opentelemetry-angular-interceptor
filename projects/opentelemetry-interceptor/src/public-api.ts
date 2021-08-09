import { CustomSpan } from './lib/interceptor/custom-span.interface';
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
/* eslint-disable max-len */
export { HttpTraceContextPropagatorModule } from './lib/services/propagator/http-trace-context-propagator/http-trace-context-propagator.module';
export { JaegerHttpTracePropagatorModule } from './lib/services/propagator/jaeger-http-trace-propagator/jaeger-http-trace-propagator.module';
/* eslint-enable max-len */
export { NoopTextMapPropagatorModule } from './lib/services/propagator/noop-http-text-propagator/noop-text-map-propagator.module';
//Component
export { OtelWebTracerModule } from './lib/otel-webtracer.module';
//Interface
export { CustomSpan } from './lib/interceptor/custom-span.interface';
// Configuration
export {
  CommonCollectorConfig,
  BatchSpanProcessorConfig,
  OtelCollectorConfig,
  OpenTelemetryConfig,
  OTELCOL_CONFIG as OpenTelemetryInjectConfig,
  ZipkinCollectorConfig,
  JaegerPropagatorConfig,
  B3PropagatorConfig,
  InstrumentationConfig,
  OTELCOL_LOGGER,
  CUSTOM_SPAN
} from './lib/configuration/opentelemetry-config';
