import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { NoopTextMapPropagator, TextMapPropagator } from '@opentelemetry/api';

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
