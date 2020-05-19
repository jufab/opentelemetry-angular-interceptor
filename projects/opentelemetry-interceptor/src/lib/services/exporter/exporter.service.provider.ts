import {
  OpentelemetryConfig,
  Collector,
  OpentelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { FactoryProvider } from '@angular/core';
import { JaegerExporterService } from './jaeger-exporter.service';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { IExporter } from './exporter.interface';
import { SpanExporterService } from './span-exporter.service';

export class ExporterServiceProvider implements FactoryProvider {
  provide: SpanExporterService;
  multi?: boolean = false;
  useFactory = (
    config: OpentelemetryConfig,
    jaegerExporterService: JaegerExporterService,
    otelcolExporterService: OtelcolExporterService,
    zipkinExporterService: ZipkinExporterService
  ) => {
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
    return new SpanExporterService(exporter?.getExporter());
  };
  deps = [
    OpentelemetryInjectConfig,
    JaegerExporterService,
    OtelcolExporterService,
    ZipkinExporterService,
  ];
}
