import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinCardComponent } from './walkin-card.component';

describe('WalkinCardComponent', () => {
  let component: WalkinCardComponent;
  let fixture: ComponentFixture<WalkinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalkinCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
