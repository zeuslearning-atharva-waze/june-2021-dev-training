import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseloginComponent } from './baselogin.component';

describe('BaseloginComponent', () => {
  let component: BaseloginComponent;
  let fixture: ComponentFixture<BaseloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
