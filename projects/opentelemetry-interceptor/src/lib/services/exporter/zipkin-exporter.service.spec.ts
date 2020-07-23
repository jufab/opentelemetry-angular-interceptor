import { TestBed } from '@angular/core/testing';

import { ZipkinExporterService } from './zipkin-exporter.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { zipkinExporterConfig } from '../../../../__mocks__/data/config.mock';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

describe('ZipkinExporterService', () => {
  let zipkinExporterService: ZipkinExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ZipkinExporterService,
        { provide: OpenTelemetryInjectConfig, useValue: zipkinExporterConfig },
      ],
    });
    zipkinExporterService = TestBed.inject(ZipkinExporterService);
  });

  it('should be created', () => {
    expect(zipkinExporterService).toBeTruthy();
  });

  it('should generate a ZipkinExporter', () => {
    const exporter = zipkinExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(ZipkinExporter);
  });
});
