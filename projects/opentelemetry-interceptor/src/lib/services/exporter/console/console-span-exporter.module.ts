import { NgModule } from '@angular/core';
import { ConsoleSpanExporterService } from './console-span-exporter.service';
import { OTLP__EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__EXPORTER, useClass: ConsoleSpanExporterService }
  ]
})
export class ConsoleSpanExporterModule {
}
