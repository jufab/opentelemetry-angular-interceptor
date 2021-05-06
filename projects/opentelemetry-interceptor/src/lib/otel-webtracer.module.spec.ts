import { TestBed } from '@angular/core/testing';
import { instrumentationConsoleOtelConfig } from '../../__mocks__/data/config.mock';
import { OpenTelemetryInjectConfig, OpenTelemetryInterceptorModule, OtelWebTracerModule } from '../public-api';

describe('OtelWebTracerModule', () => {
  let otelWebTracerModule: OtelWebTracerModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OtelWebTracerModule.forRoot(instrumentationConsoleOtelConfig),
      ],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: instrumentationConsoleOtelConfig },
      ],
    });
    otelWebTracerModule = TestBed.inject(OtelWebTracerModule);
  });

  it('should be created', () => {
    expect(otelWebTracerModule).toBeTruthy();
    let config = TestBed.inject(OpenTelemetryInjectConfig);
    expect(config).not.toBeUndefined();
  });
});
