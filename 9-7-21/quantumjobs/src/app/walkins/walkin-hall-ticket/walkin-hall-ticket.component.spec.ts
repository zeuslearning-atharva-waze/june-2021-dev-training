import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinHallTicketComponent } from './walkin-hall-ticket.component';

describe('WalkinHallTicketComponent', () => {
  let component: WalkinHallTicketComponent;
  let fixture: ComponentFixture<WalkinHallTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinHallTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinHallTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
