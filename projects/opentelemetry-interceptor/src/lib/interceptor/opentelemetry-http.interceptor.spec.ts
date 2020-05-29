import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { OpenTelemetryHttpInterceptor } from './opentelemetry-http.interceptor';
import { OpenTelemetryInjectConfig } from '../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  otelcolExporterWithProbabilitySamplerAndCompositeConfig,
} from '../../../__mocks__/data/config.mock';
import { of } from 'rxjs';

describe('OpenTelemetryHttpInterceptor', () => {
  let httpClient: HttpClient;
  let httpControllerMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpenTelemetryHttpInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpControllerMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    const interceptor = TestBed.inject(OpenTelemetryHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('Add traceparent header on a given request', () => {
    const url = 'http://url.test.com';
    httpClient.get(url).subscribe();
    const req = httpControllerMock.expectOne(url);
    expect(req.request.headers.get('traceparent')).not.toBeNull();
    req.flush({});
    httpControllerMock.verify();
  });

  it('Add traceparent header on a given request with already presents headers', () => {
    const url = 'http://url.test.com';
    const headers: HttpHeaders = new HttpHeaders({
      oneHead: 'oneValue',
      twoHead: 'twoValue',
    });
    httpClient.get(url, { headers: headers }).subscribe();
    const req = httpControllerMock.expectOne(url);
    expect(req.request.headers.get('traceparent')).not.toBeNull();
    expect(req.request.headers.get('oneHead')).toEqual('oneValue');
    expect(req.request.headers.get('twoHead')).toEqual('twoValue');
    req.flush({});
    httpControllerMock.verify();
  });

  it('Add traceparent header on a given request with an error', () => {
    const url = 'http://url.test.com';
    httpClient.get(url).subscribe({
      error(actualError) {
        expect(of(actualError)).toBeTruthy();
        expect(actualError).not.toBeNull();
        expect(actualError).not.toBeUndefined();
      },
    });
    const req = httpControllerMock.expectOne(url);
    expect(req.request.method).toEqual('GET');

    req.flush(
      { errorMessage: 'error' },
      { status: 500, statusText: 'Server Error' }
    );
    httpControllerMock.verify();
  });

  it('Add traceparent header on a JsonP given request (not working really...)', () => {
    const url = 'http://url.test.com';
    httpClient.jsonp(url + '/test', 'myCallback').subscribe();
    const req = httpControllerMock.expectOne({
      method: 'JSONP',
      url: url + '/test?myCallback=JSONP_CALLBACK',
    });
    expect(req.request.headers.get('traceparent')).not.toBeNull();
    req.flush({});
    httpControllerMock.verify();
  });

  it('verify probability sampler to be add', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: OpenTelemetryInjectConfig,
          useValue: otelcolExporterWithProbabilitySamplerAndCompositeConfig,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpenTelemetryHttpInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpControllerMock = TestBed.inject(HttpTestingController);

    const url = 'http://url.test.com';
    httpClient.get(url).subscribe();
    const req = httpControllerMock.expectOne(url);
    expect(req.request.headers.get('traceparent')).not.toBeNull();
    req.flush({});
    httpControllerMock.verify();
  });
});
