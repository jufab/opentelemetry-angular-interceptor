import { Injectable, Inject, Optional } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../../../configuration/opentelemetry-config';
import {
  CollectorTraceExporter
} from '@opentelemetry/exporter-collector/build/src/platform/browser';
import {
  CollectorExporterConfigBase,
} from '@opentelemetry/exporter-collector/build/src/types';
import { Logger } from '@opentelemetry/api';
import { OTELCOL_LOGGER } from '../../../configuration/opentelemetry-config';

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
  private otelcolConfig: CollectorExporterConfigBase;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   * @param logger Logger (Optional)
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig, @Optional() @Inject(OTELCOL_LOGGER) logger: Logger) {
    this.otelcolConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.otelcolConfig?.url,
      headers: config.otelcolConfig?.headers,
      attributes: config.otelcolConfig?.attributes,
      logger
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
