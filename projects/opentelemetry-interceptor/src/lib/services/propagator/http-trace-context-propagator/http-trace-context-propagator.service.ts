import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { HttpTraceContext } from '@opentelemetry/core';

/**
 * HttpTraceContextPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class HttpTraceContextPropagatorService implements IPropagator {
  /**
   * Return an HttpTraceContext
   * @return TextMapPropagator as HttpTraceContext
   */
  getPropagator(): TextMapPropagator {
    return new HttpTraceContext();
  }
}
