import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasewalkinComponent } from './basewalkin.component';

describe('BasewalkinComponent', () => {
  let component: BasewalkinComponent;
  let fixture: ComponentFixture<BasewalkinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasewalkinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasewalkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
