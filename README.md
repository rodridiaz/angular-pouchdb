# AngularPouchdb

A webapp using local PouchDB database to display welding exercises

## Quick start

**Make sure you have Node version >= 8.7.0 and (NPM >= 5.6 or [Yarn](https://yarnpkg.com) )**

> If you have Docker installed in your macchine you can simply start the development docker container with `docker-compose up --build`

```bash
# clone our repo
git clone https://github.com/rodridiaz/angular-pouchdb.git

# change directory to our repo
cd angular-pouchdb

# install the repo with npm
npm install
# or yarn
yarn install

# start the server
npm start
# or yarn
yarn start

```

go to [http://0.0.0.0:4200](http://0.0.0.0:4200) or [http://localhost:4200](http://localhost:4200) in your browser

## Deployment

We just want to ship the project lightweight and as performant as possible to the production.

We will archive this in two steps:

- **Build**: Build the app using Node alpine image
- **Serve**: By using artefacts after build process and Nginx configs, we will serve the app.

Then, you can build our production image like this:

```bash
$ docker build -t angular-pouchdb:prod .
```

To test it out, you can run that image with the following command and visit http://localhost:8080/ :

```bash
$ docker run -p 8080:80 pouchdb:prod
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Built With

- [Angular 6.1.0](https://v6.angular.io/docs) - The web framework used
- [Angular Material ](https://material.angular.io/) - Material Design components for Angular
- [PouchDB](https://pouchdb.com/guides/) - A pocket-sized database

## Authors

- **Rodrigo Díaz** - _Initial work_

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.9.
