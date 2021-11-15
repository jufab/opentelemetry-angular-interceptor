import { NgModule } from '@angular/core';
import { OTLP__EXPORTER } from '../exporter.interface';
import { ZipkinExporterService } from './zipkin-exporter.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__EXPORTER, useClass: ZipkinExporterService }
  ]
})
export class ZipkinExporterModule {
}
