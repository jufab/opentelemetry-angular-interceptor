import { CustomSpan } from './lib/interceptor/custom-span.interface';
import { OTLP_EXPORTER, IExporter } from './lib/services/exporter/exporter.interface';
import { OTLP_PROPAGATOR, IPropagator } from './lib/services/propagator/propagator.interface';
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
export { AwsXrayPropagatorModule } from './lib/services/propagator/aws-xray-propagator/aws-xray-propagator.module';
/* eslint-disable max-len */
export { W3CTraceContextPropagatorModule } from './lib/services/propagator/w3c-trace-context-propagator/w3c-trace-context-propagator.module';
export { JaegerHttpTracePropagatorModule } from './lib/services/propagator/jaeger-http-trace-propagator/jaeger-http-trace-propagator.module';
/* eslint-enable max-len */
export { NoopTextMapPropagatorModule } from './lib/services/propagator/noop-http-text-propagator/noop-text-map-propagator.module';
//Component
export { OtelWebTracerModule } from './lib/otel-webtracer.module';
//Interface
export { CustomSpan } from './lib/interceptor/custom-span.interface';
export { OTLP_EXPORTER, IExporter} from './lib/services/exporter/exporter.interface';
export { OTLP_PROPAGATOR, IPropagator} from './lib/services/propagator/propagator.interface';

// Configuration
export {
  CommonCollectorConfig,
  BatchSpanProcessorConfig,
  OtelCollectorConfig,
  OpenTelemetryConfig,
  OTLP_CONFIG,
  ZipkinCollectorConfig,
  JaegerPropagatorConfig,
  B3PropagatorConfig,
  InstrumentationConfig,
  OTLP_LOGGER,
  CUSTOM_SPAN
} from './lib/configuration/opentelemetry-config';
