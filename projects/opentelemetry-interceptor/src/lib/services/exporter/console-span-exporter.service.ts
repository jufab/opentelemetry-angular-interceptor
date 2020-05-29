import { Injectable } from '@angular/core';
import { IExporter } from './exporter.interface';
import { SpanExporter, ConsoleSpanExporter } from '@opentelemetry/tracing';

@Injectable({
  providedIn: 'root',
})
export class ConsoleSpanExporterService implements IExporter {
  constructor() {}

  getExporter(): SpanExporter {
    return new ConsoleSpanExporter();
  }
}
