import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTextPropagatorService } from '../http-text-propagator.service';
import { NoopHttpTextPropagatorService } from './noop-http-text-propagator.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HttpTextPropagatorService, useClass: NoopHttpTextPropagatorService }
  ]
})
export class NoopHttpTextPropagatorModule {
}
