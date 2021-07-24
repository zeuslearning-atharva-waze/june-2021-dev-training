import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasewalkinComponent } from './basewalkin/basewalkin.component';
import { WalkinDetailComponent } from './walkin-detail/walkin-detail.component';
import { WalkinHallTicketComponent } from './walkin-hall-ticket/walkin-hall-ticket.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'walkins' },
  { path: 'walkins', component: BasewalkinComponent },
  { path: 'walkin/:id', component: WalkinDetailComponent },
  { path: 'walkin/:id/apply/success', component: WalkinHallTicketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalkinsRoutingModule {}
