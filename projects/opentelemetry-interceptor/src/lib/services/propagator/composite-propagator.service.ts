import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { CompositePropagator } from '@opentelemetry/core';


//TODO: A Revoir car pas de config
@Injectable({
  providedIn: "root",
})
export class CompositePropagatorService implements IPropagator {
  getPropagator(): HttpTextPropagator {
    return new CompositePropagator();
  }
}
