import { Injectable } from '@angular/core';
import { IPropagator } from '../propagator.interface';
import { TextMapPropagator } from '@opentelemetry/api';
import { AWSXRayPropagator } from '@opentelemetry/propagator-aws-xray';
/**
 * AwsXrayPropagatorService
 */
@Injectable({
  providedIn: 'root',
})
export class AwsXrayPropagatorService implements IPropagator {
  /**
   * Return an AwsXrayPropagator
   *
   * @return TextMapPropagator as AwsXrayPropagator
   */
  getPropagator(): TextMapPropagator {
    return new AWSXRayPropagator();
  }
}
