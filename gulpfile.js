var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var through = require('through2');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var bump = require('gulp-bump');
var shell = require('gulp-shell');
var karma = require('karma').server;
var connect = require('gulp-connect');
var gulpProtractor = require("gulp-protractor").protractor;
var bumpVersion = function(type) {
  type = type || 'patch';
  var version = '';
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'))
    .pipe(tap(function(file, t) {
      version = JSON.parse(file.contents.toString()).version;
    })).on('end', function() {
      var color = gutil.colors;
      gulp.src('')
        .pipe(shell([
          'git commit --all --message "Version ' + version + '"',
          (type != 'patch' ? 'git tag --annotate "v' + version + '" --message "Version ' + version + '"' : 'true')
        ], {ignoreErrors: false}))
        .pipe(tap(function() {
          gutil.log(color.green("Version bumped to ") + color.yellow(version) + color.green(", don't forget to push!"));
        }));
    });
};

gulp.task('clean', function() {
  return gulp.src('bulid')
    .pipe(clean({force: true}));
});

gulp.task('build-js', function() {
  return gulp.src([
      'app/scripts/app.js', 'app/scripts/nui-form-for.js', 'app/scripts/nui-rule.js'
    ])
    .pipe(concat('nui-form-for.debug.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(stripDebug())
    .pipe(concat('nui-form-for.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(uglify())
    .pipe(rename('nui-form-for.min.js'))
    .pipe(gulp.dest('build/scripts'))
    .on('error', gutil.log);
});

gulp.task('bump', ['build'], function() { bumpVersion('patch'); });
gulp.task('bump:patch', ['build'], function() { bumpVersion('patch'); });
gulp.task('bump:minor', ['build'], function() { bumpVersion('minor'); });
gulp.task('bump:major', ['build'], function() { bumpVersion('major'); });

gulp.task('build', function(callback) {
  runSequence('clean', 'build-js', callback);
});
