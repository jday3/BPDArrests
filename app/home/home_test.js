'use strict';

describe('myApp.home module', function() {

  beforeEach(module('myApp'));
  beforeEach(module('myApp.home'));

  describe('home controller', function(){
    var scope, homeCtrl;

    it('should ....', inject(function($rootScope, $controller) {
      //spec body
      scope = $rootScope.$new();
      homeCtrl = $controller('HomeCtrl', {$scope: scope});
      expect(homeCtrl).toBeDefined();
    }));

  });
});