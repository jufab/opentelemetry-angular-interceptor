import { NgModule } from '@angular/core';
import { OTLP_EXPORTER } from '../exporter.interface';
import { ZipkinExporterService } from './zipkin-exporter.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_EXPORTER, useClass: ZipkinExporterService }
  ]
})
export class ZipkinExporterModule {
}
