import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  OpentelemetryConfig,
  OpentelemetryInjectConfig,
} from './configuration/opentelemetry-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OpentelemetryInterceptor } from './interceptor/opentelemetry.interceptor';
import { ExporterServiceProvider } from './services/exporter/exporter.service.provider';
import { JaegerExporterService } from './services/exporter/jaeger-exporter.service';
import { ZipkinExporterService } from './services/exporter/zipkin-exporter.service';
import { OtelcolExporterService } from './services/exporter/otelcol-exporter.service';
import { PropagatorServiceProvider } from './services/propagator/propagator-service.provider';
import { B3PropagatorService } from './services/propagator/b3-propagator.service';
import { HttpTraceContextPropagatorService } from './services/propagator/http-trace-context-propagator.service';
import { CompositePropagatorService } from './services/propagator/composite-propagator.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
})
export class OpentelemetryInterceptorModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: OpentelemetryInterceptorModule
  ) {
    if (parentModule) {
      throw new Error(
        'OpentelemetryInterceptorModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(config: OpentelemetryConfig): ModuleWithProviders {
    return {
      ngModule: OpentelemetryInterceptorModule,
      providers: [
        { provide: OpentelemetryInjectConfig, useValue: config },
        JaegerExporterService,
        ZipkinExporterService,
        OtelcolExporterService,
        B3PropagatorService,
        HttpTraceContextPropagatorService,
        CompositePropagatorService,
        OpentelemetryInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpentelemetryInterceptor,
          multi: true,
        },
        ExporterServiceProvider,
        PropagatorServiceProvider,
      ],
    };
  }
}
