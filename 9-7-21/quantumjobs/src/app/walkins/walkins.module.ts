import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasewalkinComponent } from './basewalkin/basewalkin.component';
import { WalkinCardComponent } from './walkin-card/walkin-card.component';
import { WalkinDetailComponent } from './walkin-detail/walkin-detail.component';
import { WalkinDetailsCardComponent } from './walkin-details-card/walkin-details-card.component';
import { WalkinInputCardComponent } from './walkin-input-card/walkin-input-card.component';
import { WalkinJobCardComponent } from './walkin-job-card/walkin-job-card.component';
import { WalkinHallTicketComponent } from './walkin-hall-ticket/walkin-hall-ticket.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BasewalkinComponent,
    WalkinCardComponent,
    WalkinDetailComponent,
    WalkinDetailsCardComponent,
    WalkinInputCardComponent,
    WalkinJobCardComponent,

    WalkinHallTicketComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class WalkinsModule {}
