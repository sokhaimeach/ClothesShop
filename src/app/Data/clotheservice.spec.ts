import { TestBed } from '@angular/core/testing';

import { Clotheservice } from './clotheservice';

describe('Clotheservice', () => {
  let service: Clotheservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Clotheservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
