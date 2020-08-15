import {
  OpenTelemetryConfig,
} from '../../src/lib/configuration/opentelemetry-config';


/**
 * @ignore
 */
export const otelcolExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
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
  },
};

/**
 * @ignore
 */
export const otelcolExporterWithProbabilitySamplerAndCompositeConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    probabilitySampler: 0.7,
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const otelcolExporterWithProbabilitySamplerAtZeroAndCompositeConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    probabilitySampler: 0,
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};


/**
 * @ignore
 */
export const jaegerPropagatorConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
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
  },
};
