import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { LogincardComponent } from './logincard/logincard.component';
import { PracComponent } from './prac/prac.component';
import { RegisterComponent } from './register/register.component';
import { RegisterProgressComponent } from './register-progress/register-progress.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { ReviewComponent } from './review/review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    LogincardComponent,
    PracComponent,
    RegisterComponent,
    RegisterProgressComponent,
    PersonalDetailsComponent,
    QualificationsComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [LoginComponent, LogincardComponent, PracComponent],
})
export class AuthenticationModule {}
