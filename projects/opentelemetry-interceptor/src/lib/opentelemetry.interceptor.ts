import { Injectable, Optional } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import * as api from '@opentelemetry/api';
import { WebTracerProvider, StackContextManager } from '@opentelemetry/web';
import { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } from '@opentelemetry/tracing';
import { CollectorExporter } from '@opentelemetry/exporter-collector';
import { HttpTraceContext, ALWAYS_SAMPLER, setActiveSpan } from '@opentelemetry/core';
import { tap, finalize } from 'rxjs/operators';
import { OpentelemetryConfig } from './opentelemetry-config';

@Injectable()
export class OpentelemetryInterceptor implements HttpInterceptor {
  tracer: WebTracerProvider;
  contextManager = new StackContextManager();
  config: OpentelemetryConfig;

  constructor(@Optional() config?: OpentelemetryConfig) {
    this.config = config;
    this.initTracer();
  }

  /**
   * Initialisation du tracer
   */
  initTracer() {
    const collectorOptions = {
      serviceName: 'angular',
      url: (this.config && this.config.endpoint)? this.config.endpoint : '',
    };
    this.tracer = new WebTracerProvider({
      sampler: ALWAYS_SAMPLER,
    });
    const exporter = new CollectorExporter(collectorOptions);
    this.tracer.addSpanProcessor(new BatchSpanProcessor(exporter));
    this.tracer.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    this.tracer.register({
      propagator: new HttpTraceContext(),
      contextManager: this.contextManager,
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const span: api.Span = this.initSpan(request);
    const tracedReq = this.injectContextAndHeader(span, request);
    return next.handle(tracedReq)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              span.setAttribute("http.status_code", event.status)
              span.addEvent("response", { "body": JSON.stringify(event.body) })
            }
          },
          (event: HttpErrorResponse) => {
            if (event instanceof HttpErrorResponse) {
              span.setAttribute("http.status_code", event.status)
              span.addEvent("error", { "body": JSON.stringify(event.error) })
            }
          }
        ),
        finalize(() => {
          span.end();
        })
      );
  }

  private injectContextAndHeader(span: api.Span, request: HttpRequest<unknown>) {
    const carrier = {};
    api.propagation.inject(carrier, api.defaultSetter, this.contextManager.active());
    for (let key in request.headers.keys) {
      carrier[key] = request.headers.get(key);
    }
    const clone = request.clone({
      setHeaders: carrier
    });
    return clone;
  }

  private initSpan(request: HttpRequest<unknown>): api.Span {
    const span = this.tracer.getTracer("angular-interceptor", "0.0.1").startSpan(request.url, {
      attributes: {
        ["http.method"]: request.method,
        ["http.url"]: request.urlWithParams,
      },
    }, this.contextManager.active());
    this.contextManager._currentContext = setActiveSpan(this.contextManager.active(), span);
    return span;
  }
}
