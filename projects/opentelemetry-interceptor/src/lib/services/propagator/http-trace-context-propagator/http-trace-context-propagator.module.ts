import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMapPropagatorService } from '../text-map-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: TextMapPropagatorService, useClass: HttpTraceContextPropagatorService }
  ]
})
export class  HttpTraceContextPropagatorModule {
}