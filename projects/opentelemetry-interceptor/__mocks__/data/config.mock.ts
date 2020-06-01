import {
  OpenTelemetryConfig,
  Collector,
  Propagator,
} from '../../src/lib/configuration/opentelemetry-config';

/**
 * @ignore
 */
export const zipkinExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    collector: Collector.zipkin,
    propagator: Propagator.b3,
  },
  zipkinConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const otelcolExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    collector: Collector.otelcol,
    propagator: Propagator.httpTrace,
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const otelcolExporterWithoutUrlAndB3Config: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    collector: Collector.otelcol,
    propagator: Propagator.b3,
  },
};

/**
 * @ignore
 */
export const otelcolExporterWithProbabilitySamplerAndCompositeConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    collector: Collector.otelcol,
    propagator: Propagator.composite,
    probabilitySampler: 0.7,
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const jaegerExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    collector: Collector.jaeger,
  },
  jaegerConfig: {
    host: 'localhost',
    port: 6399,
  },
};

/**
 * @ignore
 */
export const jaegerPropagatorConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    propagator: Propagator.jaeger,
  },
  jaegerPropagatorConfig: {
    customHeader: 'custom-header-trace',
  },
};

/**
 * @ignore
 */
export const jaegerPropagatorWithoutCustomHeaderConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    propagator: Propagator.jaeger,
  },
};
