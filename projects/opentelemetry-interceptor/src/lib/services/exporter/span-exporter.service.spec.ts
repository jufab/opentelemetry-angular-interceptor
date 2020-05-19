import { TestBed } from '@angular/core/testing';

import { SpanExporterService } from './span-exporter.service';
import { OpentelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { CollectorExporter } from '@opentelemetry/exporter-collector';

describe('SpanExporterService', () => {
  let spanExporterService: SpanExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        {
          provide: SpanExporterService,
          useFactory: (otel: OtelcolExporterService) => {
            return new SpanExporterService(otel.getExporter());
          },
          deps: [OtelcolExporterService],
        },
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
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
