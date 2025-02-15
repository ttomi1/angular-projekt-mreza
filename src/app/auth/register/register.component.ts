import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataService : DataService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required,  Validators.minLength(5)]),
      repeatPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    },{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Login Successful", this.loginForm.value);
    } else {
      console.log("Form Invalid");
    }

    this.dataService.register(this.loginForm.value).subscribe((res) =>{
      console.log(res);
      alert('Registration successful!');
      this.loginForm.reset();
    });

  }
}
