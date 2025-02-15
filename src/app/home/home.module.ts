import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PostsComponent } from './posts/posts.component';


@NgModule({
    declarations: [
        PostsComponent
    ],
    exports: [
        PostsComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
