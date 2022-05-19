import { NgModule } from '@angular/core';
import { CompositePropagatorService } from './composite-propagator.service';
import { OTEL_PROPAGATOR } from '../propagator.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_PROPAGATOR, useClass: CompositePropagatorService }
  ]
})
export class  CompositePropagatorModule {
}
