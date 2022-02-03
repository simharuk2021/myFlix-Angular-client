import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent implements OnInit {

   /**
    * All constructor items are documented as properties
    * @ignore
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Deletes the user and navigates to the welcome page
   */
  deleteUser(): void {
    const user = localStorage.getItem('user');
      this.fetchApiData.deleteUser().subscribe((res: any) => {
      this.snackbar.open(`User profile has been deleted`, 'OK', {
        duration: 2000
      });
    });
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
