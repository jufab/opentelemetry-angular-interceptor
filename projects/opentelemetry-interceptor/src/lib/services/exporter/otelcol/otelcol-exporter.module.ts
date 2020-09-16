import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { OTELCOL_EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OTELCOL_EXPORTER, useClass: OtelcolExporterService }
  ]
})
export class OtelColExporterModule {
}
