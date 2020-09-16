import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompositePropagatorService } from './composite-propagator.service';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: CompositePropagatorService }
  ]
})
export class CompositePropagatorModule {
}
