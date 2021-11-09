import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { W3CTraceContextPropagator } from '@opentelemetry/core';

/**
 * W3CTraceContextPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class W3CTraceContextPropagatorService implements IPropagator {
  /**
   * Return an W3CTraceContextPropagatorService
   *
   * @return TextMapPropagator as W3CTraceContextPropagatorService
   */
  getPropagator(): TextMapPropagator {
    return new W3CTraceContextPropagator();
  }
}
