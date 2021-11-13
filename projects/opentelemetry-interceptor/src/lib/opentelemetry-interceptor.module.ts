import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
  ValueProvider,
  ClassProvider,
  ConstructorProvider,
  ExistingProvider,
  FactoryProvider,
} from '@angular/core';
import {
  defineConfigProvider,
  OpenTelemetryConfig,
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

  public static forRoot(
    config: OpenTelemetryConfig | null | undefined,
    configProvider?: ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider
    ): ModuleWithProviders<OpenTelemetryInterceptorModule> {

      //Interceptor
      const interceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: OpenTelemetryHttpInterceptor,
        multi: true,
      };

      configProvider = defineConfigProvider(config,configProvider);

    return {
      ngModule: OpenTelemetryInterceptorModule,
      providers: [
        configProvider,
        interceptorProvider,
      ],
    };
  }

}
