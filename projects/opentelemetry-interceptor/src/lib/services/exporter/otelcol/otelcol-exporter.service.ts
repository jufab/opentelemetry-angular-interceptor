import { Injectable, Inject, Optional } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig
} from '../../../configuration/opentelemetry-config';
import {
  CollectorTraceExporter,
  collectorTypes,
} from '@opentelemetry/exporter-collector';

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
   */
  constructor(
    @Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig
  ) {
    this.otelcolConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.otelcolConfig?.url,
      headers: config.otelcolConfig?.headers,
      attributes: config.otelcolConfig?.attributes
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
