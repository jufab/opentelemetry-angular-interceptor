import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B3PropagatorService } from './b3-propagator.service';
import { HttpTextPropagatorService } from '../http-text-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HttpTextPropagatorService, useClass: B3PropagatorService }
  ]
})
export class B3PropagatorModule {
}
