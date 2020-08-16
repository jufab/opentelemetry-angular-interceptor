import { SpanExporterService } from './span-exporter.service';
import { TestBed } from '@angular/core/testing';

describe('SpanExporterService', () => {
  let spanExporterService: SpanExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpanExporterService,
      ],
    });
    spanExporterService = TestBed.inject(SpanExporterService);
  });

  it('should be created', () => {
    expect(spanExporterService).toBeTruthy();
  });

  it('exporter should be undefined', () => {
    const exporter = spanExporterService.getExporter();
    expect(exporter).toBeUndefined();
  });
});
