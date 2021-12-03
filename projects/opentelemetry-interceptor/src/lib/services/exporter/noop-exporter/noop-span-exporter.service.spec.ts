import { TestBed } from '@angular/core/testing';

import { NoopSpanExporterService } from './noop-span-exporter.service';


describe('NoopSpanExporterService', () => {
  let service: NoopSpanExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoopSpanExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getExporter()).toBeUndefined();
  });
});
