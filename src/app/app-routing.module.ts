import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';

const routes : Route[] = [
  {path:'login',loadChildren: () => AuthModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
