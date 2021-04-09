import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifytrackPage } from './spotifytrack.page';

describe('SpotifytrackPage', () => {
  let component: SpotifytrackPage;
  let fixture: ComponentFixture<SpotifytrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifytrackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifytrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
