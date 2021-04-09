import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplesongPage } from './applesong.page';

describe('ApplesongPage', () => {
  let component: ApplesongPage;
  let fixture: ComponentFixture<ApplesongPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplesongPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplesongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
