import { HttpTextPropagator } from '@opentelemetry/api';

/**
 * Interface to define propagator
 */
export interface IPropagator {
  /**
   * give an implementation of a propagator
   * @return HttpTextPropagator
   */
  getPropagator(): HttpTextPropagator;
}
