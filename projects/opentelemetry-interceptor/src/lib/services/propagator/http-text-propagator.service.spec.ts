import { TestBed } from '@angular/core/testing';

import { HttpTextPropagatorService } from './http-text-propagator.service';

describe('HttpTextPropagatorService', () => {
  let service: HttpTextPropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTextPropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
