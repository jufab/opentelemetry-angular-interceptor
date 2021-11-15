import { NgModule } from '@angular/core';
import { NoopTextMapPropagatorService } from './noop-text-map-propagator.service';
import { OTLP__PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__PROPAGATOR, useClass: NoopTextMapPropagatorService }
  ]
})
export class NoopTextMapPropagatorModule {
}
