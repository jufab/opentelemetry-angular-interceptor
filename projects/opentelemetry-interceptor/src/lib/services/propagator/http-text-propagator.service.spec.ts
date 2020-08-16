import { TestBed } from '@angular/core/testing';

import { HttpTextPropagatorService } from './http-text-propagator.service';
import {
  HttpTraceContext,
  CompositePropagator,
  B3Propagator,
} from '@opentelemetry/core';
import { NoopHttpTextPropagator } from '@opentelemetry/api';
import { JaegerHttpTracePropagator } from '@opentelemetry/propagator-jaeger';
import { HttpTraceContextPropagatorModule } from './http-trace-context-propagator/http-trace-context-propagator.module';
import { B3PropagatorModule } from './b3-propagator/b3-propagator.module';
import { CompositePropagatorModule } from './composite-propagator/composite-propagator.module';
import { NoopHttpTextPropagatorModule } from './noop-http-text-propagator/noop-http-text-propagator.module';
import { JaegerHttpTracePropagatorModule } from './jaeger-http-trace-propagator/jaeger-http-trace-propagator.module';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import { otelcolExporterWithProbabilitySamplerAndCompositeConfig, jaegerPropagatorConfig } from '../../../../__mocks__/data/config.mock';

describe('HttpTextPropagatorService', () => {
  let service: HttpTextPropagatorService;

  it('exporter should be undefined', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        HttpTextPropagatorService,
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    const exporter = service.getPropagator();
    expect(exporter).toBeUndefined();
  });

  it('should return an HttpTraceContext', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpTraceContextPropagatorModule],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(HttpTraceContext);
  });

  it('should return an B3Propagator', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        B3PropagatorModule,
      ],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(B3Propagator);
  });

  it('should return an CompositePropagator', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CompositePropagatorModule],
      providers: [
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
      imports: [NoopHttpTextPropagatorModule],
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(NoopHttpTextPropagator);
  });

  it('should return an JaegerHttpTracePropagator (NoopHttpTextPropagator)', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [JaegerHttpTracePropagatorModule],
      providers: [
        {
          provide: OpenTelemetryInjectConfig,
          useValue: jaegerPropagatorConfig,
        },
      ]
    });
    service = TestBed.inject(HttpTextPropagatorService);
    expect(service.getPropagator()).toBeInstanceOf(JaegerHttpTracePropagator);
  });
});
