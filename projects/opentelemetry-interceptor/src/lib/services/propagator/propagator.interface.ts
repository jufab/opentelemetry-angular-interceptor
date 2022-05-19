import { InjectionToken } from '@angular/core';
import { TextMapPropagator } from '@opentelemetry/api';

/**
 * Interface to define propagator
 */
export interface IPropagator {
  /**
   * give an implementation of a propagator
   *
   * @return HttpTextPropagator
   */
  getPropagator(): TextMapPropagator;
}

/** injection for a propagator */
export const OTEL_PROPAGATOR = new InjectionToken<IPropagator>('otelcol.propagator');
