// MODULE
const app = angular.module('VideoGameApp', []);


// CONTROLLER
// chage later ----------
app.controller('VideoGameController', ['$http', function($http) {
  // this.test = "foobar";

  // holds data recived from sign up form
  this.signupForm = {};
  // sign up function
  this.signup = () => {
    console.log('i\'m signing up');
    $http({
      method: 'POST',
      // chage later ----------
      url: '/home',
      data: this.signupForm
    }).then((response) => {
      this.signupForm = {};
      // chage later ----------
      this.user.push(response.data);
    }, (error) => {
      console.error(error);
    }).catch((error) => console.error('Catch: ', error));
  };

}]); // closes VideoGameController controller
