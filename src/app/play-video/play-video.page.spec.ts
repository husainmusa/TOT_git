import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayVideoPage } from './play-video.page';

describe('PlayVideoPage', () => {
  let component: PlayVideoPage;
  let fixture: ComponentFixture<PlayVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayVideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
