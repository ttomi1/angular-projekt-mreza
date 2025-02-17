import {Component, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-add-post',
  standalone: false,
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  postForm!: FormGroup;
  @Input() id!: string;

  constructor(private fb: FormBuilder, private dataService : DataService) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }


  onSubmit() {
    let cont : any = this.postForm.get('content')?.value;
    let titl : any = this.postForm.get('content')?.value;
    let post = {
      id: this.id,
      content: cont,
      title: titl
    };
    this.dataService.postPost(post, this.id).subscribe(res =>{
      console.log(res);
      alert('Post successful!');
    });
    this.postForm.reset();

  }
}
