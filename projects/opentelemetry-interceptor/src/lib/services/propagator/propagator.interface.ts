import { HttpTextPropagator } from '@opentelemetry/api';

export interface IPropagator {
  getPropagator(): HttpTextPropagator;
}
