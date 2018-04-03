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

    // curl -X GET --header "Accept: application/json" --header "user-key: foobar" "https://api-endpoint.igdb.com/games/"
    $http({
      method: 'GET',
      Accept: 'application/json',
      'user-key': 'process.env.IGDB_API_KEY',
      url: 'https://api-endpoint.igdb.com/games/',
    }).then((response) => {
      console.table(response.data);
      this.gamesRecived = response.data;
    }, error => {
      console.error(error);
    }).catch(error => console.error('Catch: ', error));
  };
}]); // closes MainController controller
