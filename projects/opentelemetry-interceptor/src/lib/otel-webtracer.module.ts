import {
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
import { OtelWebTracerComponent } from './component/otel-webtracer/otel-webtracer.component';
import { InstrumentationService } from './services/instrumentation/instrumentation.service';

@NgModule({
  declarations: [OtelWebTracerComponent],
  exports: [OtelWebTracerComponent]
})
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

    configProvider = defineConfigProvider(config,configProvider);

    return {
      ngModule: OtelWebTracerModule,
      providers: [
        configProvider,
        InstrumentationService
      ],
    };
  }
}
