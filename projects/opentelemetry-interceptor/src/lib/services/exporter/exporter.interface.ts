import { SpanExporter } from '@opentelemetry/tracing';

export interface IExporter {
  getExporter():SpanExporter;
}
