import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B3PropagatorService } from './b3-propagator.service';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: B3PropagatorService }
  ]
})
export class B3PropagatorModule {
}
