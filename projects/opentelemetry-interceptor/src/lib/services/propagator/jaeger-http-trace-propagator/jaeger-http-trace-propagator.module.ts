import { NgModule } from '@angular/core';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';
import { OTEL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_PROPAGATOR, useClass: JaegerHttpTracePropagatorService }
  ]
})
export class JaegerHttpTracePropagatorModule {
}
