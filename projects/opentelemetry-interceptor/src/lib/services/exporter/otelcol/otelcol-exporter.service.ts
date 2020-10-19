import { Injectable, Inject, Optional } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
  OTELCOL_LOGGER
} from '../../../configuration/opentelemetry-config';
import {
  CollectorTraceExporter,
  collectorTypes,
} from '@opentelemetry/exporter-collector';
import { Logger } from '@opentelemetry/api';

/**
 * OtelcolExporterService class
 */
@Injectable({
  providedIn: 'root',
})
export class OtelcolExporterService implements IExporter {
  /**
   * CollectorExporterConfigBase
   */
  private otelcolConfig: collectorTypes.CollectorExporterConfigBase;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   * @param logger Logger (Optional)
   */
  constructor(
    @Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig,
    @Optional() @Inject(OTELCOL_LOGGER) logger: Logger
  ) {
    this.otelcolConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.otelcolConfig?.url,
      headers: config.otelcolConfig?.headers,
      attributes: config.otelcolConfig?.attributes,
      logger,
    };
  }

  /**
   * Return a CollectorExporter with the configuration
   * @return a CollectorExporter
   */
  getExporter(): SpanExporter {
    return new CollectorTraceExporter(this.otelcolConfig);
  }
}
