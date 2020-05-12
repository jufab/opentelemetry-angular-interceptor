import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { OpentelemetryInterceptor } from './opentelemetry.interceptor';

describe('OpentelemetryInterceptor', () => {
  let httpClient;
  let httpControllerMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: OpentelemetryInterceptor, multi: true },
      ]
    })
    httpClient = TestBed.get(HttpClient);
    httpControllerMock = TestBed.get(HttpTestingController);
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
