import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: JaegerHttpTracePropagatorService }
  ]
})
export class JaegerHttpTracePropagatorModule {
}
