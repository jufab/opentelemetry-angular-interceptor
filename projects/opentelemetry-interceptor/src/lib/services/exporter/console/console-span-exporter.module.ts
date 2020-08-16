import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleSpanExporterService } from './console-span-exporter.service';
import { SpanExporterService } from '../span-exporter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: SpanExporterService, useClass: ConsoleSpanExporterService }
  ]
})
export class ConsoleSpanExporterModule {
}
