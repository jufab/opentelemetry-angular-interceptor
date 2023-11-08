import {
  APP_INITIALIZER,
  ClassProvider,
  ConstructorProvider,
  ExistingProvider,
  FactoryProvider,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  ValueProvider,
} from '@angular/core';
import {
  defineConfigProvider,
  OpenTelemetryConfig,
} from './configuration/opentelemetry-config';
import { InstrumentationService } from './services/instrumentation/instrumentation.service';

export const instruServiceLoader = (instrumentationService: InstrumentationService) => {
  const loader = () => instrumentationService.initInstrumentation();
  return loader;
};


@NgModule()
export class OtelWebTracerModule {

  constructor(
    @Optional() @SkipSelf() parentModule?: OtelWebTracerModule
  ) {
    if (parentModule) {
      throw new Error(
        'OtelWebTracerModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(
    config: OpenTelemetryConfig | null | undefined,
    configProvider?: ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider
  ): ModuleWithProviders<OtelWebTracerModule> {

    configProvider = defineConfigProvider(config, configProvider);

    return {
      ngModule: OtelWebTracerModule,
      providers: [
        configProvider,
        InstrumentationService,
        {
          provide: APP_INITIALIZER,
          useFactory: instruServiceLoader,
          deps: [InstrumentationService],
          multi: true
        }
      ],
    };
  }
}
