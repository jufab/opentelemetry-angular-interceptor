import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { otelcolExporterConfig } from '../../__mocks__/data/config.mock';
import { OTLP_CONFIG, OpenTelemetryInterceptorModule } from '../public-api';

describe('OpenTelemetryInterceptorModule', () => {
  let openTelemetryInterceptorModule: OpenTelemetryInterceptorModule;

  it('should be created', () => {
    TestBed.configureTestingModule({
      imports: [
        OpenTelemetryInterceptorModule.forRoot(otelcolExporterConfig),
      ]
    });
    openTelemetryInterceptorModule = TestBed.inject(OpenTelemetryInterceptorModule);
    expect(openTelemetryInterceptorModule).toBeTruthy();
    const config = TestBed.inject(OTLP_CONFIG);
    expect(config).not.toBeUndefined();
  });
  it('should be created with configProvider', () => {
    TestBed.configureTestingModule({
      imports: [
        OpenTelemetryInterceptorModule.forRoot(null,{provide: OTLP_CONFIG, useValue: otelcolExporterConfig}),
      ]
    });
    openTelemetryInterceptorModule = TestBed.inject(OpenTelemetryInterceptorModule);
    expect(openTelemetryInterceptorModule).toBeTruthy();
    const config = TestBed.inject(OTLP_CONFIG);
    expect(config).not.toBeUndefined();
  });
  it('should return error without config', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [OpenTelemetryInterceptorModule.forRoot(null,null)]
      });
    }).toThrow('Configuration error. you must specify a configuration in config or configProvider');
  });
  it('should return error with wrong injection', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [OpenTelemetryInterceptorModule.forRoot(null,{provide: new InjectionToken<Date>('date'), useValue: new Date()})]
      });
    }).toThrow('Configuration error. token must be : InjectionToken opentelemetry.config ,  your token value is : InjectionToken date');
  });
  it('should return error without root', () => {
    expect(() => {
      new OpenTelemetryInterceptorModule({});
    }).toThrow('OpentelemetryInterceptorModule is already loaded. Import it in the AppModule only');
  });
});
