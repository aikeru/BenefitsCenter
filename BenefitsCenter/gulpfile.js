/// <vs SolutionOpened='watch' />
//jscs:disable
//jshint ignore: start

var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  watch = require('gulp-watch'),
  qunit = require('gulp-qunit')
  notify = require('gulp-notify'),
  fs = require('fs');

//If you want to use Windows 8 built-in toasts...
//var Notifier = require('node-notifier/notifiers/toaster');

//The below use Growl for Windows, which is a pretty customizable notification system for Windows
var Notifier = require('node-notifier/notifiers/growl');
var failureNotifier = {
  name: 'node',
  host: 'localhost',
  port: 23053
};
var successNotifier = {
  name: 'node-success',
  host: 'localhost',
  port: 23053
};

var applicationScripts = 'Scripts/Application/**/*.js';
var unitTestScripts = '../BenefitsCenter.Tests/Client/**/*.js'

gulp.task('watch', function () {
  watch([applicationScripts, unitTestScripts], function (files, cb) {
    gulp.start('js');
  });
});

gulp.task('lint', function () {
  return gulp.src(applicationScripts)
    .pipe(eslint()) //Lint the files
    .pipe(eslint.format()) //Output lint results to console
    .pipe(eslint.failOnError()); //Halt if linting fails
});

gulp.task('qunit', function () {
  //There are many ways to run JavaScript unit tests. I've chosen to use an HTML document test runner.
  //It will run under the headless phantomjs browser, from the console.
  var testsPipe = gulp.src('../BenefitsCenter.Tests/ClientGulp/js-test-runner.html')
    .pipe(qunit());
  testsPipe.on('error', function () {
    //Notify that unit tests failed
    new Notifier(failureNotifier).notify({
      title: 'QUnit Tests Failed',
      message: 'Benefits Center JS Unit Tests failed.',
      icon: fs.readFileSync(__dirname + '/warning.png')
    })
  })
  return testsPipe;
});

//Define a task (js) that has the other tasks (lint and qunit) as prerequisities.
//This allows us to run all of these in sequence by specifying one task.
gulp.task('js', ['lint', 'qunit'], function () {
  new Notifier(successNotifier).notify({
    title: 'JavaScript Tasks Complete!',
    message: 'Linting and tests all OK!',
    icon: fs.readFileSync(__dirname + '/Check.png'),
    sound: false
  });
});