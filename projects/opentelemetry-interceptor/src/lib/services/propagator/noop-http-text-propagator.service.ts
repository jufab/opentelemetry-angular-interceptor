import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator, NoopHttpTextPropagator } from '@opentelemetry/api';

@Injectable({
  providedIn: 'root',
})
export class NoopHttpTextPropagatorService implements IPropagator {
  constructor() {}
  getPropagator(): HttpTextPropagator {
    return new NoopHttpTextPropagator();
  }
}
