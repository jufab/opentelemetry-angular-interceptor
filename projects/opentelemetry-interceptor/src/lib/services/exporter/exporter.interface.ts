import { InjectionToken } from '@angular/core';
import { SpanExporter } from '@opentelemetry/tracing';

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
export const OTELCOL_EXPORTER = new InjectionToken<IExporter>('otelcol.exporter');
