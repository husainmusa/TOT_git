import { TestBed } from '@angular/core/testing';

import { LastFmService } from './last-fm.service';

describe('LastFmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LastFmService = TestBed.get(LastFmService);
    expect(service).toBeTruthy();
  });
});
