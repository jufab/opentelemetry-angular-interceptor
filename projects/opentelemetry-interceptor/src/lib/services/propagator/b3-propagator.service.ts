import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';

@Injectable()
export class B3PropagatorService implements IPropagator {

  constructor() { }
  getPropagator(): import("@opentelemetry/api").HttpTextPropagator {
    throw new Error("Method not implemented.");
  }
}
