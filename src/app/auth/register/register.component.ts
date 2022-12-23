import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service'
import { RegisterRequestPayload } from './register.payload'
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
          this.router.navigate(['/product-list']);
        },
        error: err => {
          // handle error from server
          console.log(err);
          this.errorMessage = err.error.errorMessage;
          this.isSignUpFailed = true;
        }
      });
    }


  }
}
