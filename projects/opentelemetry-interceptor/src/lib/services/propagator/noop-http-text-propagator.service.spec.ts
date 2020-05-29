import { TestBed } from '@angular/core/testing';

import { NoopHttpTextPropagatorService } from './noop-http-text-propagator.service';
import { NoopHttpTextPropagator } from '@opentelemetry/api';

describe('NoopHttpTextPropagatorService', () => {
  let service: NoopHttpTextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoopHttpTextPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(NoopHttpTextPropagator);
  });
});
