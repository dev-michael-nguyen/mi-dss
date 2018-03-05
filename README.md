# mi-dss

> A Vue.js project

## Client Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Server Build Setup

``` bash
# Install firebase-tools
npm i -g firebase-tools

# Firebase Login
firebase login

# Create a new project alias and set as active project for this working directory
firebase use --add

# Start local server
firebase serve --only functions

# Deploy to Firebase
firebase deploy --only functions
