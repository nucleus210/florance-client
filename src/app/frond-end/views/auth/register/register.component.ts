import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterRequestPayload } from './register.payload';
import { LoginRequestPayload } from '../login/login-request.payload';
import User from 'src/app/shared/interfaces/user';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginRequestPayload: LoginRequestPayload;
  registerRequestPayload: RegisterRequestPayload;
  

  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit() {
  }

  onSubmit() {
    const { username, email, password, confirmPassword } = this.form;
    this.registerRequestPayload = {username, email, password, confirmPassword};


    if (password !== confirmPassword) {
      this.isSignUpFailed = true;
      this.errorMessage = 'Passwords do not match'
    } else {
      this.authService.register(this.registerRequestPayload).subscribe({
        next: data => {
          console.log('Registered new user ' + username);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.loginRequestPayload = { username, password };
          this.login();
        },
        error: err => {
          this.isSignUpFailed = true;
          this.isSuccessful = false;
          // handle error from server
          console.log(err.message);
          if(err.error.details === undefined) { 
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = err.error.details;
          }

          // this.isSignUpFailed = true;
          console.log(this.errorMessage);
        }
      });
    }
  }
  login() {

    this.authService.login(this.loginRequestPayload).subscribe({
      next: data => {
        console.log(data);
        console.log('Login Successful');
        this.router.navigate(['/api/product-list']);
      }, error: (error) => {
        console.log('Login failed');
        console.log(error.message);
      }
    });
    console.log(this.authService.getJwtToken());
  }
}
