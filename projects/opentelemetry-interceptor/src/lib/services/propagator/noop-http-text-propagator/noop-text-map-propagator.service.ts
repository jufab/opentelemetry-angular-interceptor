import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
/**
 * NoopHttpTextPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class NoopTextMapPropagatorService implements IPropagator {
  /**
   * Return null
   *
   * @return TextMapPropagator as null
   */
  getPropagator(): TextMapPropagator {
    return null;
  }
}

