import { Injectable, Inject } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import {
  CompositePropagator,
} from '@opentelemetry/core';
import { B3PropagatorService } from '../b3-propagator/b3-propagator.service';
import { HttpTraceContextPropagatorService } from '../http-trace-context-propagator/http-trace-context-propagator.service';
import { JaegerHttpTracePropagatorService } from '../jaeger-http-trace-propagator/jaeger-http-trace-propagator.service';
/**
 * CompositePropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class CompositePropagatorService implements IPropagator {
  /**
   * Constructor
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
   * @return TextMapPropagator as CompositePropagator
   */
  getPropagator(): TextMapPropagator {
    return new CompositePropagator({
      propagators: [
        this.b3PropagatorService.getPropagator(),
        this.httpTraceContextPropagatorService.getPropagator(),
        this.jaegerHttpTracePropagatorService.getPropagator(),
      ],
    });
  }
}
