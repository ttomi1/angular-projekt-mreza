import { Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required,  Validators.minLength(5)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Login Successful", this.loginForm.value);
    } else {
      console.log("Form Invalid");
    }
    this.auth.login({username: this.loginForm.get('username')?.value, password: this.loginForm.get('password')?.value});
  }
}
