import { NgModule } from '@angular/core';
import { CompositePropagatorService } from './composite-propagator.service';
import { OTLP__PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__PROPAGATOR, useClass: CompositePropagatorService }
  ]
})
export class  CompositePropagatorModule {
}
