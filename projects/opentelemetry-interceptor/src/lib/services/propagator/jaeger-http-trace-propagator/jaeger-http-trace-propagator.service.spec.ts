import { TestBed } from '@angular/core/testing';

import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
import { OpenTelemetryInjectConfig } from '../../../configuration/opentelemetry-config';
import {
  jaegerPropagatorConfig,
  jaegerPropagatorWithoutCustomHeaderConfig,
} from '../../../../../__mocks__/data/config.mock';
import { JaegerHttpTracePropagator } from '@opentelemetry/propagator-jaeger';

describe('JaegerHttpTracePropagatorService', () => {
  let service: JaegerHttpTracePropagatorService;

  it('should return an JaegerHttpTracePropagator', () => {
    TestBed.configureTestingModule({
      providers: [
        JaegerHttpTracePropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: jaegerPropagatorConfig,
        },
      ],
    });
    service = TestBed.inject(JaegerHttpTracePropagatorService);
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(JaegerHttpTracePropagator);
  });

  it('should return an JaegerHttpTracePropagator without customHeader', () => {
    TestBed.configureTestingModule({
      providers: [
        JaegerHttpTracePropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: jaegerPropagatorWithoutCustomHeaderConfig,
        },
      ],
    });
    service = TestBed.inject(JaegerHttpTracePropagatorService);
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(JaegerHttpTracePropagator);
  });
});
