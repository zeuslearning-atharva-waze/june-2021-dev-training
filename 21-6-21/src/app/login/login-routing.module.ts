import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseloginComponent } from './baselogin/baselogin.component';
import { HeadingComponent } from './heading/heading.component';

const routes: Routes = [{ path: 'login', component: BaseloginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
