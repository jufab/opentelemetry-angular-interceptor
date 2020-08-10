import { Injectable, Inject } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
//import { JaegerHttpTracePropagator } from '@opentelemetry/propagator-jaeger';
import { NoopHttpTextPropagator } from '@opentelemetry/api';
import { OpenTelemetryInjectConfig } from '../../../configuration/opentelemetry-config';
import { OpenTelemetryConfig } from '../../../../public-api';

/**
 * JaegerHttpTracePropagatorService
 * TODO : wait the next version (incompatible 0.8.0)
 */
@Injectable({
  providedIn: 'root',
})
export class JaegerHttpTracePropagatorService implements IPropagator {
  private customHeader: string;
  /**
   * Constructor
   * @param config OpenTelemetryConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    this.customHeader = config.jaegerPropagatorConfig?.customHeader;
  }

  /**
   * Return an HttpTraceContext
   * @return HttpTextPropagator as HttpTraceContext
   */
  getPropagator(): HttpTextPropagator {
    return new NoopHttpTextPropagator();
    // return new JaegerHttpTracePropagator(this.customHeader);
  }
}
