// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// Imports the router 

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

   /**
   * get input values then store in userData
   */
  @Input() userData = { Username: '', Password: ''};

  /**
    * All constructor items are documented as properties
    * @ignore
   */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }
    

ngOnInit(): void {
}

 /**
   * use API end-point to login the user by getting data from the input.
   * Then sotes the user's data in localstorage
   * @function userLogin
   * @param userData {object}
   * @return user's data 
   */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // set user and token to local storage
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      console.log(result)
  // Logic for a successful user login goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open(result.user.Username, 'Login Successfull', {
        duration: 2000
     });
     this.router.navigate(['movies'])
    }, (result) => {
      this.snackBar.open(result, 'Please try again', {
        duration: 2000
      });
    });
  }

  }