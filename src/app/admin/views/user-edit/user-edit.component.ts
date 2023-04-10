import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  profileForm: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerRequestPayload: { username: any; email: any; password: any; confirmPassword: any; };
  constructor(private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
onSubmit(): void {
  const { username, email, password, confirmPassword } = this.profileForm;
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
};
}
