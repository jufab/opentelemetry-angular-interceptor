import { TestBed } from '@angular/core/testing';
import { ConsoleSpanExporterModule, HttpTraceContextPropagatorModule, OpenTelemetryInjectConfig } from '../../../public-api';
// eslint-disable-next-line max-len
import { instrumentationConsoleOtelConfig, instrumentationConsoleOtelConfigSamplerOff, instrumentationProductionOtelConfig } from '../../../../__mocks__/data/config.mock';

import { InstrumentationService } from './instrumentation.service';
import { OTELCOL_EXPORTER } from '../exporter/exporter.interface';

describe('InstrumentationService', () => {
  let instrumentationService: InstrumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ConsoleSpanExporterModule,
        HttpTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: instrumentationConsoleOtelConfig },
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
    expect(insertSpanProcessorProductionModeSpy).toHaveBeenCalledWith(instrumentationConsoleOtelConfig.commonConfig.production, TestBed.inject(OTELCOL_EXPORTER));
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
        HttpTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: instrumentationConsoleOtelConfigSamplerOff },
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
        HttpTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: instrumentationProductionOtelConfig },
      ],
    });
    instrumentationService = TestBed.inject(InstrumentationService);
    instrumentationService.initInstrumentation();
  });
});
