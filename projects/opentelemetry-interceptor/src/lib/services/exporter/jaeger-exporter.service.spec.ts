import { TestBed } from '@angular/core/testing';

import { JaegerExporterService } from './jaeger-exporter.service';
import { OpentelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { jaegerExporterConfig } from '../../../../__mocks__/data/config.mock';
import { ConsoleSpanExporter } from '@opentelemetry/tracing';

describe('JaegerExporterService', () => {
  let jaegerExporterService: JaegerExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JaegerExporterService,
        { provide: OpentelemetryInjectConfig, useValue: jaegerExporterConfig },
      ],
    });
    jaegerExporterService = TestBed.inject(JaegerExporterService);
  });

  it('should be created', () => {
    expect(jaegerExporterService).toBeTruthy();
  });

  it('should generate a ConsoleSpanExporter', () => {
    const exporter = jaegerExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(ConsoleSpanExporter);
  });
});
