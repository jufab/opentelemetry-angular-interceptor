import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  OpentelemetryConfig,
  OpentelemetryInjectConfig,
} from './opentelemetry-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OpentelemetryInterceptor } from './opentelemetry.interceptor';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
})
export class OpentelemetryInterceptorModule {
  public static forRoot(config: OpentelemetryConfig): ModuleWithProviders {
    return {
      ngModule: OpentelemetryInterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpentelemetryInterceptor,
          multi: true,
        },
        { provide: OpentelemetryInjectConfig, useValue: config },
      ],
    };
  }
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: OpentelemetryInterceptorModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OpentelemetryInterceptor,
          multi: true,
        },
      ],
    };
  }
}
