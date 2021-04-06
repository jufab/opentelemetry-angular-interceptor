import { Injectable, Inject, Optional } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs';
import * as api from '@opentelemetry/api';
import { Sampler, Span, SpanStatusCode, DiagLogger } from '@opentelemetry/api';
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
  TraceIdRatioBasedSampler,
  ParentBasedSampler,
} from '@opentelemetry/core';
import { tap, finalize } from 'rxjs/operators';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../configuration/opentelemetry-config';
import { version, name } from '../../version.json';
import { OTELCOL_EXPORTER, IExporter } from '../services/exporter/exporter.interface';
import { OTELCOL_PROPAGATOR, IPropagator } from '../services/propagator/propagator.interface';
import { OTELCOL_LOGGER } from '../configuration/opentelemetry-config';

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
   * Log or not body
   */
  logBody = false;

  /**
   * constructor
   * @param config configuration
   * @param exporterService service exporter injected
   * @param propagatorService propagator
   */
  constructor(
    @Inject(OpenTelemetryInjectConfig) private config: OpenTelemetryConfig,
    @Inject(OTELCOL_EXPORTER)
    private exporterService: IExporter,
    @Inject(OTELCOL_PROPAGATOR)
    private propagatorService: IPropagator,
    @Optional() @Inject(OTELCOL_LOGGER)
    private logger: DiagLogger,
    private platformLocation: PlatformLocation
  ) {
    this.tracer = new WebTracerProvider({
      sampler: this.defineProbabilitySampler(Number(config.commonConfig.probabilitySampler)),
    });
    this.insertSpanProcessorProductionMode(
      this.config.commonConfig.production,
      this.exporterService.getExporter()
    );
    this.insertConsoleSpanExporter(this.config.commonConfig.console);
    this.contextManager = new StackContextManager();
    this.tracer.register({
      propagator: this.propagatorService.getPropagator(),
      contextManager: this.contextManager
    });
    this.logBody = config.commonConfig.logBody;
    api.diag.setLogger(logger, config.commonConfig.logLevel);
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
    this.contextManager.enable();
    const span: Span = this.initSpan(request);
    const tracedReq = this.injectContextAndHeader(request);
    return next.handle(tracedReq).pipe(
      tap(
        (event: HttpResponse<any>) => {
          span.setAttributes(
            {
              'http.status_code': event.status,
              'http.status_text': event.statusText,
            }
          );
          if (this.logBody && event.body != null) {
            span.addEvent('response', { body: JSON.stringify(event.body) });
          }
          span.setStatus({
            code: SpanStatusCode.OK
          });
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
          span.setStatus({
            code: SpanStatusCode.ERROR
          });
        }
      ),
      finalize(() => {
        span.end();
        this.contextManager.disable();
      })
    );
  }

  /**
   * Get current scheme, hostname and port
   */
  private getURL() {
    return this.platformLocation.href;
  }

  /**
   * Initialise a span for a request intercepted
   * @param request request
   */
  private initSpan(request: HttpRequest<unknown>): Span {
     const urlRequest = (request.urlWithParams.startsWith('http')) ? new URL(request.urlWithParams) : new URL(this.getURL());
     const span = this.tracer
      .getTracer(name, version)
      .startSpan(
        `${urlRequest.protocol.replace(':', '').toUpperCase()} ${request.method.toUpperCase()}`,
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
    this.contextManager._currentContext = api.setSpan(
      this.contextManager.active(),
      span
    );
    return span;
  }

  /**
   * Add header propagator in request and conserve original header
   * @param request request
   */
  private injectContextAndHeader(
    request: HttpRequest<unknown>
  ) {
    const carrier = {};
    api.propagation.inject(
      this.contextManager.active(),
      carrier,
      api.defaultTextMapSetter
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
      return new ParentBasedSampler({ root: new AlwaysOnSampler() });
    }
    else if (sampleConfig <= 0) {
      return new ParentBasedSampler({ root: new AlwaysOffSampler() });
    } else {
      return new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(sampleConfig) });
    }
  }
}
