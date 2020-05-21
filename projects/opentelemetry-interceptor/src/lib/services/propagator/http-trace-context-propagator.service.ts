import { Injectable } from '@angular/core';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { HttpTraceContext } from '@opentelemetry/core';
import { OpentelemetryInterceptorModule } from '../../opentelemetry-interceptor.module';


@Injectable({
  providedIn: "root",
})
export class HttpTraceContextPropagatorService implements IPropagator {
  getPropagator(): HttpTextPropagator {
    return new HttpTraceContext();
  }
}
