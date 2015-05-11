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
  return gulp.src('../BenefitsCenter.Tests/js-test-runner.html')
    .pipe(qunit());
});

//Define a task (js) that has the other tasks (lint and qunit) as prerequisities.
//This allows us to run all of these in sequence by specifying one task.
gulp.task('js', ['lint', 'qunit']);