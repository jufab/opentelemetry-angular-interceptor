import { TestBed } from '@angular/core/testing';

import { SpanExporterService } from './span-exporter.service';
import { OpenTelemetryInjectConfig } from '../../configuration/opentelemetry-config';
import {
  otelcolExporterConfig,
  jaegerExporterConfig,
  zipkinExporterConfig,
} from '../../../../__mocks__/data/config.mock';
import {
  CollectorTraceExporter
} from '@opentelemetry/exporter-collector/build/src/platform/browser';
import { ConsoleSpanExporter } from '@opentelemetry/tracing';
import { JaegerExporterService } from './jaeger-exporter.service';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { OtelcolExporterService } from './otelcol-exporter.service';
import { ConsoleSpanExporterService } from './console-span-exporter.service';

describe('SpanExporterService', () => {
  let spanExporterService: SpanExporterService;

  it('should have a CollectorExporter created', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: otelcolExporterConfig },
        OtelcolExporterService,
      ],
    });
    spanExporterService = TestBed.inject(SpanExporterService);
    const spanEx = spanExporterService.getExporter();
    expect(spanEx).toBeInstanceOf(CollectorTraceExporter);
  });

  it('should have a ConsoleSpanExporter created with a JaegerExporterService', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: jaegerExporterConfig },
        JaegerExporterService,
      ],
    });
    spanExporterService = TestBed.inject(SpanExporterService);
    const spanEx = spanExporterService.getExporter();
    expect(spanEx).toBeInstanceOf(ConsoleSpanExporter);
  });

  it('should have a ConsoleSpanExporter created with a ZipkinExporterService', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: zipkinExporterConfig },
        ZipkinExporterService,
      ],
    });
    spanExporterService = TestBed.inject(SpanExporterService);
    const spanEx = spanExporterService.getExporter();
    expect(spanEx).toBeInstanceOf(ConsoleSpanExporter);
  });

  it('should have a ConsoleSpanExporter with no exporterConfigured', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OpenTelemetryInjectConfig,
          useValue: { commonConfig: { serviceName: 'test' } },
        },
        ConsoleSpanExporterService,
      ],
    });
    spanExporterService = TestBed.inject(SpanExporterService);
    const spanEx = spanExporterService.getExporter();
    expect(spanEx).toBeInstanceOf(ConsoleSpanExporter);
  });
});
