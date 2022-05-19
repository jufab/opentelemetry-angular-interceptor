import { NgModule } from '@angular/core';
import { OTEL_PROPAGATOR } from '../propagator.interface';
import { AwsXrayPropagatorService } from './aws-xray-propagator.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_PROPAGATOR, useClass: AwsXrayPropagatorService }
  ]
})
export class AwsXrayPropagatorModule {
}
