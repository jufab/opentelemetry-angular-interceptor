import { Inject, Injectable } from '@angular/core';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { Instrumentation, registerInstrumentations } from '@opentelemetry/instrumentation';
import {
  AlwaysOffSampler,
  AlwaysOnSampler,
  ParentBasedSampler,
  Sampler,
  TraceIdRatioBasedSampler,
  WebTracerProvider
} from '@opentelemetry/sdk-trace-web';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
   NoopSpanProcessor,
   SpanProcessor
} from '@opentelemetry/sdk-trace-base';
// eslint-disable-next-line max-len
import { OTEL_CONFIG, OpenTelemetryConfig, OTEL_INSTRUMENTATION_PLUGINS, CommonCollectorConfig } from '../../configuration/opentelemetry-config';
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
    private instrumentation: Instrumentation[]) {
    this.tracerProvider = new WebTracerProvider({
      sampler: this.defineProbabilitySampler(this.convertStringToNumber(this.config.commonConfig.probabilitySampler)),
      resource: this.loadResourceAttributes(this.config.commonConfig),
      spanProcessors: this.insertOrNotSpanExporter(this.config.commonConfig.production,
        this.exporterService, this.config.commonConfig.console),
    });
  }

  /**
   * Init instrumentation on init
   */
  public initInstrumentation() {
    this.tracerProvider.register({
      contextManager: this.contextManager,
      propagator: this.propagatorService.getPropagator(),
    });

    registerInstrumentations({
      instrumentations: this.instrumentation,
      tracerProvider: this.tracerProvider,
    });
  }

  /**
   * Generate Resource Attributes
   * @param commonConfig common configuration
   * @returns Resource
   */
  private loadResourceAttributes(commonConfig: CommonCollectorConfig): Resource {
    let resourceAttributes = Resource.default().merge(
      new Resource({
        [ATTR_SERVICE_NAME]: commonConfig.serviceName,
      })
    );
    if (commonConfig.resourceAttributes !== undefined) {
      resourceAttributes = resourceAttributes.merge(new Resource(commonConfig.resourceAttributes));
    }
    return resourceAttributes;
  }

  /**
   * Verify to insert or not a Span Exporter
   * @param console config to insert console span
   * @param production production mode
   * @param exporter exporter
   * @returns Array of SpanProcessor
   */
  private insertOrNotSpanExporter(production: boolean, exporter: IExporter, console: boolean): Array<SpanProcessor> {
    if (this.exporterService.getExporter() !== undefined) {
      Array.of(this.insertSpanProcessorProductionMode(production, exporter),
        this.insertConsoleSpanExporter(console));
    } else {
      return Array.of(new NoopSpanProcessor());
    }
  }

  /**
   * Insert in tracer the console span if config is true
   *
   * @param console config to insert console span
   * @returns SpanProcessor
   */
  private insertConsoleSpanExporter(console: boolean): SpanProcessor {
    if (console) {
      return new SimpleSpanProcessor(new ConsoleSpanExporter());
    }
  }

  /**
   * Insert BatchSpanProcessor in production mode
   * SimpleSpanProcessor otherwise
   *
   * @param boolean production
   * @param IExporter exporter
   * @returns SpanProcessor
   */
  private insertSpanProcessorProductionMode(
    production: boolean,
    exporter: IExporter
  ): SpanProcessor {
    return production
      ? new BatchSpanProcessor(exporter.getExporter())
      : new SimpleSpanProcessor(exporter.getExporter());
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
   * @returns Sampler
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


