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
  ],
})
export class HttpTextPropagatorService implements IPropagator {
  /**
   * Not used in a factory, just a definition
   */
  getPropagator(): HttpTextPropagator {
    //factory
    console.error('error');
    return undefined;
  }
}

/**
 * httpTextPropagatorServiceFactory
 * Provide a factory to have a propagator service
 * @param config
 * @param httpTraceContextPropagatorService
 * @param b3PropagatorService
 */
export function httpTextPropagatorServiceFactory(
  config: OpenTelemetryConfig,
  httpTraceContextPropagatorService: HttpTraceContextPropagatorService,
  b3PropagatorService: B3PropagatorService
) {
  let propagator: IPropagator = null;
  switch (config.commonConfig.propagator) {
    case Propagator.b3:
      propagator = b3PropagatorService;
      break;
    case Propagator.httpTrace:
      propagator = httpTraceContextPropagatorService;
      break;
    default:
      break;
  }
  return propagator;
}
