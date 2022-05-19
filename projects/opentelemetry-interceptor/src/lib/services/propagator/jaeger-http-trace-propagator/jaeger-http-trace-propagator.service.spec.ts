import { TestBed } from '@angular/core/testing';

import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
import { OTEL_CONFIG } from '../../../configuration/opentelemetry-config';
import {
  jaegerPropagatorConfig,
  jaegerPropagatorWithoutCustomHeaderConfig,
} from '../../../../../__mocks__/data/config.mock';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';

describe('JaegerHttpTracePropagatorService', () => {
  let service: JaegerHttpTracePropagatorService;

  it('should return an JaegerHttpTracePropagator', () => {
    TestBed.configureTestingModule({
      providers: [
        JaegerHttpTracePropagatorService,
        {
          provide: OTEL_CONFIG,
          useValue: jaegerPropagatorConfig,
        },
      ],
    });
    service = TestBed.inject(JaegerHttpTracePropagatorService);
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(JaegerPropagator);
  });

  it('should return an JaegerHttpTracePropagator without customHeader', () => {
    TestBed.configureTestingModule({
      providers: [
        JaegerHttpTracePropagatorService,
        {
          provide: OTEL_CONFIG,
          useValue: jaegerPropagatorWithoutCustomHeaderConfig,
        },
      ],
    });
    service = TestBed.inject(JaegerHttpTracePropagatorService);
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(JaegerPropagator);
  });
});
