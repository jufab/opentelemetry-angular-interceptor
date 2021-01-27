import { Injectable, Inject } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { JaegerHttpTracePropagator } from '@opentelemetry/propagator-jaeger';
import { OpenTelemetryInjectConfig } from '../../../configuration/opentelemetry-config';
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
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    this.customHeader = config.jaegerPropagatorConfig?.customHeader;
  }

  /**
   * Return an JaegerHttpTracePropagator
   * @return TextMapPropagator as JaegerHttpTracePropagator
   */
  getPropagator(): TextMapPropagator {
    return new JaegerHttpTracePropagator(this.customHeader);
  }
}
