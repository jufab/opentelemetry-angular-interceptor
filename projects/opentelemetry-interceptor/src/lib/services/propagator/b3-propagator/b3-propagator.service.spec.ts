import { TestBed } from '@angular/core/testing';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { B3PropagatorService } from './b3-propagator.service';
import {
  b3PropagatorSingleConfig,
  b3PropagatorMultiConfig
} from '../../../../../__mocks__/data/config.mock';
import { OTEL_CONFIG } from '../../../configuration/opentelemetry-config';

describe('B3PropagatorService', () => {
  let b3PropagatorService: B3PropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        B3PropagatorService,
        { provide: OTEL_CONFIG, useValue: b3PropagatorMultiConfig },
      ],
    });
    b3PropagatorService = TestBed.inject(B3PropagatorService);
  });

  it('should be created', () => {
    expect(b3PropagatorService).toBeTruthy();
  });

  it('should return an B3Propagator with multi header', () => {
    expect(b3PropagatorService.getPropagator()).toBeInstanceOf(B3Propagator);
  });

  it('should return an B3Propagator with single header', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        B3PropagatorService,
        { provide: OTEL_CONFIG, useValue: b3PropagatorSingleConfig },
      ],
    });
    b3PropagatorService = TestBed.inject(B3PropagatorService);
    expect(b3PropagatorService.getPropagator()).toBeInstanceOf(B3Propagator);
  });



});
