import { TestBed } from '@angular/core/testing';
import { NoopTextMapPropagatorService } from './noop-text-map-propagator.service';
import { NoopTextMapPropagator } from '@opentelemetry/api/build/src/propagation/NoopTextMapPropagator';

describe('NoopTextMapPropagatorService', () => {
  let service: NoopTextMapPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoopTextMapPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(NoopTextMapPropagator);
  });
});



