module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-nvd3/dist/angular-nvd3.min.js',
        'app/bower_components/angular-strap/dist/angular-strap.min.js',
        'app/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
        'app/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        'app/bower_components/angular-bootstrap-slider/slider.js',
        'app/bower_components/moment/min/moment.min.js',

        'app/bower_components/d3/d3.min.js',
        'app/bower_components/nvd3/build/nv.d3.min.js',
        'app/*.js',
        'app/services/*.js',
      'app/components/**/*.js',
      'app/view1/*.js',
        'app/home/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
