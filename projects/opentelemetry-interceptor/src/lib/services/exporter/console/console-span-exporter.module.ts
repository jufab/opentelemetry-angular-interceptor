import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleSpanExporterService } from './console-span-exporter.service';
import { OTELCOL_EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OTELCOL_EXPORTER, useClass: ConsoleSpanExporterService }
  ]
})
export class ConsoleSpanExporterModule {
}
