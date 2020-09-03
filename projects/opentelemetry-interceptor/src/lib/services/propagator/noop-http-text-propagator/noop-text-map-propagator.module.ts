import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMapPropagatorService } from '../text-map-propagator.service';
import { NoopTextMapPropagatorService } from './noop-text-map-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: TextMapPropagatorService, useClass: NoopTextMapPropagatorService }
  ]
})
export class NoopTextMapPropagatorModule {
}
