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
import { WebTracerProvider, StackContextManager } from '@opentelemetry/sdk-trace-web';
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
  BatchSpanProcessor,
  NoopSpanProcessor,
  BufferConfig
} from '@opentelemetry/sdk-trace-base';
import {
  AlwaysOnSampler,
  AlwaysOffSampler,
  TraceIdRatioBasedSampler,
  ParentBasedSampler,
} from '@opentelemetry/core';
import { SemanticResourceAttributes, SemanticAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { tap, finalize } from 'rxjs/operators';
import {
  OpenTelemetryConfig,
  OTEL_CONFIG,
} from '../configuration/opentelemetry-config';
import { version, name } from '../../version.json';
import { OTEL_EXPORTER, IExporter } from '../services/exporter/exporter.interface';
import { OTEL_PROPAGATOR, IPropagator } from '../services/propagator/propagator.interface';
import { OTEL_LOGGER, OTEL_CUSTOM_SPAN } from '../configuration/opentelemetry-config';
import { CustomSpan } from './custom-span.interface';

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
   *
   * @param config configuration
   * @param exporterService service exporter injected
   * @param propagatorService propagator injected
   * @param logger define logger
   * @param customSpan a customSpan interface to add attributes
   * @param platformLocation encapsulates all calls to DOM APIs
   */
  constructor(
    @Inject(OTEL_CONFIG) private config: OpenTelemetryConfig,
    @Inject(OTEL_EXPORTER)
    private exporterService: IExporter,
    @Inject(OTEL_PROPAGATOR)
    private propagatorService: IPropagator,
    @Optional() @Inject(OTEL_LOGGER)
    private logger: DiagLogger,
    @Optional() @Inject(OTEL_CUSTOM_SPAN)
    private customSpan: CustomSpan,
    private platformLocation: PlatformLocation
  ) {
    this.tracer = new WebTracerProvider({
      sampler: this.defineProbabilitySampler(this.convertStringToNumber(config.commonConfig.probabilitySampler)),
      resource: Resource.default().merge(
        new Resource({
          [SemanticResourceAttributes.SERVICE_NAME]: this.config.commonConfig.serviceName,
        })
      ),
    });
    this.insertOrNotSpanExporter();
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
   *
   * @param request the current request
   * @param next next
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.contextManager.disable(); //FIX - reinit contextManager for each http call
    this.contextManager.enable();
    const span: Span = this.initSpan(request);
    const tracedReq = this.injectContextAndHeader(request);
    return next.handle(tracedReq).pipe(
      tap(
        (event: HttpResponse<any>) => {
          span.setAttributes(
            {
              [SemanticAttributes.HTTP_STATUS_CODE]: event.status,
            }
          );
          if (this.logBody && event.body != null) {
            span.addEvent('response', { body: JSON.stringify(event.body) });
          }
          span.setStatus({
            code: SpanStatusCode.UNSET
          });
          this.setCustomSpan(span, request, event);
        },
        (event: HttpErrorResponse) => {
          span.setAttributes(
            {
              [SemanticAttributes.HTTP_STATUS_CODE]: event.status,
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
          this.setCustomSpan(span, request, event);
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
   *
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
            [SemanticAttributes.HTTP_METHOD]: request.method,
            [SemanticAttributes.HTTP_URL]: request.urlWithParams,
            [SemanticAttributes.HTTP_HOST]: urlRequest.host,
            [SemanticAttributes.HTTP_SCHEME]: urlRequest.protocol.replace(':', ''),
            [SemanticAttributes.HTTP_TARGET]: urlRequest.pathname + urlRequest.search,
            [SemanticAttributes.HTTP_USER_AGENT]: window.navigator.userAgent
          },
          kind: api.SpanKind.CLIENT,
        },
        this.contextManager.active()
      );
    /*eslint no-underscore-dangle: ["error", { "allow": ["_currentContext"] }]*/
    this.contextManager._currentContext = api.trace.setSpan(
      this.contextManager.active(),
      span
    );
    return span;
  }

  /**
   * Add header propagator in request and conserve original header
   *
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
   * Verify to insert or not a Span Exporter
   */
  private insertOrNotSpanExporter() {
    if(this.exporterService.getExporter()!==undefined) {
      this.insertSpanProcessorProductionMode();
      this.insertConsoleSpanExporter();
    } else {
      this.tracer.addSpanProcessor(new NoopSpanProcessor());
    }
  }

  /**
   * Insert in tracer the console span if config is true
   */
  private insertConsoleSpanExporter() {
    if (this.config.commonConfig.console) {
      this.tracer.addSpanProcessor(
        new SimpleSpanProcessor(new ConsoleSpanExporter())
      );
    }
  }

  /**
   * Insert BatchSpanProcessor in production mode
   * SimpleSpanProcessor otherwise
   */
  private insertSpanProcessorProductionMode() {
    const bufferConfig: BufferConfig = {
      maxExportBatchSize: this.convertStringToNumber(this.config.batchSpanProcessorConfig?.maxExportBatchSize),
      scheduledDelayMillis: this.convertStringToNumber(this.config.batchSpanProcessorConfig?.scheduledDelayMillis),
      exportTimeoutMillis: this.convertStringToNumber(this.config.batchSpanProcessorConfig?.exportTimeoutMillis),
      maxQueueSize: this.convertStringToNumber(this.config.batchSpanProcessorConfig?.maxQueueSize)
    };
    this.tracer.addSpanProcessor(
      this.config.commonConfig.production
        ? new BatchSpanProcessor(this.exporterService.getExporter(), bufferConfig)
        : new SimpleSpanProcessor(this.exporterService.getExporter())
    );
  }

  /**
   * define the Probability Sampler
   * By Default, it's always (or 1)
   *
   * @param sampleConfig the sample configuration
   */
  private defineProbabilitySampler(sampleConfig: number): Sampler {
    if (sampleConfig >= 1) {
      return new ParentBasedSampler({ root: new AlwaysOnSampler() });
    }
    else if (sampleConfig <= 0 || sampleConfig === undefined) {
      return new ParentBasedSampler({ root: new AlwaysOffSampler() });
    } else {
      return new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(sampleConfig) });
    }
  }

  /**
   * convert String to Number (or undefined)
   *
   * @param value
   * @returns number or undefined
   */
  private convertStringToNumber(value: string): number {
    return value !== undefined ? Number(value) : undefined;
  }

  /**
   * Set custom attributes in span with a CustomSpan
   *
   * @param span
   * @param request
   * @param response
   * @returns Span
   */
  private setCustomSpan(span: Span, request: HttpRequest<unknown>, response: HttpResponse<unknown> | HttpErrorResponse): Span {
    return this.customSpan != null ? this.customSpan.add(span, request, response) : span;
  }
}
