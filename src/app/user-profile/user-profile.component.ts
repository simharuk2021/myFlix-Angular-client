import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // empty states that gets populated in functions
  movies: any[] = []
  favorited: any[] = []
  favoritedTitle: any = []
  user: any = {}

  /**
   * Binds input values to userData object
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  /**
    * All constructor items are documented as properties
    * @ignore
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.getUser()
    this.getMovies()
    this.getFavorites()
  }

  /**
   * use Api call to get data of all movies
   * @function getAllMovies
   * @return movies 
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @function getAllMovies Retrieves the logged in user's favorited movies
   * @returns filterFavorites() function which filters the favorited movies
   */
  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorited = resp.FavoriteMovies;
      console.log(this.favorited);
      return this.filterFavorites();
    });
  }

  /**
   * Filters the logged in user's favorited movies against all movies
   * @returns the favoritedTitle state which includes the titles of all favorited movies
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorited.includes(movie._id)) {
        this.favoritedTitle.push(movie);
      }
    });
    console.log(this.favoritedTitle);
    return this.favoritedTitle;
  }

   /**
   * use API end-point to remove user favorite
   * @function deleteMovie
   * @param MovieId{string}
   * @returns updated user's data in json format
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteMovie(id).subscribe((resp: any) => {
      location.reload();
    })
  }

  /**
   * Get user info of the logged in user
   * @returns the user state which includes the info of the logged in user
   */
  getUser(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp
      return this.user
    })
  }

  /**
  * Updates info of the logged in user
  * @returns alert indicating a successful update or an error
  */
  editUserInfo(): void {
    const updatedData = {
      Username: this.userData.Username ? this.userData.Username : this.user.Username,
      Password: this.userData.Password ? this.userData.Password : this.user.Password,
      Email: this.userData.Email ? this.userData.Email : this.user.Email,
      Birthday: this.userData.Birthday ? this.userData.Birthday : this.user.Birthday,
    }

     /**
   * use API end-point to edit user data and return the user update
   * @function editUser
   * @param updatedData{string}
   * @returns updated user's data
   */
    this.fetchApiData.editUser(updatedData).subscribe((resp: any) => {
      console.log(resp)
      this.snackBar.open("You have updated your profile", "OK", {
        duration: 4000
      });
      localStorage.setItem('user', resp.Username)
      this.getUser()
    }, (resp: any) => {
      console.log(resp)
      this.snackBar.open("Something went wrong, please try again", "OK", {
        duration: 4000
      });
    })
  }
   /**
   * Opens the deletion dialog
   */
    openUserDeleteDialog(): void {
      this.dialog.open(DeleteCardComponent, {
        width: '280px'
      });
    }
}
  