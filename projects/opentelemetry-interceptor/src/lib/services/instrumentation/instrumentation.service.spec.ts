import { TestBed } from '@angular/core/testing';

import { InstrumentationService } from './instrumentation.service';

describe('InstrumentationService', () => {
  let service: InstrumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
