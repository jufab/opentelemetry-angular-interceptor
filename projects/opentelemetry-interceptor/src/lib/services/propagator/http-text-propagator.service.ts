import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { Injectable } from '@angular/core';
import {
  OpenTelemetryConfig,
  Propagator,
  OpenTelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { B3PropagatorService } from './b3-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';
import { NoopHttpTextPropagatorService } from './noop-http-text-propagator.service';

/**
 * HttpTextPropagatorService
 * Injected service with factory to get a propagator by configuration
 */
@Injectable({
  providedIn: 'root',
  useFactory: httpTextPropagatorServiceFactory,
  deps: [
    OpenTelemetryInjectConfig,
    HttpTraceContextPropagatorService,
    B3PropagatorService,
    CompositePropagatorService,
    NoopHttpTextPropagatorService,
  ],
})
export class HttpTextPropagatorService implements IPropagator {
  /**
   * Not used in a factory, just a definition
   */
  getPropagator(): HttpTextPropagator {
    // factory
    console.error('error');
    return undefined;
  }
}

/**
 * httpTextPropagatorServiceFactory
 * Provide a factory to have a propagator service
 * @param config config
 * @param httpTraceContextPropagatorService httpTraceContext
 * @param b3PropagatorService propagator
 * @param compositePropagatorService  composite
 * @param noopHttpTextPropagatorService noop
 */
export function httpTextPropagatorServiceFactory(
  config: OpenTelemetryConfig,
  httpTraceContextPropagatorService: HttpTraceContextPropagatorService,
  b3PropagatorService: B3PropagatorService,
  compositePropagatorService: CompositePropagatorService,
  noopHttpTextPropagatorService: NoopHttpTextPropagatorService
) {
  let propagator: IPropagator = null;
  switch (config.commonConfig.propagator) {
    case Propagator.b3:
      propagator = b3PropagatorService;
      break;
    case Propagator.httpTrace:
      propagator = httpTraceContextPropagatorService;
      break;
    case Propagator.composite:
      propagator = compositePropagatorService;
      break;
    default:
      propagator = noopHttpTextPropagatorService;
      break;
  }
  return propagator;
}
