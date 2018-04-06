// MODULE
const app = angular.module('VideoGameApp', ['ngCookies']);


// CONTROLLERS
// main controller
app.controller('MainController', ['$scope','$cookies','$http', function($scope,$cookies,$http) {
// ----------------------------------------
// | included                             |
// ----------------------------------------
  // Dynamically change includes
  // 1
  this.includePath = 'partials/header.html';
  // 2
  this.changeInclude = (path) => {
    this.includePath = 'partials/'+ path +'.html';
  };
// ----------------------------------------
// | /included                            |
// ----------------------------------------

// ----------------------------------------
// | sessions                             |
// ----------------------------------------
  // holds data recived from sign up form
  this.signupForm = {};
  // holds data recived from log in form
  this.loginForm = {};
  this.currentUser = "";
  this.currentUserId = "";

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
      this.currentUserId = response.data.message._id;
      // save browser cookies, logged in username and user_id
      $cookies.put('wasd.it.session', this.currentUser);
      $cookies.put('wasd.it.session.user_id', this.currentUserId);
      this.loginForm = {};
      this.toggleNavbarItems();
      // change view to profile on login success
      this.changeInclude('user-view');
    }, (error) => {
      console.error(error);
        if(error.status === 401){
          this.errorMessage = true;
        }
      // on not found / incorrect, username / password,
      // redirect to try again login page.
      // clear username and password fields.
      // NOTE make page, currently set to about page
      // FIXME If username not found need to redirect, currently crashes
    }).catch((error) => console.error('Catch: ', error), this.loginForm = {});
  };

  // log out function
  this.logout = () => {
    // NOTE: remove log on project complete
    console.log('logging out');
    $http({
      method: 'DELETE',
      url: '/login',
    }).then((response) => {
      console.log(response);
      this.currentUser = "";
      this.toggleNavbarItems();
      // removes browser cookies, logged in username and user_id
      $cookies.remove('wasd.it.session', this.currentUser);
      $cookies.remove('wasd.it.session.user_id', this.currentUserId);
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };
  // ----------------------------------------
  // | /sessions                            |
  // ----------------------------------------

  // ----------------------------------------
  // | games                                |
  // ----------------------------------------
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
  this.getUserCreatedGames = () => {
    console.log('getting user created games');
    $http({
      method: 'GET',
      url: '/game'
    }).then((response) => {
      // reset userCreatedGames to empty array
      this.userCreatedGames = [];
      // loop over all games
      // find matching user id to game user_id and
      // push to userCreatedGames
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].user_id == this.currentUserId) {
          this.userCreatedGames.push(response.data[i])
        };
      };
    }, error => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };

  // update game comment function
  this.updateGameComment = (games) => {
    console.log(games);
    $http({
      method: 'PUT',
      url: '/game/' + games._id,
      data: this.createForm
    }).then((response) => {
      this.createForm = {};
      this.getAllGames();
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
// ----------------------------------------
// | /games                               |
// ----------------------------------------

// ----------------------------------------
// | cookies                              |
// ----------------------------------------
  // check browser for previous logged in user cookies function
  this.checkLoginSession = () => {
    $scope.loggedInSessionCookie = $cookies.get('wasd.it.session');
    $scope.loggedInSessionIdCookie = $cookies.get('wasd.it.session.user_id');
    this.currentUser = $scope.loggedInSessionCookie;
    this.currentUserId = $scope.loggedInSessionIdCookie;
    // if found cookies toggle(hide/show) items on navbar
    if (this.currentUser = $scope.loggedInSessionCookie) {
      this.showNavItem = false;
    } else {
      this.showNavItem = true;
    }
  };
// ----------------------------------------
// | /cookies                             |
// ----------------------------------------

  // run these functions on page load
  this.checkLoginSession();
  this.getAllGames();
  this.getUserCreatedGames();
}]); // closes MainController controller
