import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBackendComponent } from './post-backend.component';

describe('PostBackendComponent', () => {
  let component: PostBackendComponent;
  let fixture: ComponentFixture<PostBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
