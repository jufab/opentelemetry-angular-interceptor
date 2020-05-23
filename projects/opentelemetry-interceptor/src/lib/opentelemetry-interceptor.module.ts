import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  OpenTelemetryConfig,
  OpenTelemetryInjectConfig,
} from './configuration/opentelemetry-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OpenTelemetryInterceptor } from './interceptor/opentelemetry.interceptor';

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

  public static forRoot(config: OpenTelemetryConfig): ModuleWithProviders {
    return {
      ngModule: OpenTelemetryInterceptorModule,
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpenTelemetryInterceptor,
          multi: true,
        },
      ],
    };
  }
}
