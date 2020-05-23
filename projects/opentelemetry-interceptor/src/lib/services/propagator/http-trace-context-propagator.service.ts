import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { HttpTraceContext } from '@opentelemetry/core';


/**
 * HttpTraceContextPropagatorService
 */
@Injectable({
  providedIn: "root",
})
export class HttpTraceContextPropagatorService implements IPropagator {
  /**
   * Return an HttpTraceContext
   * @return HttpTextPropagator as HttpTraceContext
   */
  getPropagator(): HttpTextPropagator {
    return new HttpTraceContext();
  }
}
