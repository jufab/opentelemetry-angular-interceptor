import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopSpanExporterService } from './noop-span-exporter.service';
import { OTLP_EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OTLP_EXPORTER, useClass: NoopSpanExporterService }
  ]
})
export class NoopSpanExporterModule {
}
