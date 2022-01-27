import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any= {};
  favMov: any= [];
  favorites: any[] = [];
  movies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFav();
    this.getMovies();
  }

  getUserInfo(): void {
    const user = localStorage.getItem('user');
    if (user) {
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
    });
  } 
}
  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.filterMovies();
    });
  } 

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  filterMovies(): void {
    this.movies.forEach((movie: any) => {
    if (this.favorites.includes(movie._id)) {
      this.favMov.push(movie);
    }
  });
  return this.favMov;
  }
}
