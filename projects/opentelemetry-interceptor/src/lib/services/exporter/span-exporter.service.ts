import { SpanExporter } from '@opentelemetry/tracing';
import { IExporter } from './exporter.interface';
import { Injectable } from '@angular/core';
import { OpentelemetryInterceptorModule } from '../../opentelemetry-interceptor.module';
import { JaegerExporterService } from './jaeger-exporter.service';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';
import {
  OpentelemetryConfig,
  Collector,
  OpentelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';

@Injectable({
  providedIn: "root",
  useFactory: spanExporterServiceFactory,
  deps: [
    OpentelemetryInjectConfig,
    JaegerExporterService,
    OtelcolExporterService,
    ZipkinExporterService,
  ],
})
export class SpanExporterService implements IExporter {
  getExporter(): SpanExporter {
    //factory
    console.error("error");
    return undefined;
  }
}

export function spanExporterServiceFactory(
  config: OpentelemetryConfig,
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
