import { NgModule } from '@angular/core';
import { ConsoleSpanExporterService } from './console-span-exporter.service';
import { OTLP_EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_EXPORTER, useClass: ConsoleSpanExporterService }
  ]
})
export class ConsoleSpanExporterModule {
}
