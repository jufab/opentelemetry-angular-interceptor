import { NgModule } from '@angular/core';
import { W3CTraceContextPropagatorService } from './w3c-trace-context-propagator.service';
import { OTEL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_PROPAGATOR, useClass: W3CTraceContextPropagatorService }
  ]
})
export class W3CTraceContextPropagatorModule {
}
