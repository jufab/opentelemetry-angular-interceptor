import { TestBed } from '@angular/core/testing';

import { ExporterServiceProvider } from './exporter.service.provider';
import { JaegerExporterService } from './jaeger-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { OpentelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { SpanExporterService } from './span-exporter.service';

describe('ExporterServiceProvider', () => {
  let service: ExporterServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JaegerExporterService,
        ZipkinExporterService,
        OtelcolExporterService,
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
        ExporterServiceProvider
      ],
    });
    service = TestBed.inject(ExporterServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
