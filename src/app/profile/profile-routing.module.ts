import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';

const routes : Route[] = [
  {path:'',component:ProfileComponent},
  {path:':username', component:ProfileComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
