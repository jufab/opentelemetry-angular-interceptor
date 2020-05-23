import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as api from '@opentelemetry/api';
import { WebTracerProvider, StackContextManager } from '@opentelemetry/web';
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
  BatchSpanProcessor,
  SpanExporter,
  SpanProcessor,
} from '@opentelemetry/tracing';
import { ALWAYS_SAMPLER, setActiveSpan } from '@opentelemetry/core';
import { tap, finalize } from 'rxjs/operators';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../configuration/opentelemetry-config';
import { SpanExporterService } from '../services/exporter/span-exporter.service';
import { HttpTextPropagatorService } from '../services/propagator/http-text-propagator.service';

/**
 * OpenTelemetryInterceptor class
 */
@Injectable({
  providedIn: 'root',
})
export class OpenTelemetryInterceptor implements HttpInterceptor {
  /**
   * tracer
   */
  tracer: WebTracerProvider;
  /**
   * context manager
   */
  contextManager = new StackContextManager();

  /**
   * constructor
   * @param config
   * @param spanExporterService
   * @param httpTextPropagatorService
   */
  constructor(
    @Inject(OpenTelemetryInjectConfig) private config: OpenTelemetryConfig,
    @Inject(SpanExporterService)
    private spanExporterService: SpanExporterService,
    @Inject(HttpTextPropagatorService)
    private httpTextPropagatorService: HttpTextPropagatorService
  ) {
    this.tracer = new WebTracerProvider({
      sampler: ALWAYS_SAMPLER,
    });
    this.insertSpanProcessorProductionMode(
      this.config.commonConfig.production,
      this.spanExporterService.getExporter()
    );
    this.insertConsoleSpanExporter(this.config.commonConfig.console);
    this.tracer.register({
      propagator: this.httpTextPropagatorService.getPropagator(),
      contextManager: this.contextManager,
    });
  }

  /**
   * Overide method
   * Interceptor from HttpInterceptor Angular
   * @param request
   * @param next
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const span: api.Span = this.initSpan(request);
    const tracedReq = this.injectContextAndHeader(span, request);
    return next.handle(tracedReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            span.setAttribute('http.status_code', event.status);
            span.addEvent('response', { body: JSON.stringify(event.body) });
          }
        },
        (event: HttpErrorResponse) => {
          if (event instanceof HttpErrorResponse) {
            span.setAttribute('http.status_code', event.status);
            span.addEvent('error', { body: JSON.stringify(event.error) });
          }
        }
      ),
      finalize(() => {
        span.end();
      })
    );
  }

  /**
   * Initialise a span for a request intercepted
   * @param request
   */
  private initSpan(request: HttpRequest<unknown>): api.Span {
    const span = this.tracer
      .getTracer('angular-interceptor', '0.0.1')
      .startSpan(
        request.url,
        {
          attributes: {
            ['http.method']: request.method,
            ['http.url']: request.urlWithParams,
          },
        },
        this.contextManager.active()
      );
    this.contextManager._currentContext = setActiveSpan(
      this.contextManager.active(),
      span
    );
    return span;
  }

  /**
   * Add header propagator in request and conserve original header
   * @param span
   * @param request
   */
  private injectContextAndHeader(
    span: api.Span,
    request: HttpRequest<unknown>
  ) {
    const carrier = {};
    api.propagation.inject(
      carrier,
      api.defaultSetter,
      this.contextManager.active()
    );
    for (let key in request.headers.keys) {
      carrier[key] = request.headers.get(key);
    }
    return request.clone({
      setHeaders: carrier,
    });
  }

  /**
   * Insert in tracer the console span if config is true
   * @param console config to insert console span
   */
  private insertConsoleSpanExporter(console: boolean) {
    if (console) {
      this.tracer.addSpanProcessor(
        new SimpleSpanProcessor(new ConsoleSpanExporter())
      );
    }
  }

  /**
   * Insert BatchSpanProcessor in production mode
   * SimpleSpanProcessor otherwise
   * @param production mode
   * @param spanExporter
   */
  private insertSpanProcessorProductionMode(
    production: boolean,
    spanExporter: SpanExporter
  ) {
    let spanProcessor: SpanProcessor = null;
    if (production) {
      spanProcessor = new BatchSpanProcessor(spanExporter);
    } else {
      spanProcessor = new SimpleSpanProcessor(spanExporter);
    }
    this.tracer.addSpanProcessor(spanProcessor);
  }
}
