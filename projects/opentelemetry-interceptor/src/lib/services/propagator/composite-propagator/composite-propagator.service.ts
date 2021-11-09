import { Injectable, Inject } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { CompositePropagator } from '@opentelemetry/core';
import { B3PropagatorService } from '../b3-propagator/b3-propagator.service';
import { W3CTraceContextPropagatorService } from '../w3c-trace-context-propagator/w3c-trace-context-propagator.service';
import { JaegerHttpTracePropagatorService } from '../jaeger-http-trace-propagator/jaeger-http-trace-propagator.service';
import { AwsXrayPropagatorService } from '../aws-xray-propagator/aws-xray-propagator.service';
/**
 * CompositePropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class CompositePropagatorService implements IPropagator {
  /**
   * Constructor
   */
  constructor(
    @Inject(B3PropagatorService)
    private b3PropagatorService: B3PropagatorService,
    @Inject(W3CTraceContextPropagatorService)
    private w3cTraceContextPropagatorService: W3CTraceContextPropagatorService,
    @Inject(JaegerHttpTracePropagatorService)
    private jaegerHttpTracePropagatorService: JaegerHttpTracePropagatorService,
    @Inject(AwsXrayPropagatorService)
    private awsXrayPropagatorService: AwsXrayPropagatorService
  ) {}

  /**
   * Return an CompositePropagator
   *
   * @return TextMapPropagator as CompositePropagator
   */
  getPropagator(): TextMapPropagator {
    return new CompositePropagator({
      propagators: [
        this.b3PropagatorService.getPropagator(),
        this.w3cTraceContextPropagatorService.getPropagator(),
        this.jaegerHttpTracePropagatorService.getPropagator(),
        this.awsXrayPropagatorService.getPropagator()
      ],
    });
  }
}
