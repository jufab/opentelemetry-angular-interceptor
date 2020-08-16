import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTextPropagatorService } from '../http-text-propagator.service';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HttpTextPropagatorService, useClass: HttpTraceContextPropagatorService }
  ]
})
export class  HttpTraceContextPropagatorModule {
}
