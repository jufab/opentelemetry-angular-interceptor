import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator, NoopHttpTextPropagator } from '@opentelemetry/api';

/**
 * NoopHttpTextPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class NoopHttpTextPropagatorService implements IPropagator {
  /**
   * Return an NoopHttpTextPropagator
   * @return HttpTextPropagator as NoopHttpTextPropagator
   */
  getPropagator(): HttpTextPropagator {
    return new NoopHttpTextPropagator();
  }
}
