import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopTextMapPropagatorService } from './noop-text-map-propagator.service';
import { OTELCOL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: OTELCOL_PROPAGATOR, useClass: NoopTextMapPropagatorService }
  ]
})
export class NoopTextMapPropagatorModule {
}
