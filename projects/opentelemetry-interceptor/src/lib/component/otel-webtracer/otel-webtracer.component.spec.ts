import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtelWebTracerComponent } from './otel-webtracer.component';

describe('OtelWebtracerComponent', () => {
  let component: OtelWebTracerComponent;
  let fixture: ComponentFixture<OtelWebTracerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtelWebTracerComponent ]
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
