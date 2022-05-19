import { NgModule } from '@angular/core';
import { OTEL_EXPORTER } from '../exporter.interface';
import { ZipkinExporterService } from './zipkin-exporter.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_EXPORTER, useClass: ZipkinExporterService }
  ]
})
export class ZipkinExporterModule {
}
