import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OTELCOL_EXPORTER } from '../exporter.interface';
import { ZipkinExporterService } from './zipkin-exporter.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OTELCOL_EXPORTER, useClass: ZipkinExporterService }
  ]
})
export class ZipkinExporterModule {
}
