import { TextMapPropagator } from '@opentelemetry/api';
import { IPropagator } from './propagator.interface';

/**
 * TextMapPropagatorService
 */
export class TextMapPropagatorService implements IPropagator {
  /**
   * Not used, just a definition for injection
   */
  getPropagator(): TextMapPropagator {
    return undefined;
  }
}
