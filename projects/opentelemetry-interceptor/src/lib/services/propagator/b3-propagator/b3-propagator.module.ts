import { NgModule } from '@angular/core';
import { B3PropagatorService } from './b3-propagator.service';
import { OTEL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_PROPAGATOR, useClass: B3PropagatorService }
  ]
})
export class B3PropagatorModule {
}
