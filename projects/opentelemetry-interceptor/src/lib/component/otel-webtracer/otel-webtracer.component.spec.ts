import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoleSpanExporterModule, W3CTraceContextPropagatorModule, OTLP_CONFIG } from '../../../public-api';
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
        W3CTraceContextPropagatorModule,
      ],
      providers: [
        { provide: OTLP_CONFIG, useValue: instrumentationConsoleOtelConfig },
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
