import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinDetailComponent } from './walkin-detail.component';

describe('WalkinDetailComponent', () => {
  let component: WalkinDetailComponent;
  let fixture: ComponentFixture<WalkinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
