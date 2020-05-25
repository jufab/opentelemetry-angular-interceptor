import { Injectable, Inject } from '@angular/core';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { IExporter } from './exporter.interface';
import { SpanExporter, ConsoleSpanExporter } from '@opentelemetry/tracing';

/**
 * JaegerExporterService class
 * JaegerExporter isn't operationnal for the moment in web application.
 * it's present if one day..
 * For the moment return a ConsoleSpanExporter
 */
@Injectable({
  providedIn: 'root',
})
export class JaegerExporterService implements IExporter {
  // private configJaeger: ExporterConfig;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    /*this.configJaeger = {
      serviceName: config.commonConfig.serviceName,
      host: config.jaegerConfig.host,
      port: config.jaegerConfig.port,
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
