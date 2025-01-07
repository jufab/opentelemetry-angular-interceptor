import { NgModule } from '@angular/core';
import { OtelcolProtoExporterService } from './otelcolproto-exporter.service';
import { OTEL_EXPORTER } from '../exporter.interface';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: OTEL_EXPORTER, useClass: OtelcolProtoExporterService },
  ],
})
export class OtelColProtoExporterModule {}
