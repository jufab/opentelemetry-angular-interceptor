import { TestBed } from '@angular/core/testing';
import { B3Propagator } from '@opentelemetry/core';
import { B3PropagatorService } from './b3-propagator.service';

describe('B3PropagatorService', () => {
  let b3PropagatorService: B3PropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [B3PropagatorService],
    });
    b3PropagatorService = TestBed.inject(B3PropagatorService);
  });

  it('should be created', () => {
    expect(b3PropagatorService).toBeTruthy();
  });

  it('should return an B3Propagator', () => {
    expect(b3PropagatorService.getPropagator()).toBeInstanceOf(B3Propagator);
  });
});
