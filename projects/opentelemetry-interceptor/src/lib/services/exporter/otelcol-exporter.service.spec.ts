import { TestBed } from '@angular/core/testing';

import { OtelcolExporterService } from './otelcol-exporter.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  otelcolExporterWithoutUrlAndB3Config,
} from '../../../../__mocks__/data/config.mock';
import { CollectorExporter } from '@opentelemetry/exporter-collector';

describe('OtelcolExporterService', () => {
  let otelcolExporterService: OtelcolExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
      ],
    });
    otelcolExporterService = TestBed.inject(OtelcolExporterService);
  });

  it('should be created', () => {
    expect(otelcolExporterService).toBeTruthy();
  });

  it('should generate a CollectorExporter', () => {
    const exporter = otelcolExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(CollectorExporter);
    expect((exporter as CollectorExporter).serviceName).toEqual('test');
    expect((exporter as CollectorExporter).url).toEqual('http://localhost');
  });

  it('should generate a CollectorExporter with no url in configuration and have url default endpoint', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: otelcolExporterWithoutUrlAndB3Config,
        },
      ],
    });
    otelcolExporterService = TestBed.inject(OtelcolExporterService);
    const exporter = otelcolExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(CollectorExporter);
    expect((exporter as CollectorExporter).serviceName).toEqual('test');
    expect((exporter as CollectorExporter).url).toEqual('http://localhost:55678/v1/trace');
  });
});
