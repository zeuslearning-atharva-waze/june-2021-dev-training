import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModule } from '../login/login.module';
import { PopupsComponent } from './popups/popups.component';
import { BannerComponent } from './banner/banner.component';
import { CardsComponent } from './cards/cards.component';
import { CocardComponent } from './cocard/cocard.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, PopupsComponent, BannerComponent, CardsComponent, CocardComponent],
  imports: [CommonModule, CoursesRoutingModule, LoginModule],
  exports: [DashboardComponent],
})
export class CoursesModule {}
