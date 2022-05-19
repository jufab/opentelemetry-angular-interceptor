import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleSpanExporterModule, W3CTraceContextPropagatorModule, OTEL_CONFIG, OTEL_INSTRUMENTATION_PLUGINS } from '../../../public-api';
import { OtelWebTracerComponent } from './otel-webtracer.component';
import { instrumentationConsoleOtelConfig } from '../../../../__mocks__/data/config.mock';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

describe('OtelWebtracerComponent', () => {
  let component: OtelWebTracerComponent;
  let fixture: ComponentFixture<OtelWebTracerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtelWebTracerComponent ],
      imports: [
        ConsoleSpanExporterModule,
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTEL_CONFIG, useValue: instrumentationConsoleOtelConfig },
        { provide: OTEL_INSTRUMENTATION_PLUGINS, useValue: [new XMLHttpRequestInstrumentation()]},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtelWebTracerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
