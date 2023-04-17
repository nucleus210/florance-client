import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpMethod } from '@lagoshny/ngx-hateoas-client';
import { ToastrService } from 'ngx-toastr';
import { AddressTypeService } from 'src/app/services/address.type.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogService } from 'src/app/services/confirmation.dialog.service';
import { UserService } from 'src/app/services/user.service';
import { UserViewModel } from 'src/app/shared/interfaces/user-view-model';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ConfirmationDialogService]
})
export class UserEditComponent implements OnInit {
  _id: number;
  _username: string;
  _email: string;
  _password: string;

  obj: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };


  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSame = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  requestPayload: { username: any; email: any; password: any; confirmPassword: any; };

  constructor(private addressTypeService: AddressTypeService,
    private authService: AuthService,
    private userService: UserService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this._username = this.authService.getUserName();
    var token = this.authService.getJwtToken();
    var decoded = this.authService.decodeJwt(token)
    console.log(this._username);
    this.getUserByUsername(this._username)
  }

  /**
   * function for getting active user object
   *
  * @param username logged username for token
  * @returns object of active user inside subscription
   */
  getUserByUsername(username: string) {
    this.userService.customQuery(HttpMethod.GET, '/user-names/' + this._username).subscribe({
      next: (user: UserViewModel) => {
        this._username = user.username;
        this._id = user.userId;
        this._email = user.email;
        console.log(this._username);
        console.log(this._id);
        console.log(this._email);
        this.obj.username = user.username;
        this.obj.userId = user.userId;
        this.obj.email = user.email;
        console.log(this.obj);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  onSubmitUpdates(f: NgForm): void {
    const { username, email, password, confirmPassword } = this.form;
    this.requestPayload = { username, email, password, confirmPassword };

    console.log(this.form);
    if (this.form.username == null) {
      this.form.username = this._username;
    } if (this.form.email == null) {
      this.form.email = this._email;
    }
    if (this.form.username == this.obj.username && this.form.email == this.obj.email) {
      this.isSame = true;
      this.errorMessage = 'Same data. Notting to edit!'
      return;
    } if (this.form.password != this.form.confirmPassword) {
      this.errorMessage = 'Passwords doesn\'t match!'
      return;
    }

    this.userService.customQuery(HttpMethod.POST, '/' + this._id, { body: this.form }).subscribe({
      next: data => {
        this.isSuccessful = true;
      },
      error: err => {
        // handle error from server
        console.log(err);
        this.errorMessage = err.error.errorMessage;
        this.isSignUpFailed = true;
      }
    });

    if (password !== confirmPassword) {
      this.isSignUpFailed = true;
      this.errorMessage = 'Passwords do not match'
    } else {

    }
  };

  deleteAccount() {
    this.openConfirmationDialogDeleteUser(this._id, this._username);
  }

  openConfirmationDialogDeleteUser(id: number, username: string) {
    this.confirmationDialogService.confirm('User delete', 'Do you really want to delete user name ', username, 'Remove')
      .then((confirmed) => {
        console.log('Product confirmed: ', confirmed);
        if (confirmed) {
          this.userService.deleteResourceById(id).subscribe({
            next: data => {
            },
            error: err => {
              // handle error from server
              console.log(err);
              this.errorMessage = err.error.errorMessage;
              this.isSignUpFailed = true;
            }
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}

