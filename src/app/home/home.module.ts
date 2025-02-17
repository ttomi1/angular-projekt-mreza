import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PostsComponent } from './posts/posts.component';
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        PostsComponent
    ],
    exports: [
        PostsComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule
    ]
})
export class HomeModule { }
