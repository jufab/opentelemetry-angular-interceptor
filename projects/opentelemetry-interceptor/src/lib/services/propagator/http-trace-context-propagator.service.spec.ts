import { TestBed } from '@angular/core/testing';

import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';

describe('HttpTraceContextPropagatorService', () => {
  let service: HttpTraceContextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTraceContextPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
