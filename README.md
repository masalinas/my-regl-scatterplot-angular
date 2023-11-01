# Description

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Integrating

Install component in angular project

`
npm install regl-scatterplot --save
`

Install d3-scale types

`
npm install @types/d3-scale --save-dev
`

Clone the repo component

`
$ git clone https://github.com/flekschas/regl-scatterplot/tree/master
`

Compile the library

`
$ npm run build-library
`

Copy dist folder generated inside the component folder in your angular project with the last build prepared for typescript

`
cp ./dist $HOME/git/poc-regl-scatterplot-angular/node_modules/regl-scatterplot -R
`

Avoid comonjs warning in your angular project adding this line to your angular.json file inside build json tag:

`
"allowedCommonJsDependencies": [
    "regl"
]
`

Start your project

`
npm run start
`

Build your project

`
npm run build
`