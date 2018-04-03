// MODULE
const app = angular.module('VideoGameApp', []);


// CONTROLLER
app.controller('VideoGameController', ['$http', function($http) {
  // this.test = "foobar";

  // hold data recived from getGames()
  this.gamesRecived = [];

  // // get games function
  this.getGames = () => {
    console.log('getting some games');
  };

}]); // closes MainController controller
