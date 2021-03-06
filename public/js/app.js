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
      this.errorMessage = false;
      this.changeInclude('login');
      // console.log(response);
    }, (error) => {
      console.error(error);
      if(error.status === 401){
        this.errorMessage = true;
      }
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
      this.getUserCreatedGames();
      this.errorMessage = false;
      // change view to profile on login success
      this.changeInclude('profile');
    }, (error) => {
      console.error(error);
      if(error.status === 401) {
        this.errorMessage = true;
      };
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
  // game genres to select from on create form
  $scope.gameGenreSelection = {
    genre: [
      "4X",
      "Action-adventure",
      "ActionRPG",
      "Artillery",
      "Beat'em Up",
      "Board",
      "Card",
      "Casual",
      "Choices",
      "Competitive",
      "Construction and Management Simulation",
      "Fantasy",
      "Fighting",
      "First-Person Party-Based RPG",
      "Grand Strategy War",
      "Graphic Adventures",
      "Idle Gaming",
      "Interactive Movie",
      "Life Simulation",
      "Logic",
      "Metroidvania",
      "MMO",
      "MMORPG",
      "Multi-Player Online Battle Arena (MOBA)",
      "Party",
      "Platform",
      "Programming",
      "Racing",
      "Real-Time 3D Adventures",
      "Real-Time Strategy (RTS)",
      "Real-Time Tactics (RTT)",
      "Roguelikes",
      "Rhythm",
      "Sandbox RPG",
      "Scientific Study",
      "Shooter",
      "Sports",
      "Sports-Based Fighting",
      "Stealth",
      "Survival",
      "Survival Horror",
      "Tactical RPG",
      "Text Adventures",
      "Tower Defense",
      "Trivia",
      "Turn-Based Strategy (TBS)",
      "Turn-Based Tactics (TBT)",
      "Vehicle Simulation",
      "Visual Novel",
      "War"
    ]
  };
  //
  this.createFormGenreSeleted = "4X";
  // add/create game function
  this.create = () => {
    // NOTE: remove log on project complete
    console.log('adding game');
    this.createForm.genre = this.createFormGenreSeleted;
    $http({
      method: 'POST',
      url: '/game',
      data: this.createForm
    }).then((response) => {
      // reset these info
      this.createForm = {};
      this.createFormGenreSeleted
      console.log(response);
      this.errorMessage = false;
      if (this.indexOfCommentsToShow != null) {
        this.indexOfCommentsToShow = null;
      };
      if (this.indexOfEditsToShow = !null) {
        this.indexOfEditsToShow = null;
      };
      this.changeInclude('profile');
      // run these commands
      this.getAllGames();
      this.getUserCreatedGames();
    }, (error) => {
      if(error.status === 401){
        this.errorMessage = true;
      }
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
      this.getUserCreatedGames();
      console.log(response.data);
    }, error => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };

  // comment, edit index show/hide
  this.indexOfCommentsToShow = null;
  this.indexOfEditsToShow = null;
  // update edit game function
  this.updateEditGame = (games) => {
    console.log("editing game");
    console.log(games);
    $http({
      method: 'PUT',
      url: '/profile/' + games._id,
      data: {
         title: games.title,
         genre: games.genre,
         description: games.description,
         releaseYear: games.releaseYear,
         image: games.image,
      }
    }).then((response) => {
      this.createForm = {};
      this.getUserCreatedGames();
      this.getAllGames();
      if(response.status === 201){
        this.successMessage = true;
      }
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
    };
  };

// ----------------------------------------
// | /cookies                             |
// ----------------------------------------

  // run these functions on page load
  this.checkLoginSession();
  this.getAllGames();
  this.getUserCreatedGames();
}]); // closes MainController controller
