// MODULE
const app = angular.module('VideoGameApp', []);


// CONTROLLERS
// includes controllers
app.controller('IncludesController', ['$http', function($http) {
  // Dynamically change includes
  // 1
  this.includePath = 'partials/header.html';
  // 2
  this.changeInclude = (path) => {
    this.includePath = 'partials/'+ path +'.html';
  };
}]); // closes IncludesController controller


// sessions controllers
app.controller('SessionsController', ['$http', function($http) {

  // Dynamically change includes
  // 1
  this.includePath = 'partials/header.html';
  // 2
  this.changeInclude = (path) => {
    this.includePath = 'partials/'+ path +'.html';
  }

  // holds data recived from sign up form
  this.signupForm = {};
  // holds data recived from log in form
  this.loginForm = {};
  this.currentUser = "";

  // default value of this.showNavItem
  this.showNavItem = true;
  // function to toggle navbar items show/hide
  this.toggleNavbarItems = () => {
    this.showNavItem = !this.showNavItem;
    console.log(this.showNavItem);
  };

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

  // log in function
  this.login = () => {
    // NOTE: remove log on project complete
    console.log('logging in');
    $http({
      method: 'POST',
      url: '/login',
      data: {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
    }).then((response) => {
      this.currentUser = response.config.data.username;
      this.loginForm = {};
      this.toggleNavbarItems();
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };
}]); // closes SessionsController controller


/// games controllers
app.controller('GamesController', ['$http', function($http) {
  // holds data recived from log in form
  this.createForm = {};
  // holds data recived from get function
  this.allGames = [];
  // holds data recived from get function
  this.userCreatedGames = [];
  // show index show/hide
  this.indexOfShow = null;
  // edit index show/hide
  this.indexOfEditToShow = null;

  // add/create game function
  this.create = () => {
    // NOTE: remove log on project complete
    console.log('adding game');
    $http({
      method: 'POST',
      url: '/game',
      data: this.createForm
    }).then((response) => {
      this.createForm = {};
      console.log(response);
      this.getAllGames();
      this.getUserCreatedGames();
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };

  // get functions
  // all games
  this.getAllGames = () => {
    // console.log('getting user created games');
    $http({
      method: 'GET',
      url: '/game'
    }).then((response) => {
      // console.table(response.data);
      this.allGames = response.data;
    }, error => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };

  // user created games
  // FIXME: find games by current session id
  this.getUserCreatedGames = () => {
    // console.log('getting user created games');
    $http({
      method: 'GET',
      url: '/game'
    }).then((response) => {
      // console.table(response.data);
      this.userCreatedGames = response.data;
    }, error => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };

  // update game function
  this.updateGame = (games) => {
    console.log('updating:' + games._id);
    $http({
      method: 'PUT',
      url: '/game/' + games._id,
      data: {
         name: games.name,
      }
    }).then((response) => {
      console.log(response.data);
    }, error => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };

  // delete function
  this.deleteUserCreatedGame = (id) => {
    $http({
      method: 'DELETE',
      url: '/game/' + id
    }).then((response) => {
      // console.log(response.data);
      const removeByIndex = this.userCreatedGames.findIndex((userCreatedGames) =>
      userCreatedGames._id === id);
      this.userCreatedGames.splice(removeByIndex, 1);
    }, (error) => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };

  // run get functions on page load
  this.getAllGames();
  this.getUserCreatedGames();
}]); // closes GamesController controller
