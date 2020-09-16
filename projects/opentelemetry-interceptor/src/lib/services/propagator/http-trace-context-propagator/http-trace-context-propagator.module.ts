import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: HttpTraceContextPropagatorService }
  ]
})
export class  HttpTraceContextPropagatorModule {
}
