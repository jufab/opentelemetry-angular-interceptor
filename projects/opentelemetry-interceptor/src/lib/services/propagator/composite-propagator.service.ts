import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { CompositePropagator, B3Propagator, HttpTraceContext } from '@opentelemetry/core';
/**
 * CompositePropagatorService
 */
@Injectable({
  providedIn: 'root'
})
export class CompositePropagatorService implements IPropagator {

  /**
   * Return an CompositePropagator
   * @return HttpTextPropagator as CompositePropagator
   */
  getPropagator(): HttpTextPropagator {
    return new CompositePropagator({
      propagators: [new B3Propagator(), new HttpTraceContext()],
    });
  }
}
