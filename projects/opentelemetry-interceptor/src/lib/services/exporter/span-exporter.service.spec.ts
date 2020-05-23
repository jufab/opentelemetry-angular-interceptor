import { TestBed } from '@angular/core/testing';

import { SpanExporterService } from './span-exporter.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { CollectorExporter } from '@opentelemetry/exporter-collector';
import { JaegerExporterService } from './jaeger-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { OtelcolExporterService } from './otelcol-exporter.service';

describe('SpanExporterService', () => {
  let spanExporterService: SpanExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
        JaegerExporterService,
        ZipkinExporterService,
        OtelcolExporterService,
      ],
    });
    spanExporterService = TestBed.inject(SpanExporterService);
  });

  it('should be created', () => {
    expect(spanExporterService).toBeTruthy();
  });

  it('should have a CollectorExporter created', () => {
    const spanEx = spanExporterService.getExporter();
    expect(spanEx).toBeInstanceOf(CollectorExporter);
  });
});
