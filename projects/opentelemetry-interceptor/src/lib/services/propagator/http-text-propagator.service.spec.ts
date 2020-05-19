import { TestBed } from '@angular/core/testing';

import { HttpTextPropagatorService } from './http-text-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { OpentelemetryInjectConfig } from '../../../public-api';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { HttpTraceContext } from '@opentelemetry/core';

describe('HttpTextPropagatorService', () => {
  let service: HttpTextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpTraceContextPropagatorService,
        {
          provide: HttpTextPropagatorService,
          useFactory: (httpTrace: HttpTraceContextPropagatorService) => {
            return new HttpTextPropagatorService(httpTrace.getPropagator());
          },
          deps: [HttpTraceContextPropagatorService],
        },
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
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
