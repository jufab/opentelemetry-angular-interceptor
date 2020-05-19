import { FactoryProvider } from '@angular/core';
import {
  OpentelemetryInjectConfig,
  OpentelemetryConfig,
  Propagator,
} from '../../configuration/opentelemetry-config';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { B3PropagatorService } from './b3-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';
import { IPropagator } from './propagator.interface';
import { HttpTextPropagatorService } from './http-text-propagator.service';

export class PropagatorServiceProvider implements FactoryProvider {
  provide: HttpTextPropagatorService;
  multi?: boolean = false;
  useFactory: Function = (
    config: OpentelemetryConfig,
    httpTraceContextPropagatorService: HttpTraceContextPropagatorService,
    b3PropagatorService: B3PropagatorService,
    compositePropagatorService: CompositePropagatorService
  ) => {
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
        break;
    }
    return new HttpTextPropagatorService(propagator?.getPropagator());
  };
  deps = [
    OpentelemetryInjectConfig,
    HttpTraceContextPropagatorService,
    B3PropagatorService,
    CompositePropagatorService,
  ];
}
