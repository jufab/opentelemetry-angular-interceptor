import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { HttpTraceContextPropagator } from '@opentelemetry/core';

/**
 * HttpTraceContextPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class HttpTraceContextPropagatorService implements IPropagator {
  /**
   * Return an HttpTraceContextPropagator
   *
   * @return TextMapPropagator as HttpTraceContextPropagator
   */
  getPropagator(): TextMapPropagator {
    return new HttpTraceContextPropagator();
  }
}
