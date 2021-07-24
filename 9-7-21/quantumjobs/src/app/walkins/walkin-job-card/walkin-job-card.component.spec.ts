import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkinJobCardComponent } from './walkin-job-card.component';

describe('WalkinJobCardComponent', () => {
  let component: WalkinJobCardComponent;
  let fixture: ComponentFixture<WalkinJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkinJobCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkinJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
