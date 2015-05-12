/// <vs SolutionOpened='js' />
//jscs:disable
//jshint ignore: start

var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  watch = require('gulp-watch'),
    qunit = require('gulp-qunit');

var applicationScripts = 'Scripts/Application/**/*.js';

gulp.task('watch', function () {
  watch(applicationScripts, function (files, cb) {
    gulp.start('lint');
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
  return gulp.src('../BenefitsCenter.Tests/ClientGulp/js-test-runner.html')
    .pipe(qunit());
});

//Define a task (js) that has the other tasks (lint and qunit) as prerequisities.
//This allows us to run all of these in sequence by specifying one task.
gulp.task('js', ['lint', 'qunit']);