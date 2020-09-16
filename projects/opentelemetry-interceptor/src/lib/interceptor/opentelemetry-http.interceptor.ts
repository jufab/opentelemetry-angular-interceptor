import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as api from '@opentelemetry/api';
import { Sampler, Span, CanonicalCode } from '@opentelemetry/api';
import { WebTracerProvider, StackContextManager } from '@opentelemetry/web';
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
  BatchSpanProcessor,
  SpanExporter,
} from '@opentelemetry/tracing';
import {
  AlwaysOnSampler,
  AlwaysOffSampler,
  setActiveSpan,
  ProbabilitySampler,
  ParentOrElseSampler,
} from '@opentelemetry/core';
import { tap, finalize } from 'rxjs/operators';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../configuration/opentelemetry-config';
import { SpanExporterService } from '../services/exporter/span-exporter.service';
import { TextMapPropagatorService } from '../services/propagator/text-map-propagator.service';
import { version } from '../../version.json';
/**
 * Library name
 */
const NAME = '@jufab/opentelemetry-angular-interceptor';

/**
 * OpenTelemetryInterceptor class
 */
@Injectable({
  providedIn: 'root',
})
export class OpenTelemetryHttpInterceptor implements HttpInterceptor {
  /**
   * tracer
   */
  tracer: WebTracerProvider;
  /**
   * context manager
   */
  contextManager: StackContextManager;

  /**
   * constructor
   * @param config configuration
   * @param spanExporterService service exporter injected
   * @param textMapPropagatorService propagator
   */
  constructor(
    @Inject(OpenTelemetryInjectConfig) private config: OpenTelemetryConfig,
    @Inject(SpanExporterService)
    private spanExporterService: SpanExporterService,
    @Inject(TextMapPropagatorService)
    private textMapPropagatorService: TextMapPropagatorService
  ) {
    this.tracer = new WebTracerProvider({
      sampler: this.defineProbabilitySampler(Number(config.commonConfig.probabilitySampler)),
    });
    this.insertSpanProcessorProductionMode(
      this.config.commonConfig.production,
      this.spanExporterService.getExporter()
    );
    this.insertConsoleSpanExporter(this.config.commonConfig.console);
    this.tracer.register({
      propagator: this.textMapPropagatorService.getPropagator(),
    });
  }

  /**
   * Overide method
   * Interceptor from HttpInterceptor Angular
   * @param request the current request
   * @param next next
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.contextManager = new StackContextManager();
    const span: Span = this.initSpan(request);
    const tracedReq = this.injectContextAndHeader(span, request);
    return next.handle(tracedReq).pipe(
      tap(
        (event: HttpResponse<any>) => {
          span.setAttributes(
            {
              'http.status_code': event.status,
              'http.status_text': event.statusText,
            }
          );
          if (event.body != null) {
            span.addEvent('response', { body: JSON.stringify(event.body) });
          }
        },
        (event: HttpErrorResponse) => {
          span.setAttributes(
            {
              'http.status_text': event.statusText,
              'http.status_code': event.status,
            }
          );
          span.recordException({
            name: event.name,
            message: event.message,
            stack: event.error
          });
          // TODO : To change after new spec...
          span.setStatus({
            code: CanonicalCode.INTERNAL
          });
        }
      ),
      finalize(() => {
        span.end();
      })
    );
  }

  /**
   * Initialise a span for a request intercepted
   * @param request request
   */
  private initSpan(request: HttpRequest<unknown>): Span {
    const urlRequest = new URL(request.urlWithParams);
    const span = this.tracer
      .getTracer(NAME, version)
      .startSpan(
        request.url,
        {
          attributes: {
            ['http.method']: request.method,
            ['http.url']: request.urlWithParams,
            ['http.host']: urlRequest.host,
            ['http.scheme']: urlRequest.protocol.replace(':', ''),
            ['http.target']: urlRequest.pathname + urlRequest.search,
            ['http.user_agent']: window.navigator.userAgent
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
   * @param span span
   * @param request request
   */
  private injectContextAndHeader(
    span: Span,
    request: HttpRequest<unknown>
  ) {
    const carrier = {};
    api.propagation.inject(
      carrier,
      api.defaultSetter,
      this.contextManager.active()
    );
    request.headers.keys().map(key => {
      carrier[key] = request.headers.get(key);
    });
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
   * @param spanExporter Exporter
   */
  private insertSpanProcessorProductionMode(
    production: boolean,
    spanExporter: SpanExporter
  ) {
    this.tracer.addSpanProcessor(
      production
        ? new BatchSpanProcessor(spanExporter)
        : new SimpleSpanProcessor(spanExporter)
    );
  }

  /**
   * define the Probability Sampler
   * By Default, it's always (or 1)
   * @param sampleConfig the sample configuration
   */
  private defineProbabilitySampler(sampleConfig: number): Sampler {
    if (sampleConfig > 1) {
      return new ParentOrElseSampler(new AlwaysOnSampler());
    }
    else if (sampleConfig <= 0) {
      return new ParentOrElseSampler(new AlwaysOffSampler());
    } else {
      return new ParentOrElseSampler(new ProbabilitySampler(sampleConfig));
    }
  }
}
