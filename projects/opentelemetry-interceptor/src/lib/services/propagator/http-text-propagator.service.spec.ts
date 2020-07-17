import { TestBed } from '@angular/core/testing';

import { HttpTextPropagatorService } from './http-text-propagator.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  otelcolExporterWithoutUrlAndB3Config,
  otelcolExporterWithProbabilitySamplerAndCompositeConfig,
  jaegerPropagatorConfig,
} from '../../../../__mocks__/data/config.mock';
import {
  HttpTraceContext,
  CompositePropagator,
  B3Propagator,
} from '@opentelemetry/core';
import { NoopHttpTextPropagator } from '@opentelemetry/api';
import { B3PropagatorService } from './b3-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';
import { NoopHttpTextPropagatorService } from './noop-http-text-propagator.service';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
//import { JaegerHttpTracePropagator } from '@opentelemetry/propagator-jaeger';

describe('HttpTextPropagatorService', () => {
  let service: HttpTextPropagatorService;

  it('should return an HttpTraceContext', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        HttpTraceContextPropagatorService,
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(HttpTraceContext);
  });

  it('should return an B3Propagator', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        B3PropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: otelcolExporterWithoutUrlAndB3Config,
        },
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(B3Propagator);
  });

  it('should return an CompositePropagator', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        CompositePropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: otelcolExporterWithProbabilitySamplerAndCompositeConfig,
        },
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(CompositePropagator);
  });

  it('should return an NoopHttpTextPropagator', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        NoopHttpTextPropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: { commonConfig: { serviceName: 'test' } },
        },
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(NoopHttpTextPropagator);
  });

  it('should return an JaegerHttpTracePropagator (NoopHttpTextPropagator)', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        JaegerHttpTracePropagatorService,
        {
          provide: OpenTelemetryInjectConfig,
          useValue: jaegerPropagatorConfig,
        },
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(NoopHttpTextPropagator);
  });
});
