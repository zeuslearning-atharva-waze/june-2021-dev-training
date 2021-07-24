import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinDetailsCardComponent } from './walkin-details-card.component';

describe('WalkinDetailsCardComponent', () => {
  let component: WalkinDetailsCardComponent;
  let fixture: ComponentFixture<WalkinDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
