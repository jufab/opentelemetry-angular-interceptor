import { NgModule } from '@angular/core';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
import { OTLP__PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__PROPAGATOR, useClass: JaegerHttpTracePropagatorService }
  ]
})
export class JaegerHttpTracePropagatorModule {
}
