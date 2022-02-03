import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movies-souperapp.herokuapp.com/';
export interface User {
  _id:string;
  FavoriteMovies:Array<string>;
  Username:string;
  Email:string;
  Birthday:string;
}
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

 /**
   * Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {
  }

  /**
   * call API end-point to register a new user
   * @function userRegistration
   * @param userDetails {any}
   * @returns a new user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
 
   /**
   * call API end-point to log in a user
   * @param userDetails {any}
   * @returns user's data in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
 }

  /**
   * call API end-point to get all movies
   * @function getAllMovies
   * @return array of movies object in json format
   */
 getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
 
  /**
   * call API end-point to get a specific movie by Title
   * @function getMovie
   * @param title {any}
   * @returns a movie object in json format
   */
 getMovie(title: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + title, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  /**
   * call API end-point to get a genre data
   * @param genre {any}
   * @returns a genre data in json format
   */
getGenre(genre: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'genres/' + genre, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

 /**
   * call API end-point to get a director data by dirctor's name
   * @function getDirector
   * @param director {any}
   * @returns a director's data in json format
   */
getDirector(director: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'directors/' + director, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

 /**
   * call API end-point to get a user's informations
   * @param username {any}
   * @returns a user's information 
   */
getUser(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * call API end-point to edit the user's informations
   * @param username {any}
   * @param userData {any}
   * @returns updated user's information
   */
editUser(userData: any): Observable<any> {
  const username = localStorage.getItem('user')
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + username, userData, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
   * call API end-point to get a user's favorite movies list
   * @param username {any}
   * @returns a list of the user's favorite movies in json format
   */
getFavoriteMovies(username: any): Observable<any>{
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username + '/FavoriteMovies', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

    /**
   * call API end-point to add a movie to the user's favorite list
   * @param MovieId {any}
   * @returns the user's favorite list in json format
   */
addFavoriteMovies(movieId: any): Observable<any> {
  const username = localStorage.getItem('user')
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId, null, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  /**
   * call API end-point to delete a user's favorite movie
   * @param MovieID {any}
   * @returns updated user's information after removed a movie from the list in json format
   */
deleteMovie(movieID: any): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieID, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  /**
   * call API end-point to delete the current user
   * @param username {any}
   * @returns delete status
   */
deleteUser(): Observable<any> {
  const username = localStorage.getItem('user')
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

  /**
   * Non-typed response extracttion
   * @param res {any}
   * @returns response || empty object
   */
private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}


private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error(
    'Something bad happened; please try again later.'));
  }
}
