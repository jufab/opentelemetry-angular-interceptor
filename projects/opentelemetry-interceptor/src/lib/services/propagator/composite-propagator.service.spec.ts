import { TestBed } from '@angular/core/testing';

import { CompositePropagatorService } from './composite-propagator.service';

describe('CompositePropagatorService', () => {
  let service: CompositePropagatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompositePropagatorService],
    });
    service = TestBed.inject(CompositePropagatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
