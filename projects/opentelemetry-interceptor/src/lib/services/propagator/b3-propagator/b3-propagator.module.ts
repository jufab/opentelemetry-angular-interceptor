import { NgModule } from '@angular/core';
import { B3PropagatorService } from './b3-propagator.service';
import { OTLP_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_PROPAGATOR, useClass: B3PropagatorService }
  ]
})
export class B3PropagatorModule {
}
