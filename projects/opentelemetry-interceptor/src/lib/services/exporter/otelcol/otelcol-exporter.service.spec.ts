import { TestBed } from '@angular/core/testing';

import { OtelcolExporterService } from './otelcol-exporter.service';
import { OTEL_CONFIG } from '../../../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  otelcolExporterWithoutUrlAndB3Config,
} from '../../../../../__mocks__/data/config.mock';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';


describe('OtelcolExporterService', () => {
  let otelcolExporterService: OtelcolExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        { provide: OTEL_CONFIG, useValue: otelcolExporterConfig },
      ],
    });
    otelcolExporterService = TestBed.inject(OtelcolExporterService);
  });

  it('should be created', () => {
    expect(otelcolExporterService).toBeTruthy();
  });

  it('should generate a CollectorTraceExporter', () => {
    const exporter = otelcolExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(OTLPTraceExporter);
  });

  it('should generate a CollectorTraceExporter with no url in configuration and have url default endpoint', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        {
          provide: OTEL_CONFIG,
          useValue: otelcolExporterWithoutUrlAndB3Config,
        },
      ],
    });
    otelcolExporterService = TestBed.inject(OtelcolExporterService);
    const exporter = otelcolExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(OTLPTraceExporter);
  });
});
