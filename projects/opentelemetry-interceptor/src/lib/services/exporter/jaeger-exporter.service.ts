import { Injectable, Inject } from '@angular/core';
import {
  OpentelemetryConfig,
  OpentelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { IExporter } from './exporter.interface';
import { SpanExporter, ConsoleSpanExporter } from '@opentelemetry/tracing';

@Injectable()
export class JaegerExporterService implements IExporter {
  //private configJaeger: ExporterConfig;

  constructor(@Inject(OpentelemetryInjectConfig) config: OpentelemetryConfig) {
    /*this.configJaeger = {
      serviceName: config.commonConfig.serviceName,
      host: config.jaegerConfig.host,
      port: config.jaegerConfig.port,
    };*/
  }

  getExporter(): SpanExporter {
    return new ConsoleSpanExporter();
  }
}
