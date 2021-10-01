import { TestBed } from '@angular/core/testing';

import { ConsoleSpanExporterService } from './console-span-exporter.service';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

describe('ConsoleExporterService', () => {
  let service: ConsoleSpanExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleSpanExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getExporter()).toBeInstanceOf(ConsoleSpanExporter);
  });
});
