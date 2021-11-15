import { NgModule } from '@angular/core';
import { W3CTraceContextPropagatorService } from './w3c-trace-context-propagator.service';
import { OTLP__PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__PROPAGATOR, useClass: W3CTraceContextPropagatorService }
  ]
})
export class W3CTraceContextPropagatorModule {
}
