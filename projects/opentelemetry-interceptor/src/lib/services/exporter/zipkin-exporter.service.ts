import { Injectable, Inject } from '@angular/core';
import { IExporter } from './exporter.interface';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { SpanExporter, ConsoleSpanExporter } from '@opentelemetry/tracing';

/**
 * ZipkinExporter isn't operationnal for the moment in web application.
 * it's present if one day..
 */
@Injectable({
  providedIn: 'root',
})
export class ZipkinExporterService implements IExporter {
  // private zipkinConfig: ExporterConfig;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    /*this.zipkinConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.zipkinConfig.url,
    };*/
  }

  /**
   * Return for the moment a ConsoleSpanExporter
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ConsoleSpanExporter();
  }
}
