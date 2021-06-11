import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { NoopTextMapPropagator } from '@opentelemetry/api/build/src/propagation/NoopTextMapPropagator';
/**
 * NoopHttpTextPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class NoopTextMapPropagatorService implements IPropagator {
  /**
   * Return an NoopTextMapPropagator
   * @return TextMapPropagator as NoopTextMapPropagator
   */
  getPropagator(): TextMapPropagator {
    return new NoopTextMapPropagator();
  }
}

