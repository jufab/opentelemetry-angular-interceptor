import { TestBed } from '@angular/core/testing';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { W3CTraceContextPropagatorService } from './w3c-trace-context-propagator.service';

describe('W3CTraceContextPropagatorService', () => {
  let service: W3CTraceContextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [W3CTraceContextPropagatorService],
    });
    service = TestBed.inject(W3CTraceContextPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an HttpTraceContext', () => {
    expect(service.getPropagator()).toBeInstanceOf(W3CTraceContextPropagator);
  });
});
