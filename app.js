'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  'ui.bootstrap-slider',
  'nemLogging',
  'leaflet-directive',
  'myApp.home',
  'myApp.view1',
  'myApp.version'
]).
config(function($routeProvider) {
  $routeProvider.otherwise({redirectTo: ''});
});

//angular.extend($scope, {
//  defaults: {
//    tileLayer: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ',
//    maxZoom: 18,
//    id: 'mapbox.dark'
//  }
//});

//angular.module('myApp')
//    .directive('bsActiveLink', ['$location', function ($location) {
//      return {
//        restrict: 'A', //use as attribute
//        replace: false,
//        link: function (scope, elem) {
//          //after the route has changed
//          scope.$on("$routeChangeSuccess", function () {
//            var hrefs = ['/#' + $location.path(),
//              '#' + $location.path(), //html5: false
//              $location.path()]; //html5: true
//            angular.forEach(elem.find('a'), function (a) {
//              a = angular.element(a);
//              if (-1 !== hrefs.indexOf(a.attr('href'))) {
//                a.parent().addClass('active');
//              } else {
//                a.parent().removeClass('active');
//              };
//            });
//          });
//        }
//      }
//    }]);