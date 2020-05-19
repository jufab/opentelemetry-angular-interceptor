import { Injectable, Inject } from '@angular/core';
import { IExporter } from './exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import {
  OpentelemetryConfig,
  OpentelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import {
  CollectorExporterConfig,
  CollectorExporter,
} from '@opentelemetry/exporter-collector';

@Injectable({
  providedIn: "root"
})
export class OtelcolExporterService implements IExporter {
  private otelcolConfig: CollectorExporterConfig;
  constructor(@Inject(OpentelemetryInjectConfig) config: OpentelemetryConfig) {
    this.otelcolConfig = {
      serviceName: config.commonConfig.serviceName,
      url: config.otelcolConfig.url,
    };
  }

  getExporter(): SpanExporter {
    return new CollectorExporter(this.otelcolConfig);
  }
}
