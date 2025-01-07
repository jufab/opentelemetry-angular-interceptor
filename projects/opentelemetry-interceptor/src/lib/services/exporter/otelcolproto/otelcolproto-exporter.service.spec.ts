import { TestBed } from '@angular/core/testing';

import { OtelcolProtoExporterService } from './otelcolproto-exporter.service';
import { OTEL_CONFIG } from '../../../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  otelcolExporterWithoutUrlAndB3Config,
} from '../../../../../__mocks__/data/config.mock';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';

describe('OtelcolProtoExporterService', () => {
  let otelcolProtoExporterService: OtelcolProtoExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtelcolProtoExporterService,
        { provide: OTEL_CONFIG, useValue: otelcolExporterConfig },
      ],
    });
    otelcolProtoExporterService = TestBed.inject(OtelcolProtoExporterService);
  });

  it('should be created', () => {
    expect(otelcolProtoExporterService).toBeTruthy();
  });

  it('should generate a CollectorTraceExporter', () => {
    const exporter = otelcolProtoExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(OTLPTraceExporter);
    expect((exporter as OTLPTraceExporter).url).toEqual('http://localhost');
  });

  it('should generate a CollectorTraceExporter with no url in configuration and have url default endpoint', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        OtelcolProtoExporterService,
        {
          provide: OTEL_CONFIG,
          useValue: otelcolExporterWithoutUrlAndB3Config,
        },
      ],
    });
    otelcolProtoExporterService = TestBed.inject(OtelcolProtoExporterService);
    const exporter = otelcolProtoExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(OTLPTraceExporter);
    expect((exporter as OTLPTraceExporter).url).toEqual(
      'http://localhost:4318/v1/traces'
    );
  });
});
