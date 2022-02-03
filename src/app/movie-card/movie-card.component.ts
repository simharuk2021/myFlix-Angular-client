   
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {

  /**
   * variable to store the movies
  */

  movies: any = [];

  /**
   * variable to store the Favorite Movies
  */
  FavoriteMovies: any[] = [];

  /**
   * variable to store the user
  */
  user: any[] = [];

  
  /**
    * All constructor items are documented as properties
    * @ignore
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  // ngOnInit method is called once the component has received all its inputs (all its data-bound properties)
  /**
   * When components mounts, run {@link getMovies} and load user data from localStorage
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * use Api call to get data of all movies
   * @function getAllMovies
   * @return movies in json format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * get an array of the user's favorite movies from user's data
   */

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavoriteMovies = resp.FavoriteMovies;
      console.log(this.FavoriteMovies);
    });
  }

  /**
   *open a dialog to display the GenreCardComponent
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  /**
   * open a dialog to display the DirectorCardComponent
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
  ): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name: name, bio: bio, birth: birth, },
      width: '300px',
    });
  }

  /**
   * open a dialog to display the SynopsisCardComponent
   * @param title {string}
   * @param description {string}
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }

  /**
   * use API end-point to add user favorite movie
   * @function addFavoriteMovies
   * @param MovieID {string}
   * @param title {string}
   * @returns an array of the movie object in json format
   */
  addFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * use API end-point to remove user favorite
   * @function deleteMovie
   * @param MovieId{string}
   * @param title {string}
   * @returns updated user's data in json format
   */
  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteMovie(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * check if the movie is the user's favorite?
   * @param MovieID {string}
   * @returns true or false
   */
  isFavorite(MovieID: string): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === MovieID);
  }

  /**
   * toggle add/remove user's favorite function.
   * if the movie is not on the favorite list, call ...
   * @function addFavoriteMovies
   * if the movie is already on the user favorite list, call ...
   * @function removeFavoriteMovie
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}
