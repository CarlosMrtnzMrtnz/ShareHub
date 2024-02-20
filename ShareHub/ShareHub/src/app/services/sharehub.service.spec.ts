import { TestBed } from '@angular/core/testing';

import { SharehubService } from './sharehub.service';

describe('SharehubService', () => {
  let service: SharehubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharehubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
