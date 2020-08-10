import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpanExporterService } from '../span-exporter.service';
import { JaegerExporterService } from './jaeger-exporter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: SpanExporterService, useClass: JaegerExporterService }
  ]
})
export class JaegerExporterModule {
}
