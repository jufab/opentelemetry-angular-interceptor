import { Injectable, Inject } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { OTLP_CONFIG } from '../../../configuration/opentelemetry-config';
import { OpenTelemetryConfig } from '../../../../public-api';

/**
 * JaegerHttpTracePropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class JaegerHttpTracePropagatorService implements IPropagator {
  /**
   * custom Header
   */
  private customHeader: string;
  /**
   * Constructor
   *
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OTLP_CONFIG) config: OpenTelemetryConfig) {
    this.customHeader = config.jaegerPropagatorConfig?.customHeader;
  }

  /**
   * Return an JaegerPropagator
   *
   * @return TextMapPropagator as JaegerPropagator
   */
  getPropagator(): TextMapPropagator {
    return new JaegerPropagator(this.customHeader);
  }
}
