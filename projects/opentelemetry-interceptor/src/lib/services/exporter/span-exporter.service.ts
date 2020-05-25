import { SpanExporter } from '@opentelemetry/tracing';
import { IExporter } from './exporter.interface';
import { Injectable } from '@angular/core';
import { JaegerExporterService } from './jaeger-exporter.service';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';
import {
  OpenTelemetryConfig,
  Collector,
  OpenTelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';

/**
 * An Angular Factory to have the configured collector
 */
@Injectable({
  providedIn: 'root',
  useFactory: spanExporterServiceFactory,
  deps: [
    OpenTelemetryInjectConfig,
    JaegerExporterService,
    OtelcolExporterService,
    ZipkinExporterService,
  ],
})
export class SpanExporterService implements IExporter {
  /**
   * Not used in a factory, just a definition
   */
  getExporter(): SpanExporter {
    // factory
    console.error('error');
    return undefined;
  }
}

/**
 * Factory to return Service configured
 * @param config config
 * @param jaegerExporterService jaeger
 * @param otelcolExporterService otelcol
 * @param zipkinExporterService zipkin
 */
export function spanExporterServiceFactory(
  config: OpenTelemetryConfig,
  jaegerExporterService: JaegerExporterService,
  otelcolExporterService: OtelcolExporterService,
  zipkinExporterService: ZipkinExporterService
) {
  let exporter: IExporter = null;
  switch (config.commonConfig.collector) {
    case Collector.jaeger:
      exporter = jaegerExporterService;
      break;
    case Collector.otelcol:
      exporter = otelcolExporterService;
      break;
    case Collector.zipkin:
      exporter = zipkinExporterService;
      break;
    default:
      break;
  }
  return exporter;
}
