import { NgModule } from '@angular/core';
import { NoopTextMapPropagatorService } from './noop-text-map-propagator.service';
import { OTLP_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_PROPAGATOR, useClass: NoopTextMapPropagatorService }
  ]
})
export class NoopTextMapPropagatorModule {
}
