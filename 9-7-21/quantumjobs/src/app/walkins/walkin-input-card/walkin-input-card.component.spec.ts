import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinInputCardComponent } from './walkin-input-card.component';

describe('WalkinInputCardComponent', () => {
  let component: WalkinInputCardComponent;
  let fixture: ComponentFixture<WalkinInputCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinInputCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinInputCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
