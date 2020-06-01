import { Injectable, Inject } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import {
  CompositePropagator,
  B3Propagator,
  HttpTraceContext,
} from '@opentelemetry/core';
import { JaegerHttpTracePropagator } from '@opentelemetry/propagator-jaeger';
import { B3PropagatorService } from './b3-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
/**
 * CompositePropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class CompositePropagatorService implements IPropagator {
  /**
   * Constructor
   * @param config OpenTelemetryConfig
   */
  constructor(
    @Inject(B3PropagatorService)
    private b3PropagatorService: B3PropagatorService,
    @Inject(HttpTraceContextPropagatorService)
    private httpTraceContextPropagatorService: HttpTraceContextPropagatorService,
    @Inject(JaegerHttpTracePropagatorService)
    private jaegerHttpTracePropagatorService: JaegerHttpTracePropagatorService
  ) {}

  /**
   * Return an CompositePropagator
   * @return HttpTextPropagator as CompositePropagator
   */
  getPropagator(): HttpTextPropagator {
    return new CompositePropagator({
      propagators: [
        this.b3PropagatorService.getPropagator(),
        this.httpTraceContextPropagatorService.getPropagator(),
        this.jaegerHttpTracePropagatorService.getPropagator(),
      ],
    });
  }
}
