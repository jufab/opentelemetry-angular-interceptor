import { Inject, Injectable } from '@angular/core';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { InstrumentationOption, registerInstrumentations } from '@opentelemetry/instrumentation';
import {
  AlwaysOffSampler,
  AlwaysOnSampler,
  ParentBasedSampler,
  Sampler,
  TraceIdRatioBasedSampler,
  WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor, NoopSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTEL_CONFIG, OpenTelemetryConfig, OTEL_INSTRUMENTATION_PLUGINS } from '../../configuration/opentelemetry-config';
import { OTEL_EXPORTER, IExporter } from '../exporter/exporter.interface';
import { OTEL_PROPAGATOR, IPropagator } from '../propagator/propagator.interface';


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
   * Constructor
   *
   * @param config
   * @param exporterService
   * @param propagatorService
   */
  constructor(@Inject(OTEL_CONFIG) private config: OpenTelemetryConfig,
    @Inject(OTEL_EXPORTER)
    private exporterService: IExporter,
    @Inject(OTEL_PROPAGATOR)
    private propagatorService: IPropagator,
    @Inject(OTEL_INSTRUMENTATION_PLUGINS)
    private instrumentationOptions: InstrumentationOption[]) {
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
    this.insertOrNotSpanExporter(this.config.commonConfig.production, this.exporterService, this.config.commonConfig.console);

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
   * Verify to insert or not a Span Exporter
   */
  private insertOrNotSpanExporter(production: boolean, exporter: IExporter, console: boolean) {
    if (this.exporterService.getExporter() !== undefined) {
      this.insertSpanProcessorProductionMode(production, exporter);
      this.insertConsoleSpanExporter(console);
    } else {
      this.tracerProvider.addSpanProcessor(new NoopSpanProcessor());
    }
  }

  /**
   * Insert in tracer the console span if config is true
   *
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
   *
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
   * convert String to Number (or undefined)
   *
   * @param value
   * @returns number or undefined
   */
  private convertStringToNumber(value: string): number {
    return value !== undefined ? Number(value) : undefined;
  }

  /**
   * define the Probability Sampler
   * By Default, it's always (or 1)
   *
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


