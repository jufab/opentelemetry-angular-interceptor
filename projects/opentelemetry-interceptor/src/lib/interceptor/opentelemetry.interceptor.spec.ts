import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { OpentelemetryInterceptor } from './opentelemetry.interceptor';
import { JaegerExporterService } from '../services/exporter/jaeger-exporter.service';
import { ZipkinExporterService } from '../services/exporter/zipkin-exporter.service';
import { OtelcolExporterService } from '../services/exporter/otelcol-exporter.service';
import { OpentelemetryInjectConfig } from '../../public-api';
import { otelcolExporterConfig } from '../../../__mocks__/data/config.mock';
import { ExporterServiceProvider } from '../services/exporter/exporter.service.provider';

describe('OpentelemetryInterceptor', () => {
  let httpClient;
  let httpControllerMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JaegerExporterService,
        ZipkinExporterService,
        OtelcolExporterService,
        { provide: OpentelemetryInjectConfig, useValue: otelcolExporterConfig },
        ExporterServiceProvider,
        OpentelemetryInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: OpentelemetryInterceptor, multi: true },
      ]
    })
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
