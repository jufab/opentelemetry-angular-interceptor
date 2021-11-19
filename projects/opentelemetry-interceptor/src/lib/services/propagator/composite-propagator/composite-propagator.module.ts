import { NgModule } from '@angular/core';
import { CompositePropagatorService } from './composite-propagator.service';
import { OTLP_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_PROPAGATOR, useClass: CompositePropagatorService }
  ]
})
export class  CompositePropagatorModule {
}
