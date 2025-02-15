import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { InfoComponent } from './info/info.component';
import { PostsComponent } from './profile-posts/posts.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { AddFriendComponent } from './friends-list/add-friend/add-friend.component';


@NgModule({
  declarations: [
    ProfileComponent,
    InfoComponent,
    PostsComponent,
    FriendsListComponent,
    AddFriendComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
