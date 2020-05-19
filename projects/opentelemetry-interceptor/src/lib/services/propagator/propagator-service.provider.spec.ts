import { TestBed } from '@angular/core/testing';

import { PropagatorServiceProvider } from './propagator-service.provider';

describe('PropagatorServiceProviderService', () => {
  let service: PropagatorServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropagatorServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
