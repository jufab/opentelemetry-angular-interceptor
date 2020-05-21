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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpentelemetryInterceptor,
          multi: true,
        },
      ],
    };
  }
}
