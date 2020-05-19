import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';

export class HttpTextPropagatorService implements IPropagator {
  constructor(private httpTextPropagator: HttpTextPropagator) {}
  getPropagator(): HttpTextPropagator {
    return this.httpTextPropagator;
  }
}
