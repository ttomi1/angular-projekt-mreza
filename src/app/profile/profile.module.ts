import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { InfoComponent } from './info/info.component';
import { PostsComponent } from './profile-posts/posts.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { AddFriendComponent } from './friends-list/add-friend/add-friend.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddPostComponent } from './add-post/add-post.component';
import { MessagingComponent } from './messaging/messaging.component';


@NgModule({
  declarations: [
    ProfileComponent,
    InfoComponent,
    PostsComponent,
    FriendsListComponent,
    AddFriendComponent,
    AddPostComponent,
    MessagingComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
