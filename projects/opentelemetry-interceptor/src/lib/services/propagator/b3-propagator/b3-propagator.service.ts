import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { B3Propagator } from '@opentelemetry/core';

/**
 * B3PropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class B3PropagatorService implements IPropagator {
  /**
   * Return an B3Propagator
   * @return HttpTextPropagator as B3Propagator
   */
  getPropagator(): HttpTextPropagator {
    return new B3Propagator();
  }
}
