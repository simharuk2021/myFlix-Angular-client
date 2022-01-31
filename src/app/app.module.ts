import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { DirectorDialogComponent } from './director-dialog/director-dialog.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from './synopsis-dialog/synopsis-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserProfileComponent} from './user-profile/user-profile.component';
import { DeleteCardComponent } from './delete-card/delete-card.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },

  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    DirectorDialogComponent,
    GenreDialogComponent,
    SynopsisDialogComponent,
    NavBarComponent,
    UserProfileComponent,
    DeleteCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
