import { Inject, Injectable } from '@angular/core';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';
import { InstrumentationOption, registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { WebTracerProvider } from '@opentelemetry/web';
import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/tracing';
import { OpenTelemetryInjectConfig, OpenTelemetryConfig, InstrumentationConfig } from '../../configuration/opentelemetry-config';
import { OTELCOL_EXPORTER, IExporter } from '../exporter/exporter.interface';
import { OTELCOL_PROPAGATOR, IPropagator } from '../propagator/propagator.interface';


/**
 * InstrumentationService.
 * Service for component to add instrumentation.
 */
@Injectable({
  providedIn: 'root'
})
export class InstrumentationService {

  /**
   * tracerProvider
   */
  private tracerProvider = new WebTracerProvider();

  /**
   * contextManager
   */
  private contextManager = new ZoneContextManager();

  /**
   * instrumentationOptions
   */
  private instrumentationOptions: InstrumentationOption[];

  /**
   * Constructor
   * @param config
   * @param exporterService
   * @param propagatorService
   */
  constructor(@Inject(OpenTelemetryInjectConfig) private config: OpenTelemetryConfig,
    @Inject(OTELCOL_EXPORTER)
    private exporterService: IExporter,
    @Inject(OTELCOL_PROPAGATOR)
    private propagatorService: IPropagator) { }

  /**
   * Init instrumentation on init
   */
  public initInstrumentation() {
    this.insertConsoleSpanExporter(this.config.commonConfig.console);
    this.insertSpanProcessorProductionMode(this.config.commonConfig.production, this.exporterService);
    this.addInstrumentationPlugin(this.config.instrumentationConfig);

    this.tracerProvider.register({
      contextManager: this.contextManager,
      propagator: this.propagatorService.getPropagator()
    });

    registerInstrumentations({
      instrumentations: this.instrumentationOptions,
      tracerProvider: this.tracerProvider,
    });

  }

  /**
   * Insert in tracer the console span if config is true
   * @param console config to insert console span
   */
  private insertConsoleSpanExporter(console: boolean) {
    if (console) {
      this.tracerProvider.addSpanProcessor(
        new SimpleSpanProcessor(new ConsoleSpanExporter())
      );
    }
  }

  /**
   * Insert BatchSpanProcessor in production mode
   * SimpleSpanProcessor otherwise
   * @param boolean production
   * @param IExporter exporter
   */
  private insertSpanProcessorProductionMode(
    production: boolean,
    exporter: IExporter
  ) {
    this.tracerProvider.addSpanProcessor(
      production
        ? new BatchSpanProcessor(exporter.getExporter())
        : new SimpleSpanProcessor(exporter.getExporter())
    );
  }

  /**
   * Enable plugin instrumentation
   * @param instrumentationConfig
   */
  private addInstrumentationPlugin(instrumentationConfig: InstrumentationConfig) {
    this.instrumentationOptions = [
      new XMLHttpRequestInstrumentation({ enabled: instrumentationConfig?.xmlHttpRequest }),
      new DocumentLoadInstrumentation({ enabled: instrumentationConfig?.documentLoad }),
      new FetchInstrumentation({ enabled: instrumentationConfig?.fetch })
    ]
  }
}
