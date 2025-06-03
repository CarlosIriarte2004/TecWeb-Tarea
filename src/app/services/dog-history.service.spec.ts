import { TestBed } from '@angular/core/testing';

import { DogHistoryService } from './dog-history.service';

describe('DogHistoryService', () => {
  let service: DogHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
