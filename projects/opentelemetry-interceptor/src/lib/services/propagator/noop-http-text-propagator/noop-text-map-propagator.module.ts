import { NgModule } from '@angular/core';
import { NoopTextMapPropagatorService } from './noop-text-map-propagator.service';
import { OTEL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_PROPAGATOR, useClass: NoopTextMapPropagatorService }
  ]
})
export class NoopTextMapPropagatorModule {
}
