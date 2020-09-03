import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B3PropagatorService } from './b3-propagator.service';
import { TextMapPropagatorService } from '../text-map-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: TextMapPropagatorService, useClass: B3PropagatorService }
  ]
})
export class B3PropagatorModule {
}
