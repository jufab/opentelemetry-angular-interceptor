import { NgModule } from '@angular/core';
import { ConsoleSpanExporterService } from './console-span-exporter.service';
import { OTEL_EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_EXPORTER, useClass: ConsoleSpanExporterService }
  ]
})
export class ConsoleSpanExporterModule {
}
