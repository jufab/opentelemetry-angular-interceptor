import { TestBed } from '@angular/core/testing';

import { B3PropagatorService } from './b3-propagator.service';

describe('B3PropagatorService', () => {
  let service: B3PropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(B3PropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
