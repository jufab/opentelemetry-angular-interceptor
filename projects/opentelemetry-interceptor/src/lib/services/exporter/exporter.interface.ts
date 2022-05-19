import { InjectionToken } from '@angular/core';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';

/**
 * Exporter interface to define a default exporter
 */
export interface IExporter {
  /**
   * give an inmplementation of SpanExporter
   *
   * @return SpanExporter
   */
  getExporter(): SpanExporter;
}

/** injection for a Exporter */
export const OTEL_EXPORTER = new InjectionToken<IExporter>('otelcol.exporter');
