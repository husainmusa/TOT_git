import { TestBed } from '@angular/core/testing';

import { AndroidMusicService } from './android-music.service';

describe('AndroidMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AndroidMusicService = TestBed.get(AndroidMusicService);
    expect(service).toBeTruthy();
  });
});
