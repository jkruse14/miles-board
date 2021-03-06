// Karma configuration
// Generated on Sat Jul 08 2017 06:47:27 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
     files: [
      './vendor/assets/bower_components/angular/angular.js',
      './vendor/assets/bower_components/jquery/dist/jquery.js',
      './vendor/assets/bower_components/lodash/dist/lodash.js',
      './vendor/assets/bower_components/moment/moment.js',
      './vendor/assets/bower_components/ng-token-auth/dist/ng-token-auth.js',
      './vendor/assets/bower_components/ngstorage/ngStorage.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './vendor/assets/bower_components/angular-environment/dist/angular-environment.js',
      './vendor/assets/bower_components/restangular/dist/restangular.js',
      './vendor/assets/bower_components/angular-animate/angular-animate.js',
      './vendor/assets/bower_components/angular-bootstrap/ui-bootstrap.js',
      './vendor/assets/bower_components/angular-cookie/angular-cookie.js',
      '.vendor/assets/bower_components/angular-cookies/angular-cookies.js',
      './vendor/assets/bower_components/angular-flash-alert/dist/angular-flash.js',
      './vendor/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
      './vendor/assets/bower_components/less/dist/less.js',
      './vendor/assets/bower_components/bootstrap/dist/js/bootstrap.js',
      './public/dev-assets/**/application*.js',
      './test/assets/javascripts/**/*.spec.js',
      {
        pattern: './public/dev-assets/application*.js',
        watched: true,
        included: false,
        served: false
      }
      
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/assets/javascripts/**/*.(js,es6)': ['babel', 'coverage'],
      'app/public/dev-assets/javascripts/**/*.(js,es6)': ['babel', 'coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage', 'progress'],

    coverageReporter: {
      reporters: [
        {
          type: 'text-summary',
        },
        {
          type: 'html',
          dir: 'coverage/',
        }
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
