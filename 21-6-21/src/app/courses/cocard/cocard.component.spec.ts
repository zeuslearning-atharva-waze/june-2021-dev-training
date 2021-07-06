import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocardComponent } from './cocard.component';

describe('CocardComponent', () => {
  let component: CocardComponent;
  let fixture: ComponentFixture<CocardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
