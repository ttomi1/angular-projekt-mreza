import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {PostsComponent} from './posts/posts.component';

const routes : Route[] = [
  {path:'',component:PostsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
