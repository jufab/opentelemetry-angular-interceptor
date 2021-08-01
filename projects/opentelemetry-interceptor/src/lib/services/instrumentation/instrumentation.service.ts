import { Inject, Injectable } from '@angular/core';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';
import { Sampler } from '@opentelemetry/api';
import {
  AlwaysOnSampler,
  AlwaysOffSampler,
  TraceIdRatioBasedSampler,
  ParentBasedSampler,
} from '@opentelemetry/core';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
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
  private tracerProvider: WebTracerProvider;

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
    private propagatorService: IPropagator) {
      this.tracerProvider = new WebTracerProvider({
        sampler: this.defineProbabilitySampler(this.convertStringToNumber(this.config.commonConfig.probabilitySampler)),
        resource: Resource.default().merge(
          new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: this.config.commonConfig.serviceName,
          })
        ),
      });
    }

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

  /**
   * convert String to Number (or undefined)
   * @param value
   * @returns number or undefined
   */
  private convertStringToNumber(value: string): number {
    return value !== undefined ? Number(value) : undefined
  }

  /**
 * define the Probability Sampler
 * By Default, it's always (or 1)
 * @param sampleConfig the sample configuration
 */
  private defineProbabilitySampler(sampleConfig: number): Sampler {
    if (sampleConfig >= 1) {
      return new ParentBasedSampler({ root: new AlwaysOnSampler() });
    }
    else if (sampleConfig <= 0 || sampleConfig === undefined) {
      return new ParentBasedSampler({ root: new AlwaysOffSampler() });
    } else {
      return new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(sampleConfig) });
    }
  }
}
