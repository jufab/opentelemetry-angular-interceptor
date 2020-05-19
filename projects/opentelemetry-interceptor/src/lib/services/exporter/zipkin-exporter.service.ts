import { Injectable, Inject } from '@angular/core';
import { IExporter } from './exporter.interface';
import {
  OpentelemetryConfig,
  OpentelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { SpanExporter, ConsoleSpanExporter } from '@opentelemetry/tracing';

@Injectable({
  providedIn: "root"
})
export class ZipkinExporterService implements IExporter {
  //private zipkinConfig: ExporterConfig;

  constructor(@Inject(OpentelemetryInjectConfig) config: OpentelemetryConfig) {
    /*this.zipkinConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.zipkinConfig.url,
    };*/
  }

  getExporter(): SpanExporter {
    return new ConsoleSpanExporter();
  }
}
