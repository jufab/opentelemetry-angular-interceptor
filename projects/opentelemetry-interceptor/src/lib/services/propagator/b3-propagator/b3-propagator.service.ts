import { Injectable, Inject } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { B3Propagator, B3PropagatorConfig, B3InjectEncoding } from '@opentelemetry/core';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from '../../../configuration/opentelemetry-config';

/**
 * B3PropagatorService
 *
 * Can be a single or multi header.
 *
 * See Configuration for more information
 */
@Injectable({
  providedIn: 'root',
})
export class B3PropagatorService implements IPropagator {
  private b3PropagatorConfig: B3PropagatorConfig;

  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig) {
    this.b3PropagatorConfig = {
      injectEncoding: B3PropagatorService.defineB3Encoding(config.b3PropagatorConfig?.multiHeader)
    };
  }

  /**
   * Define if it's a single or multi header
   * @param value string (0 => single header, 1 => Multi Header)
   * @return B3InjectEncoding
   */
  private static defineB3Encoding(value: string): B3InjectEncoding {
    if (value && '0' === value) {
      return B3InjectEncoding.SINGLE_HEADER;
    }
    return B3InjectEncoding.MULTI_HEADER;
  }

  /**
   * Return an B3Propagator
   * @return TextMapPropagator as B3Propagator
   */
  getPropagator(): TextMapPropagator {
    return new B3Propagator(this.b3PropagatorConfig);
  }
}
