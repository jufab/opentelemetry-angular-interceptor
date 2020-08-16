import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTextPropagatorService } from '../http-text-propagator.service';
import { JaegerHttpTracePropagatorService } from './jaeger-http-trace-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HttpTextPropagatorService, useClass: JaegerHttpTracePropagatorService }
  ]
})
export class JaegerHttpTracePropagatorModule {
}
