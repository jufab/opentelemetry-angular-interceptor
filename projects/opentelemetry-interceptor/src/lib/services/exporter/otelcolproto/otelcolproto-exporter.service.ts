import { Injectable, Inject, Optional } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';
import {
  OpenTelemetryConfig,
  OTEL_CONFIG,
} from '../../../configuration/opentelemetry-config';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPExporterConfigBase } from '@opentelemetry/otlp-exporter-base';

/**
 * OtelcolProtoExporterService class
 */
@Injectable({
  providedIn: 'root',
})
export class OtelcolProtoExporterService implements IExporter {
  /**
   * CollectorExporterConfigBase
   */
  private otelcolConfig: OTLPExporterConfigBase;

  /**
   * constructor
   *
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OTEL_CONFIG) config: OpenTelemetryConfig) {
    this.otelcolConfig = {
      url: config.otelcolConfig?.url,
      headers: config.otelcolConfig?.headers,
      concurrencyLimit: Number(config.otelcolConfig?.concurrencyLimit),
      timeoutMillis: Number(config.otelcolConfig?.timeoutMillis),
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
