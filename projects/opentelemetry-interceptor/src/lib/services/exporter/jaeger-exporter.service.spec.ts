import { TestBed } from '@angular/core/testing';

import { JaegerExporterService } from './jaeger-exporter.service';

describe('JaegerExporterService', () => {
  let service: JaegerExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JaegerExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
