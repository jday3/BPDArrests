'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

  describe('home', function() {

    beforeEach(function() {
      browser.get('index.html#/');
    });


    it('should render home when user navigates to /', function() {
      debugger;
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
          toMatch(/Baltimore riots /);
    });

  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/offenses');
    });


    it('should render view1 when user navigates to /offenses', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Baltimore Police Department /);
    });

  });



});
