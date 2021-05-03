import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleSpanExporterModule, HttpTraceContextPropagatorModule, OpenTelemetryInjectConfig } from '../../../public-api';
import { OtelWebTracerComponent } from './otel-webtracer.component';
import { instrumentationConsoleOtelConfig } from '../../../../__mocks__/data/config.mock';

describe('OtelWebtracerComponent', () => {
  let component: OtelWebTracerComponent;
  let fixture: ComponentFixture<OtelWebTracerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtelWebTracerComponent ],
      imports: [
        ConsoleSpanExporterModule,
        HttpTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OpenTelemetryInjectConfig, useValue: instrumentationConsoleOtelConfig },
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
