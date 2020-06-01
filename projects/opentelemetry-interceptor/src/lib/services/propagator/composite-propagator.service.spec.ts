import { TestBed } from '@angular/core/testing';

import { CompositePropagatorService } from './composite-propagator.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { jaegerPropagatorConfig } from '../../../../__mocks__/data/config.mock';
import { B3PropagatorService } from './b3-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';

describe('CompositePropagatorService', () => {
  let service: CompositePropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompositePropagatorService,
        B3PropagatorService,
        HttpTraceContextPropagatorService,
        JaegerHttpTracePropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: jaegerPropagatorConfig,
        },
      ],
    });
    service = TestBed.inject(CompositePropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
