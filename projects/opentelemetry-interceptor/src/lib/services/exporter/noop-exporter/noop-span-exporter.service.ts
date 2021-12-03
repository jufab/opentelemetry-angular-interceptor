import { Injectable } from '@angular/core';
import { IExporter } from '../exporter.interface';
import { SpanExporter } from '@opentelemetry/sdk-trace-base';

/**
 * NoopSpanExporterService
 * A No-op span exporter
 */
@Injectable({
  providedIn: 'root',
})
export class NoopSpanExporterService implements IExporter {
  /**
   * Return undefined
   *
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return undefined;
  }
}
