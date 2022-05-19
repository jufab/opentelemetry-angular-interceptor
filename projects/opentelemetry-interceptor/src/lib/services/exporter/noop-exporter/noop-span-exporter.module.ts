import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopSpanExporterService } from './noop-span-exporter.service';
import { OTEL_EXPORTER } from '../exporter.interface';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: OTEL_EXPORTER, useClass: NoopSpanExporterService }
  ]
})
export class NoopSpanExporterModule {
}
