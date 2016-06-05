var airlinesApp = angular.module('airlinesApp', ['ngResource','ngRoute','ui.bootstrap'])
  // .constant('FIREBASE_URL', 'https://airlinesapp.firebaseio.com/');

airlinesApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/show', {
      templateUrl: 'views/show.html',
      controller: 'ShowCtrl',
      controllerAs: 'show'
    })
    // .when('/about', {
    //   templateUrl: 'views/about.html',
    //   controller: 'AboutCtrl'
    // })
    .otherwise({
      redirectTo: '/'
    });
});
