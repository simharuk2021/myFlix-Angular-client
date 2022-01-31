// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favorited: any[] = []
  constructor(
  public fetchApiData: FetchApiDataService,
  public dialog: MatDialog,
  public snackBar: MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavorites()
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

openDirectorDialog(Name: string, Bio: string, Birth: string): void {
  this.dialog.open(DirectorDialogComponent, {
      data: { Name, Bio, Birth },
      width: '300px',
    });
  }
openGenreDialog(Name: string, Description: string): void {
  this.dialog.open(GenreDialogComponent, {
      data: { Name, Description},
      width: '300px',
    });
    }

openSynopsisDialog(Title: string, Description: string): void {
  this.dialog.open(SynopsisDialogComponent, {
      data: { Title, Description},
      width: '300px',
        });
        }
/**
   * Retrieves the logged in user's favorited movies
   * @returns filterFavorites() function which filters the favorited movies
   */
 getFavorites(): void {
  const user = localStorage.getItem('user');
  this.fetchApiData.getUser(user).subscribe((resp: any) => {
    this.favorited = resp.FavoriteMovies;
    console.log(this.favorited);
    return this.favorited;
  });
}
  /**
   * Adds a movie to logged in user's favorited movies
   * @param movieId {string}
   */
   addFavMovie(movieID: string): void {
    this.fetchApiData.addFavoriteMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`Successfully added to your favorites list`, 'OK', {
        duration: 4000,
      });
      this.getFavorites()
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from logged in user's favorited movies
   * @param movieId {string}
   */
  removeFavMovie(movieID: string): void {
    this.fetchApiData.deleteMovie(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`Successfully removed from your favorites list`, 'OK', {
        duration: 4000,
      });
      this.getFavorites()
      this.ngOnInit();
    });
  }

  /**
   * Checks whether or not a movies is in the logged in user's favorited movies 
   * @param movieId {string}
   * @returns true or false
   */
  inFavorited(movieID: string): boolean {
    if (this.favorited.includes(movieID)) {
      return true;
    } else {
      return false;
    }
  }        

}