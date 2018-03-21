# mi-dss

> A Vue.js project

## Project Structure
``` bash
root
| # api implementation based on firebase functions
|-functions
| # web implementation based on vue-pwa-boilerplate
|-src
```
- [firebase functions](https://firebase.google.com/docs/functions/)
- [vue-pwa-boilerplate](https://github.com/vuejs-templates/pwa/)

## Web Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run web:build

# build for production and view the bundle analyzer report
npm run web:build --report

# run unit tests
npm run web:test-unit

# run e2e tests
npm run web:test-e2e

# run all tests
npm test
```

- For detailed explanation on how things work, checkout [docs for webpack](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader/).

## API Build Setup

``` bash
# Install firebase-tools
npm i -g firebase-tools

# Firebase Login
firebase login

# Create a new project alias and set as active project for this working directory
firebase use --add

# Start local api shell for testing
npm run api:shell

# Start local api server
npm run api:local

# Deploy to Firebase to dev project define in .firebaserc
npm run api:deploy:dev
