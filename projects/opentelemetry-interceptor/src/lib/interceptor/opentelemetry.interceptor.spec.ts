import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { OpentelemetryInterceptor } from './opentelemetry.interceptor';
import { OtelcolExporterService } from '../services/exporter/otelcol-exporter.service';
import { OpentelemetryInjectConfig } from '../../public-api';
import { otelcolExporterConfig } from '../../../__mocks__/data/config.mock';
import { ExporterServiceProvider } from '../services/exporter/exporter.service.provider';
import { PropagatorServiceProvider } from '../services/propagator/propagator-service.provider';
import { HttpTraceContextPropagatorService } from '../services/propagator/http-trace-context-propagator.service';
import { SpanExporterService } from '../services/exporter/span-exporter.service';
import { HttpTextPropagatorService } from '../services/propagator/http-text-propagator.service';

describe('OpentelemetryInterceptor', () => {
  let httpClient;
  let httpControllerMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OtelcolExporterService,
        {
          provide: SpanExporterService,
          useFactory: (otel: OtelcolExporterService) => {
            return new SpanExporterService(otel.getExporter());
          },
          deps: [OtelcolExporterService],
        },
        HttpTraceContextPropagatorService,
        {
          provide: HttpTextPropagatorService,
          useFactory: (httpTrace: HttpTraceContextPropagatorService) => {
            return new HttpTextPropagatorService(httpTrace.getPropagator());
          },
          deps: [HttpTraceContextPropagatorService],
        },
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
        ExporterServiceProvider,
        PropagatorServiceProvider,
        OpentelemetryInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpentelemetryInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpControllerMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    const interceptor = TestBed.inject(OpentelemetryInterceptor);
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
