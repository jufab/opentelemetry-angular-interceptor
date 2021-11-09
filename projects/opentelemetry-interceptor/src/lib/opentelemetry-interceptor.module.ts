import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  OpenTelemetryConfig,
  OTLP_CONFIG,
} from './configuration/opentelemetry-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OpenTelemetryHttpInterceptor } from './interceptor/opentelemetry-http.interceptor';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
})
export class OpenTelemetryInterceptorModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: OpenTelemetryInterceptorModule
  ) {
    if (parentModule) {
      throw new Error(
        'OpentelemetryInterceptorModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(config: OpenTelemetryConfig): ModuleWithProviders<OpenTelemetryInterceptorModule> {
    return {
      ngModule: OpenTelemetryInterceptorModule,
      providers: [
        { provide: OTLP_CONFIG, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpenTelemetryHttpInterceptor,
          multi: true,
        },
      ],
    };
  }
}
