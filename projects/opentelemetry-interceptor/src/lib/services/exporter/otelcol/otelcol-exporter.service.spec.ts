import { TestBed } from '@angular/core/testing';

import { OtelcolExporterService } from './otelcol-exporter.service';
import { OpenTelemetryInjectConfig, OTELCOL_LOGGER } from '../../../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  otelcolExporterWithoutUrlAndB3Config,
} from '../../../../../__mocks__/data/config.mock';
import {
  CollectorTraceExporter
} from '@opentelemetry/exporter-collector/build/src/platform/browser';

describe('OtelcolExporterService', () => {
  let otelcolExporterService: OtelcolExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig }
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
    expect(exporter).toBeInstanceOf(CollectorTraceExporter);
    expect((exporter as CollectorTraceExporter).serviceName).toEqual('test');
    expect((exporter as CollectorTraceExporter).url).toEqual('http://localhost');
  });

  it('should generate a CollectorTraceExporter with no url in configuration and have url default endpoint', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: otelcolExporterWithoutUrlAndB3Config,
        }
      ],
    });
    otelcolExporterService = TestBed.inject(OtelcolExporterService);
    const exporter = otelcolExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(CollectorTraceExporter);
    expect((exporter as CollectorTraceExporter).serviceName).toEqual('test');
    expect((exporter as CollectorTraceExporter).url).toEqual('http://localhost:55681/v1/trace');
  });
});
