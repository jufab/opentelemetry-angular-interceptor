import { Injectable, Inject, Optional } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';
import {
  OpenTelemetryConfig,
  OTLP_CONFIG
} from '../../../configuration/opentelemetry-config';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPExporterConfigBase } from '@opentelemetry/exporter-trace-otlp-http/build/src/types';

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
  private otelcolConfig: OTLPExporterConfigBase;

  /**
   * constructor
   *
   * @param config OpenTelemetryConfig
   */
  constructor(
    @Inject(OTLP_CONFIG) config: OpenTelemetryConfig
  ) {
    this.otelcolConfig = {
      url: config.otelcolConfig?.url,
      headers: config.otelcolConfig?.headers,
      attributes: config.otelcolConfig?.attributes,
      concurrencyLimit: Number(config.otelcolConfig?.concurrencyLimit),
    };
  }

  /**
   * Return a CollectorExporter with the configuration
   *
   * @return a CollectorExporter
   */
  getExporter(): SpanExporter {
    return new OTLPTraceExporter(this.otelcolConfig);
  }
}
