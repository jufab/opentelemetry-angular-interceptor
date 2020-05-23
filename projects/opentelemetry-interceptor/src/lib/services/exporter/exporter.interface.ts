import { SpanExporter } from '@opentelemetry/tracing';

export interface IExporter {
  /**
   * give an inmplementation of SpanExporter
   * @return SpanExporter
   */
  getExporter(): SpanExporter;
}
