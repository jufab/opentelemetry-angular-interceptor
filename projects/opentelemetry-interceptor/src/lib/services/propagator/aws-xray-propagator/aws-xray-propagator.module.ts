import { NgModule } from '@angular/core';
import { OTLP_PROPAGATOR } from '../propagator.interface';
import { AwsXrayPropagatorService } from './aws-xray-propagator.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_PROPAGATOR, useClass: AwsXrayPropagatorService }
  ]
})
export class AwsXrayPropagatorModule {
}
