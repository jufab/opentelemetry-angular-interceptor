import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { W3CTraceContextPropagatorService } from './w3c-trace-context-propagator.service';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: W3CTraceContextPropagatorService }
  ]
})
export class W3CTraceContextPropagatorModule {
}
