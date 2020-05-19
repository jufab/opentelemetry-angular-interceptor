import { TestBed } from '@angular/core/testing';

import { OtelcolExporterService } from './otelcol-exporter.service';

describe('OtelcolExporterService', () => {
  let service: OtelcolExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtelcolExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
