import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { SpanExporterService } from '../span-exporter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: SpanExporterService, useClass: OtelcolExporterService }
  ]
})
export class OtelColExporterModule {
}
