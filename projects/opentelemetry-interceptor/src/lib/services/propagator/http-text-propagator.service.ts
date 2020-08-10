import { HttpTextPropagator } from '@opentelemetry/api';
import { IPropagator } from './propagator.interface';

/**
 * HttpTextPropagatorService
 */
export class HttpTextPropagatorService implements IPropagator {
  /**
   * Not used, just a definition for injection
   */
  getPropagator(): HttpTextPropagator {
    return undefined;
  }
}
