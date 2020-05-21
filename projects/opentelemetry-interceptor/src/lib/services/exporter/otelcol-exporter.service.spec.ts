import { TestBed } from '@angular/core/testing';

import { OtelcolExporterService } from './otelcol-exporter.service';
import { OpentelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { CollectorExporter } from '@opentelemetry/exporter-collector';

describe('OtelcolExporterService', () => {
  let otelcolExporterService: OtelcolExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OtelcolExporterService,
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
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
  });
});
