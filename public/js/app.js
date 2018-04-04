// MODULE
const app = angular.module('VideoGameApp', []);


// CONTROLLERS
// sessions controllers
app.controller('SessionsController', ['$http', function($http) {
  // holds data recived from sign up form
  this.signupForm = {};
  // holds data recived from log in form
  this.loginForm = {};

  // sign up function
  this.signup = () => {
    // NOTE: remove log on project complete
    console.log('signing up');
    $http({
      method: 'POST',
      url: '/signup',
      data: this.signupForm
    }).then((response) => {
      this.signupForm = {};
      console.log(response);
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };

  // NOTE: NOT WORKING
  // log in function
  this.login = () => {
    // NOTE: remove log on project complete
    console.log('logging in');
    $http({
      method: 'POST',
      url: '/login',
      data: this.loginForm
    }).then((response) => {
      this.loginForm = {};
      console.log(response);
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };

}]); // closes SessionsController controller


/// games controllers
app.controller('GamesController', ['$http', function($http) {
  // holds data recived from log in form
  this.createForm = {};

  // add/create game function
  this.create = () => {
    // NOTE: remove log on project complete
    console.log('adding game');
    $http({
      method: 'POST',
      url: '/home',
      data: this.createForm
    }).then((response) => {
      this.createForm = {};
      console.log(response);
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };

}]); // closes GamesController controller