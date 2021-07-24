import { TestBed } from '@angular/core/testing';

import { WalkinzService } from './walkinz.service';

describe('WalkinzService', () => {
  let service: WalkinzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkinzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
