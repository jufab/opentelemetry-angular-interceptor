import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { instrumentationConsoleOtelConfig } from '../../__mocks__/data/config.mock';
import { OTLP_CONFIG, OtelWebTracerModule } from '../public-api';

describe('OtelWebTracerModule', () => {
  let otelWebTracerModule: OtelWebTracerModule;

  it('should be created', () => {
    TestBed.configureTestingModule({
      imports: [
        OtelWebTracerModule.forRoot(instrumentationConsoleOtelConfig),
      ],
      providers: [
        { provide: OTLP_CONFIG, useValue: instrumentationConsoleOtelConfig },
      ],
    });
    otelWebTracerModule = TestBed.inject(OtelWebTracerModule);
    expect(otelWebTracerModule).toBeTruthy();
    const config = TestBed.inject(OTLP_CONFIG);
    expect(config).not.toBeUndefined();
  });

  it('should be created with configProvider', () => {
    TestBed.configureTestingModule({
      imports: [
        OtelWebTracerModule.forRoot(null,{provide: OTLP_CONFIG, useValue: instrumentationConsoleOtelConfig}),
      ]
    });
    otelWebTracerModule = TestBed.inject(OtelWebTracerModule);
    expect(otelWebTracerModule).toBeTruthy();
    const config = TestBed.inject(OTLP_CONFIG);
    expect(config).not.toBeUndefined();
  });
  it('should return error without config', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [OtelWebTracerModule.forRoot(null,null)]
      });
    }).toThrow('Configuration error. you must specify a configuration in config or configProvider');
  });
  it('should return error with wrong injection', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [OtelWebTracerModule.forRoot(null,{provide: new InjectionToken<Date>('date'), useValue: new Date()})]
      });
    }).toThrow('Configuration error. token must be : InjectionToken opentelemetry.config ,  your token value is : InjectionToken date');
  });
  it('should return error without root', () => {
    expect(() => {
      new OtelWebTracerModule({});
    }).toThrow('OtelWebTracerModule is already loaded. Import it in the AppModule only');
  });
});
