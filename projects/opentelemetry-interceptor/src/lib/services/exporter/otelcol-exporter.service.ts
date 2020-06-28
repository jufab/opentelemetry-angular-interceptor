import { Injectable, Inject } from '@angular/core';
import { IExporter } from './exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import {
  CollectorExporter,
} from '@opentelemetry/exporter-collector';
import {
  CollectorExporterConfig,
} from '@opentelemetry/exporter-collector/build/src/platform/browser';

/**
 * OtelcolExporterService class
 */
@Injectable({
  providedIn: 'root',
})
export class OtelcolExporterService implements IExporter {
  /**
   * CollectorExporterConfig
   */
  private otelcolConfig: CollectorExporterConfig;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    this.otelcolConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.otelcolConfig?.url,
      headers: config.otelcolConfig?.headers,
    };
  }

  /**
   * Return a CollectorExporter with the configuration
   * @return a CollectorExporter
   */
  getExporter(): SpanExporter {
    return new CollectorExporter(this.otelcolConfig);
  }
}
