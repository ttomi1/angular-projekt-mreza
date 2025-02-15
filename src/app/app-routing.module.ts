import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {ProfileModule} from './profile/profile.module';
import {MessagesModule} from './messages/messages.module';
import {AuthenticationGuard} from './auth.guard';

const routes : Route[] = [
  {path:'', loadChildren: () => HomeModule, canActivate:[AuthenticationGuard]},
  {path:'login',loadChildren: () => AuthModule},
  {path:'profile', loadChildren: () => ProfileModule, canActivate:[AuthenticationGuard]},
  {path:'messages', loadChildren: () => MessagesModule, canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
