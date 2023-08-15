import {
  OpenTelemetryConfig,
} from '../../src/lib/configuration/opentelemetry-config';


/**
 * @ignore
 */
export const otelcolExporterConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    logBody: true
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const otelcolExporterProductionConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    production: true,
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const otelcolExporterProductionAndBatchSpanProcessorConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    production: true,
  },
  batchSpanProcessorConfig: {
    maxExportBatchSize: '512',
    scheduledDelayMillis: '5000',
    exportTimeoutMillis: '30000',
    maxQueueSize: '2048',
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
  otelcolConfig: {
    url: 'http://localhost:4318/v1/traces',
  }
};

/**
 * @ignore
 */
export const otelcolExporterWithProbabilitySamplerAndCompositeConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    probabilitySampler: '0.7',
    resourceAttributes: {
      test: 'test'
    }
  },
  otelcolConfig: {
    url: 'http://localhost',
    concurrencyLimit: '10',
  },
};

/**
 * @ignore
 */
export const otelcolExporterWithProbabilitySamplerAtZeroAndCompositeConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    probabilitySampler: '0',
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
};

/**
 * @ignore
 */
export const otelcolExporterWithProbabilitySamplerAtTwoConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    probabilitySampler: '2',
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
export const zipkinConfig: OpenTelemetryConfig = {
  commonConfig: {
    production: false,
    serviceName: 'test',
  },
  zipkinConfig: {
    url: 'http://localhost',
    headers: { test: 'test' },
  }
};

/**
 * @ignore
 */
export const zipkinOtherConfig: OpenTelemetryConfig = {
  commonConfig: {
    production: false,
    serviceName: 'test',
  }
};

/**
 * @ignore
 */
export const jaegerPropagatorWithoutCustomHeaderConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
  },
};


/**
 * @ignore
 */
export const b3PropagatorMultiConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
  },
  otelcolConfig: {
    url: 'http://localhost',
  }
};

/**
 * @ignore
 */
export const b3PropagatorSingleConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
  },
  otelcolConfig: {
    url: 'http://localhost',
  },
  b3PropagatorConfig: {
    multiHeader: '0',
  }
};

/**
 * @ignore
 */
export const instrumentationConsoleOtelConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    production: false,
    probabilitySampler: '2',
  },
  otelcolConfig: {
    url: 'http://localhost',
  }
};

/**
 * @ignore
 */
 export const instrumentationConsoleOtelConfigSamplerOff: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: true,
    production: false,
    probabilitySampler: undefined,
  },
  otelcolConfig: {
    url: 'http://localhost',
  }
};

/**
 * @ignore
 */
export const instrumentationProductionOtelConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    console: false,
    production: true,
    probabilitySampler: '0.7',
    resourceAttributes: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'service.namespace' : 'test'
    }
  },
  otelcolConfig: {
    url: 'http://localhost',
    concurrencyLimit: '10',
  }
};

/**
 * @ignore
 */
 export const otelTraceparentIgnoreUrlsConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
    logBody: true
  },
  ignoreUrls: {
    urls: ['http://url.test.com']
  }
};
