import { NgModule } from '@angular/core';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { OTLP__EXPORTER } from '../exporter.interface';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP__EXPORTER, useClass: OtelcolExporterService },
  ]
})
export class OtelColExporterModule {
}
