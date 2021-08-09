import { TestBed } from '@angular/core/testing';
import { otelcolExporterConfig } from '../../__mocks__/data/config.mock';
import { OpenTelemetryInjectConfig, OpenTelemetryInterceptorModule } from '../public-api';

describe('OpenTelemetryInterceptorModule', () => {
  let openTelemetryInterceptorModule: OpenTelemetryInterceptorModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        OpenTelemetryInterceptorModule.forRoot(otelcolExporterConfig),
      ]
    });
    openTelemetryInterceptorModule = TestBed.inject(OpenTelemetryInterceptorModule);
  });

  it('should be created', () => {
    expect(openTelemetryInterceptorModule).toBeTruthy();
    const config = TestBed.inject(OpenTelemetryInjectConfig);
    expect(config).not.toBeUndefined();
  });
});
