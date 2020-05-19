import { TestBed } from '@angular/core/testing';
import { HttpTraceContext } from '@opentelemetry/core';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';

describe('HttpTraceContextPropagatorService', () => {
  let service: HttpTraceContextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpTraceContextPropagatorService
      ]
    });
    service = TestBed.inject(HttpTraceContextPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an HttpTraceContext', () => {
    expect(service.getPropagator()).toBeInstanceOf(HttpTraceContext);
  });
});
