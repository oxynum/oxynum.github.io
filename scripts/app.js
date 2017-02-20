'use strict';

/**
 * @ngdoc overview
 * @name oxynum2016App
 * @description
 * # oxynum2016App
 *
 * Main module of the application.
 */
angular
  .module('oxynum2016App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'duScroll'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/main.html',
        controller: 'AboutCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });
