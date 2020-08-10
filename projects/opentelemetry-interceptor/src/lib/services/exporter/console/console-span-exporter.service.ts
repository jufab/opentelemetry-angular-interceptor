import { Injectable } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter, ConsoleSpanExporter } from '@opentelemetry/tracing';

/**
 * ConsoleSpanExporterService
 * A default span exporter
 */
@Injectable({
  providedIn: 'root',
})
export class ConsoleSpanExporterService implements IExporter {
  /**
   * Return a ConsoleSpanExporter
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ConsoleSpanExporter();
  }
}
