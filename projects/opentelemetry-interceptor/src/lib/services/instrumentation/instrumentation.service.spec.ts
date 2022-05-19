import { TestBed } from '@angular/core/testing';
import { ConsoleSpanExporterModule, W3CTraceContextPropagatorModule, OTEL_CONFIG, OTEL_INSTRUMENTATION_PLUGINS } from '../../../public-api';
// eslint-disable-next-line max-len
import { instrumentationConsoleOtelConfig, instrumentationConsoleOtelConfigSamplerOff, instrumentationProductionOtelConfig } from '../../../../__mocks__/data/config.mock';
import { InstrumentationService } from './instrumentation.service';
import { NoopSpanExporterModule } from '../exporter/noop-exporter/noop-span-exporter.module';
import { OTEL_EXPORTER } from '../exporter/exporter.interface';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

describe('InstrumentationService', () => {
  let instrumentationService: InstrumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTEL_CONFIG, useValue: instrumentationConsoleOtelConfig },
        { provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]},
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
  });

  it('should be created', () => {
    expect(instrumentationService).toBeTruthy();
  });

  it('must verify all call in init instrumentation', () => {
    const insertConsoleSpanExporterSpy = jest.spyOn(InstrumentationService.prototype as any, 'insertConsoleSpanExporter');
    const insertSpanProcessorProductionModeSpy = jest.spyOn(InstrumentationService.prototype as any, 'insertSpanProcessorProductionMode');
    instrumentationService.initInstrumentation();
    expect(insertConsoleSpanExporterSpy).toHaveBeenCalledWith(instrumentationConsoleOtelConfig.commonConfig.console);
    // eslint-disable-next-line max-len
    expect(insertSpanProcessorProductionModeSpy).toHaveBeenCalledWith(instrumentationConsoleOtelConfig.commonConfig.production, TestBed.inject(OTEL_EXPORTER));
  });

  it('must init instrumentation with console config', () => {
    instrumentationService.initInstrumentation();
  });

  it('must init instrumentation with sampler Off config', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTEL_CONFIG, useValue: instrumentationConsoleOtelConfigSamplerOff },
        { provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]},
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });

  it('must init instrumentation with production config', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTEL_CONFIG, useValue: instrumentationProductionOtelConfig },
        { provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]},
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });

  it('must init instrumentation with noop span exporter', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        NoopSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTEL_CONFIG, useValue: instrumentationProductionOtelConfig },
        { provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]},
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });

});
