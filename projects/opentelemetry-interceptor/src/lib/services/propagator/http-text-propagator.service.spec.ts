import { TestBed } from '@angular/core/testing';

import { HttpTextPropagatorService } from './http-text-propagator.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { HttpTraceContext } from '@opentelemetry/core';
import { B3PropagatorService } from './b3-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';

describe('HttpTextPropagatorService', () => {
  let service: HttpTextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        B3PropagatorService,
        HttpTraceContextPropagatorService,
        CompositePropagatorService,
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an HttpTraceContext', () => {
    expect(service.getPropagator()).toBeInstanceOf(HttpTraceContext);
  });
});
