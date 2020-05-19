import { TestBed } from '@angular/core/testing';

import { ZipkinExporterService } from './zipkin-exporter.service';
import { OpentelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { zipkinExporterConfig } from '../../../../__tests__/data/config.mock';

describe('ZipkinExporterService', () => {
  let service: ZipkinExporterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ZipkinExporterService,
        {provide:OpentelemetryInjectConfig, useValue:zipkinExporterConfig}
      ]
    }).compileComponents();
    service = TestBed.get(ZipkinExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
