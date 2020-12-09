import { Injectable, Inject } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import { OpenTelemetryConfig, OpenTelemetryInjectConfig } from '../../../configuration/opentelemetry-config';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ExporterConfig } from '@opentelemetry/exporter-zipkin/build/src/types';

/**
 * ZipkinExporterService class
 */
@Injectable({
  providedIn: 'root',
})
export class ZipkinExporterService implements IExporter {
  private zipkinConfig: ExporterConfig;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    this.zipkinConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.zipkinConfig?.url,
      headers: config.zipkinConfig?.headers
    };
  }

  /**
   * Return a ZipkinExporter configured with zipkinConfig field
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ZipkinExporter(this.zipkinConfig);
  }
}
