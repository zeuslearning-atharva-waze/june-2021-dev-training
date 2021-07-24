import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LogincardComponent } from './authentication/logincard/logincard.component';
import { LoginComponent } from './authentication/login/login.component';
import { PracComponent } from './authentication/prac/prac.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';

import { HeaderComponent } from './header/header.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalkinsModule } from './walkins/walkins.module';
import { WalkinsRoutingModule } from './walkins/walkins-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    AuthenticationModule,
    WalkinsModule,
    FormsModule,
    WalkinsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
