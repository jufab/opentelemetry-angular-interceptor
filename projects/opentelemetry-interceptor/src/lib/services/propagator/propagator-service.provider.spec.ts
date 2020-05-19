import { TestBed } from '@angular/core/testing';

import { PropagatorServiceProvider } from './propagator-service.provider';
import { OpentelemetryInjectConfig } from '../../../public-api';
import { otelcolExporterConfig } from '../../../../__mocks__/data/config.mock';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { B3PropagatorService } from './b3-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';

describe('PropagatorServiceProviderService', () => {
  let service: PropagatorServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PropagatorServiceProvider,
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
        HttpTraceContextPropagatorService,
        B3PropagatorService,
        CompositePropagatorService,
      ],
    });
    service = TestBed.inject(PropagatorServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
