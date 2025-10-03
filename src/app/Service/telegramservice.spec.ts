import { TestBed } from '@angular/core/testing';

import { Telegramservice } from './telegramservice';

describe('Telegramservice', () => {
  let service: Telegramservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Telegramservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
