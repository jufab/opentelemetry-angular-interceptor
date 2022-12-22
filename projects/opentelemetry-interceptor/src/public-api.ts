/*
 * Public API Surface of opentelemetry-interceptor
 */
// Interceptor
export { OpenTelemetryInterceptorModule } from './lib/opentelemetry-interceptor.module';
export { OpenTelemetryHttpInterceptor } from './lib/interceptor/opentelemetry-http.interceptor';
// Exporter
export { OtelColExporterModule } from './lib/services/exporter/otelcol/otelcol-exporter.module';
export { OtelcolExporterService } from './lib/services/exporter/otelcol/otelcol-exporter.service';
export { ConsoleSpanExporterModule } from './lib/services/exporter/console/console-span-exporter.module';
export { ConsoleSpanExporterService } from './lib/services/exporter/console/console-span-exporter.service';
export { ZipkinExporterModule } from './lib/services/exporter/zipkin/zipkin-exporter.module';
export { ZipkinExporterService } from './lib/services/exporter/zipkin/zipkin-exporter.service';
export { NoopSpanExporterModule } from './lib/services/exporter/noop-exporter/noop-span-exporter.module';
export { NoopSpanExporterService } from './lib/services/exporter/noop-exporter/noop-span-exporter.service';
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
export { OtelWebTracerComponent } from './lib/component/otel-webtracer/otel-webtracer.component';

//Interface
export { CustomSpan } from './lib/interceptor/custom-span.interface';
export { OTEL_EXPORTER, IExporter } from './lib/services/exporter/exporter.interface';
export { OTEL_PROPAGATOR, IPropagator } from './lib/services/propagator/propagator.interface';

// Configuration
export {
  CommonCollectorConfig,
  BatchSpanProcessorConfig,
  OtelCollectorConfig,
  OpenTelemetryConfig,
  OTEL_CONFIG,
  ZipkinCollectorConfig,
  JaegerPropagatorConfig,
  B3PropagatorConfig,
  IgnoreUrlsConfig,
  OTEL_LOGGER,
  OTEL_CUSTOM_SPAN,
  OTEL_INSTRUMENTATION_PLUGINS
} from './lib/configuration/opentelemetry-config';
