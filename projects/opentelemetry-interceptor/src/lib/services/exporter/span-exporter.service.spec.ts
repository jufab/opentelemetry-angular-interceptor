import { TestBed } from '@angular/core/testing';

import { SpanExporterService } from './span-exporter.service';

describe('SpanExporterService', () => {
  let service: SpanExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpanExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
