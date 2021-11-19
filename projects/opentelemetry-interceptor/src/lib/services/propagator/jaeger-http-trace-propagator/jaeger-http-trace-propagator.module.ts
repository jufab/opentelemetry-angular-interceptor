import { NgModule } from '@angular/core';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
import { OTLP_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_PROPAGATOR, useClass: JaegerHttpTracePropagatorService }
  ]
})
export class JaegerHttpTracePropagatorModule {
}
