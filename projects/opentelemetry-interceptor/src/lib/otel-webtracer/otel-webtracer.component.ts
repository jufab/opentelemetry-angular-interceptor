import { Component, Inject, OnInit } from '@angular/core';
import { ConsoleSpanExporter, SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/tracing';
import { WebTracerProvider } from '@opentelemetry/web';
import { ZoneContextManager } from '@opentelemetry/context-zone-peer-dep';
import { OTELCOL_EXPORTER, IExporter } from '../services/exporter/exporter.interface';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { OpenTelemetryInjectConfig, OpenTelemetryConfig } from '../configuration/opentelemetry-config';
import { OTELCOL_PROPAGATOR, IPropagator } from '../services/propagator/propagator.interface';


@Component({
  selector: 'otel-webtracer',
  template: ''
})
export class OtelWebTracerComponent implements OnInit {

  constructor(@Inject(OpenTelemetryInjectConfig) private config: OpenTelemetryConfig,
  @Inject(OTELCOL_EXPORTER)
  private exporterService: IExporter,
  @Inject(OTELCOL_PROPAGATOR)
  private propagatorService: IPropagator,) { }

  ngOnInit(): void {
    const provider = new WebTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    provider.addSpanProcessor(new BatchSpanProcessor(this.exporterService.getExporter()));

    provider.register({
      contextManager: new ZoneContextManager(),
      propagator: this.propagatorService.getPropagator()
    });

    registerInstrumentations({
      instrumentations: [
        new XMLHttpRequestInstrumentation(),
        new DocumentLoadInstrumentation(),
        new FetchInstrumentation()
      ],
      tracerProvider: provider,
    });
  }

}
