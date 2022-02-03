import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
    * All constructor items are documented as properties
    * @ignore
   */
  constructor(
    public router:Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Locates to 'movies' page defined in routes
   */
  toMovies(): void{
    this.router.navigate(['movies']);
  }

  /**
   * Locates to 'profile' page defined in routes
   */
  toUser(): void{
    this.router.navigate(['profile']);
  } 

  /**
   * log out the current user and clear the localstorage. Then locates to 'welcome page'
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  
}