import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMapPropagatorService } from '../text-map-propagator.service';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: TextMapPropagatorService, useClass: JaegerHttpTracePropagatorService }
  ]
})
export class JaegerHttpTracePropagatorModule {
}
