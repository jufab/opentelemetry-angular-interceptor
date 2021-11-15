import { NgModule } from '@angular/core';
import { OTLP__PROPAGATOR } from '../propagator.interface';
import { AwsXrayPropagatorService } from './aws-xray-propagator.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__PROPAGATOR, useClass: AwsXrayPropagatorService }
  ]
})
export class AwsXrayPropagatorModule {
}
