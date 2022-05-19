import { Injectable, Inject } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';
import { OpenTelemetryConfig, OTEL_CONFIG } from '../../../configuration/opentelemetry-config';
import { ZipkinExporter, ExporterConfig } from '@opentelemetry/exporter-zipkin';

/**
 * ZipkinExporterService class
 */
@Injectable({
  providedIn: 'root',
})
export class ZipkinExporterService implements IExporter {
  /**
   * zipkinConfig
   */
  private zipkinConfig: ExporterConfig;

  /**
   * constructor
   *
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OTEL_CONFIG) config: OpenTelemetryConfig) {
    this.zipkinConfig = {
      url: config.zipkinConfig?.url,
      headers: config.zipkinConfig?.headers
    };
  }

  /**
   * Return a ZipkinExporter configured with zipkinConfig field
   *
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ZipkinExporter(this.zipkinConfig);
  }
}
