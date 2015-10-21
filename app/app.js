'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  'ui.bootstrap-slider',
  'nemLogging',
  'leaflet-directive',
  'nvd3',
  'myApp.home',
  'myApp.view1',
  'myApp.version'
]).
config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: ''});
});