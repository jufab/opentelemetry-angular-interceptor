import { TestBed } from '@angular/core/testing';
import { ConsoleSpanExporterModule, W3CTraceContextPropagatorModule, OTLP_CONFIG } from '../../../public-api';
// eslint-disable-next-line max-len
import { instrumentationConsoleOtelConfig, instrumentationConsoleOtelConfigSamplerOff, instrumentationProductionOtelConfig, instrumentationFetchOnlyOtelConfig, instrumentationDocumentLoadOnlyOtelConfig } from '../../../../__mocks__/data/config.mock';

import { InstrumentationService } from './instrumentation.service';
import { OTLP_EXPORTER } from '../exporter/exporter.interface';

describe('InstrumentationService', () => {
  let instrumentationService: InstrumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTLP_CONFIG, useValue: instrumentationConsoleOtelConfig },
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
    const addInstrumentationPluginSpy = jest.spyOn(InstrumentationService.prototype as any, 'addInstrumentationPlugin');
    instrumentationService.initInstrumentation();
    expect(insertConsoleSpanExporterSpy).toHaveBeenCalledWith(instrumentationConsoleOtelConfig.commonConfig.console);
    // eslint-disable-next-line max-len
    expect(insertSpanProcessorProductionModeSpy).toHaveBeenCalledWith(instrumentationConsoleOtelConfig.commonConfig.production, TestBed.inject(OTLP_EXPORTER));
    expect(addInstrumentationPluginSpy).toHaveBeenCalledWith(instrumentationConsoleOtelConfig.instrumentationConfig);
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
        { provide: OTLP_CONFIG, useValue: instrumentationConsoleOtelConfigSamplerOff },
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
        { provide: OTLP_CONFIG, useValue: instrumentationProductionOtelConfig },
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });

  it('must init instrumentation with fetch only', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTLP_CONFIG, useValue: instrumentationFetchOnlyOtelConfig },
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });

  it('must init instrumentation with documentLoad only', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTLP_CONFIG, useValue: instrumentationDocumentLoadOnlyOtelConfig },
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });
});
