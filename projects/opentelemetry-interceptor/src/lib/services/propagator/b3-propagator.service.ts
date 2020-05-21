import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { B3Propagator } from '@opentelemetry/core';
import { OpentelemetryInterceptorModule } from '../../opentelemetry-interceptor.module';

@Injectable({
  providedIn: "root",
})
export class B3PropagatorService implements IPropagator {
  getPropagator(): HttpTextPropagator {
    return new B3Propagator();
  }
}
