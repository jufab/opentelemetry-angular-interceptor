import { NgModule } from '@angular/core';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { OTEL_EXPORTER } from '../exporter.interface';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_EXPORTER, useClass: OtelcolExporterService },
  ]
})
export class OtelColExporterModule {
}
