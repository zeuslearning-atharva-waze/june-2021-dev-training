import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { HeadingComponent } from './heading/heading.component';
import { FooterComponent } from './footer/footer.component';
import { BaseloginComponent } from './baselogin/baselogin.component';
import { LogincardComponent } from './logincard/logincard.component';

@NgModule({
  declarations: [
    HeadingComponent,
    FooterComponent,
    BaseloginComponent,
    LogincardComponent,
  ],
  imports: [CommonModule, LoginRoutingModule],
  exports: [HeadingComponent, LogincardComponent, FooterComponent],
})
export class LoginModule {}
///
