import { TestBed } from '@angular/core/testing';
import { AWSXRayPropagator } from '@opentelemetry/propagator-aws-xray';
import { AwsXrayPropagatorService } from './aws-xray-propagator.service';


describe('AwsXrayPropagatorService', () => {
  let service: AwsXrayPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsXrayPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getPropagator()).toBeInstanceOf(AWSXRayPropagator);
  });
});
