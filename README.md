# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

This Client layer makes use of the myFLix API hosted at https://my-movies-souperapp.herokuapp.com
For more details of the API see https://github.com/simharuk2021/My-Flix.git

## Development server

If the project has been cloned then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Hosted Version

There is a now a fully funtional version hosted at (https://simharuk2021.github.io/myFlix-Angular-client/welcome)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Code Structure 

**Endpoints** Angular uses a fetch-api-data-service/ts file to host all of the endpoint functions which are then subscribed to (called) by the various other created components. 

**Routes** Angular uses routes (a handful of critical paths which enable immediate access to components.  These are defined within the app.module.ts file along with the components, required imports and modules.

**Classes** are used to first initialise the variables of the component and then to populate the endpoints with returned data based on the user inputs and actions.

**Links** to other components are also referred to by dialog.open with the name of the component being called as a parameter e.g.

`openUserDeleteDialog(): void {
      this.dialog.open(DeleteCardComponent, {
        width: '280px'
      });
    }`

Each component is styled using a corresponding scss file which is linked to the styling (nb these linked files are automatically generated within the commands listed in the  Commponents section below. However there is a file located in src/styles.scss which allow for global settings to be applied to the project in the form  color palettes and default styling classes (e.g. such as `primary`, `warn` etc..)


## Components

Added using `Angular Material` as the UI component library - the basic component generation statement is :
`ng generate component component-name` replace component-name with user defined component name

`ng add @angular/material` - imports Angular Material 
`ng generate component user-registration-form` - creates user registration form
`ng generate component user-login-form` - creates user login form

## User Stories

As a user, I want to be able to receive information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.

As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
