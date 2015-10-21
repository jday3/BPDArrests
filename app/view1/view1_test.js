'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp'));
  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){
    var scope, view1Ctrl;

    it('should ....', inject(function($rootScope, $controller) {
      //spec body
      scope = $rootScope.$new();
      view1Ctrl = $controller('View1Ctrl', {$scope: scope});
      expect(view1Ctrl).toBeDefined();
    }));

  });
});