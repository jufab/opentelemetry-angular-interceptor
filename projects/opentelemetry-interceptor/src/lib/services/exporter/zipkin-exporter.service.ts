import { Injectable, Inject } from '@angular/core';
import { IExporter } from './exporter.interface';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { SpanExporter } from '@opentelemetry/tracing';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ExporterConfig } from '@opentelemetry/exporter-zipkin/build/src/types';

/**
 * ZipkinExporter with webpack...
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
    };
  }

  /**
   * Return for the moment a ConsoleSpanExporter
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ZipkinExporter(this.zipkinConfig);
  }
}
