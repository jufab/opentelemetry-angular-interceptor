import { SpanExporter } from '@opentelemetry/tracing';
import { IExporter } from './exporter.interface';

export class SpanExporterService implements IExporter {
  /**
   * Not used, just a definition for injection
   */
  getExporter(): SpanExporter {
    return undefined;
  }
}
