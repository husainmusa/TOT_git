import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeezerComponent } from './deezer.component';

describe('DeezerComponent', () => {
  let component: DeezerComponent;
  let fixture: ComponentFixture<DeezerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeezerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeezerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
