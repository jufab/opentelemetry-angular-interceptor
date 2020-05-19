import { SpanExporter } from '@opentelemetry/tracing';
import { IExporter } from './exporter.interface';


export class SpanExporterService implements IExporter {
  constructor(private spanExporter: SpanExporter) {}
  getExporter(): SpanExporter {
    return this.spanExporter;
  }
}
