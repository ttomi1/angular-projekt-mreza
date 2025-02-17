import {Component, Input} from '@angular/core';
import {User} from '../../shared/user.model';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input() id!: string;
  user : User | null = null;
  isEditing: boolean = false;
  updatedBio: string = '';
  loggedInUserId! : number;
  constructor(private dataService : DataService) {}
  ngOnInit(){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      this.loggedInUserId = currentUser.id;
    }

    console.log(this.id);
    this.dataService.getUserData(this.id).subscribe((res : any) =>{
      this.user = res[0];
      console.log(this.user);
    })

  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveBio() {
    if (!this.user) return;

    this.user.bio = this.updatedBio;
    this.isEditing = false;

    let userInfo = {
      id: this.id,
      bio: this.updatedBio
    }

    this.dataService.updateUserBio(this.id, this.updatedBio).subscribe((res) => {
      console.log("Bio updated successfully");
      }
    );
  }
}
