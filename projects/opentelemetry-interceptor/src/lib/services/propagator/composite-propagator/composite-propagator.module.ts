import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMapPropagatorService } from '../text-map-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: TextMapPropagatorService, useClass: CompositePropagatorService }
  ]
})
export class CompositePropagatorModule {
}
