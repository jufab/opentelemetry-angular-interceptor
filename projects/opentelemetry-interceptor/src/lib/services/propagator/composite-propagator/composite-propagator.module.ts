import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTextPropagatorService } from '../http-text-propagator.service';
import { CompositePropagatorService } from './composite-propagator.service';
import { B3PropagatorModule } from '../b3-propagator/b3-propagator.module';
import { HttpTraceContextPropagatorModule } from '../http-trace-context-propagator/http-trace-context-propagator.module';
import { JaegerHttpTracePropagatorModule } from '../jaeger-http-trace-propagator/jaeger-http-trace-propagator.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HttpTextPropagatorService, useClass: CompositePropagatorService }
  ]
})
export class CompositePropagatorModule {
}
