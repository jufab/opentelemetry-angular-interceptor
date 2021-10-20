import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';
import { AwsXrayPropagatorService } from './aws-xray-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: AwsXrayPropagatorService }
  ]
})
export class AwsXrayPropagatorModule {
}
