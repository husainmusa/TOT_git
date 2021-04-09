import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullVideoPage } from './full-video.page';

describe('FullVideoPage', () => {
  let component: FullVideoPage;
  let fixture: ComponentFixture<FullVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullVideoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
