import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpanExporterService } from '../span-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: SpanExporterService, useClass: ZipkinExporterService }
  ]
})
export class ZipkinExporterModule {
}
