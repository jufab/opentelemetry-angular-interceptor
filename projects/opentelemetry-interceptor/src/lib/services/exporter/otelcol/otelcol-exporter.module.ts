import { NgModule } from '@angular/core';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { OTLP_EXPORTER } from '../exporter.interface';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTLP_EXPORTER, useClass: OtelcolExporterService },
  ]
})
export class OtelColExporterModule {
}
