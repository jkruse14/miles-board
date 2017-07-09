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
      './public/dev-assets/*.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './test/assets/javascripts/components/**/*.spec.js',
      './test/assets/javascripts/services/**/*.spec.js',
      './test/assets/javascripts/providers/**/*.spec.js',
      './test/assets/javascripts/directives/**/*.spec.js',
      './test/assets/javascripts/filters/**/*.spec.js',
      {
        pattern: 'app/assets/javascripts/*.js',
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
      // '**/*.js.erb': ['generic']
    },

    // genericPreprocessor: {
    //   rules: [{
    //     // this will always be matched on original path, even 
    //     // if you change file.path in of the `process` functions 
    //     match: "*.js.erb",
    //     // almost  same as karam-coffee-preprocessor 
    //     process: function (content, file, done, log) {
    //       file.path = file.originalPath.replace(/\.erb$/g, '');
    //       try {
    //         done(coffee.compile(content));
    //       } catch (e) {
    //         log.error('%s\n  at %s', e.message, file.originalPath);
    //       }
    //     }
    //   }, {
    //     // if no match is specified all the files matched by 
    //     // `preprocessors` config above will be processed 
    //     process: function (content, file, done, log) {
    //       log.debug('Processing "%s".', file.originalPath);
    //       done(content);
    //     }
    //   }]
    // }

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


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
