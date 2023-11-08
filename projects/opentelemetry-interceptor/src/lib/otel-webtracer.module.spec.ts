import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { instrumentationConsoleOtelConfig } from '../../__mocks__/data/config.mock';
// eslint-disable-next-line max-len
import { NoopSpanExporterModule, NoopTextMapPropagatorModule, OTEL_CONFIG, OTEL_INSTRUMENTATION_PLUGINS, OtelWebTracerModule } from '../public-api';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

describe('OtelWebTracerModule', () => {
  let otelWebTracerModule: OtelWebTracerModule;

  it('should be created', () => {
    TestBed.configureTestingModule({
      imports: [
        OtelWebTracerModule.forRoot(instrumentationConsoleOtelConfig),
        NoopSpanExporterModule,
        NoopTextMapPropagatorModule
      ],
      providers: [
        { provide: OTEL_CONFIG, useValue: instrumentationConsoleOtelConfig },
        { provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()] }
      ],
    });
    otelWebTracerModule = TestBed.inject(OtelWebTracerModule);
    expect(otelWebTracerModule).toBeTruthy();
    const config = TestBed.inject(OTEL_CONFIG);
    expect(config).not.toBeUndefined();
  });

  it('should be created with configProvider', () => {
    TestBed.configureTestingModule({
      imports: [
        OtelWebTracerModule.forRoot(null, { provide: OTEL_CONFIG, useValue: instrumentationConsoleOtelConfig }),
        NoopSpanExporterModule,
        NoopTextMapPropagatorModule
      ],
      providers: [{ provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()] }]
    });
    otelWebTracerModule = TestBed.inject(OtelWebTracerModule);
    expect(otelWebTracerModule).toBeTruthy();
    const config = TestBed.inject(OTEL_CONFIG);
    expect(config).not.toBeUndefined();
  });
  it('should return error without config', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [OtelWebTracerModule.forRoot(null, null)]
      });
    }).toThrow('Configuration error. you must specify a configuration in config or configProvider');
  });
  it('should return error with wrong injection', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [OtelWebTracerModule.forRoot(null, { provide: new InjectionToken<Date>('date'), useValue: new Date() })]
      });
    }).toThrow('Configuration error. token must be : InjectionToken opentelemetry.config ,  your token value is : InjectionToken date');
  });
  it('should return error without root', () => {
    expect(() => {
      new OtelWebTracerModule({});
    }).toThrow('OtelWebTracerModule is already loaded. Import it in the AppModule only');
  });
});
