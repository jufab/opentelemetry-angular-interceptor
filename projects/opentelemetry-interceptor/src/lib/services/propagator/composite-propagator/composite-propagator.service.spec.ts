import { TestBed } from '@angular/core/testing';
import { CompositePropagator } from '@opentelemetry/core';
import { CompositePropagatorService } from './composite-propagator.service';
import { OTLP_CONFIG } from '../../../configuration/opentelemetry-config';
import { jaegerPropagatorConfig } from '../../../../../__mocks__/data/config.mock';

describe('CompositePropagatorService', () => {
  let service: CompositePropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompositePropagatorService,
        {
          provide: OTLP_CONFIG,
          useValue: jaegerPropagatorConfig,
        },
      ],
    });
    service = TestBed.inject(CompositePropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an CompositePropagator', () => {
    expect(service.getPropagator()).toBeInstanceOf(CompositePropagator);
  });
});
