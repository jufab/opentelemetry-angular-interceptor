import { TestBed } from '@angular/core/testing';

import { CompositePropagatorService } from './composite-propagator.service';
import { OpenTelemetryInjectConfig } from '../../../configuration/opentelemetry-config';
import { jaegerPropagatorConfig } from '../../../../../__mocks__/data/config.mock';

describe('CompositePropagatorService', () => {
  let service: CompositePropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompositePropagatorService,
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
