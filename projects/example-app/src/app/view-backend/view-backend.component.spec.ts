import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBackendComponent } from './view-backend.component';

describe('ViewBackendComponent', () => {
  let component: ViewBackendComponent;
  let fixture: ComponentFixture<ViewBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
