import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { OpenTelemetryInterceptor } from './opentelemetry.interceptor';
import { OpenTelemetryInjectConfig } from '../../lib/configuration/opentelemetry-config';
import { otelcolExporterConfig } from '../../../__mocks__/data/config.mock';
import { JaegerExporterService } from '../services/exporter/jaeger-exporter.service';
import { OtelcolExporterService } from '../services/exporter/otelcol-exporter.service';
import { ZipkinExporterService } from '../services/exporter/zipkin-exporter.service';
import { HttpTraceContextPropagatorService } from '../services/propagator/http-trace-context-propagator.service';
import { B3PropagatorService } from '../services/propagator/b3-propagator.service';

describe('OpenTelemetryInterceptor', () => {
  let httpClient;
  let httpControllerMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
        JaegerExporterService,
        OtelcolExporterService,
        ZipkinExporterService,
        HttpTraceContextPropagatorService,
        B3PropagatorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpenTelemetryInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpControllerMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    const interceptor = TestBed.inject(OpenTelemetryInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('Add traceparent header on a given request', () => {
    const url = 'http://url.test.com';
    const request = httpClient.get(url);
    request.subscribe();
    const req = httpControllerMock.expectOne(url);
    expect(req.request.headers.get('traceparent')).not.toBeNull();
    req.flush({});
    httpControllerMock.verify();
  });
});
