var gulp = require('gulp');
var spawn = require('child-proc').spawn;

gulp.task('auto-reload-gulp', ['gulpfile'], function() {
  var p;

  function restart() {
    if (p) {
      p.kill();
    }

    p = spawn('gulp', ['watch'], { stdio: 'inherit' });
  }

  gulp.watch('gulpfile.js', restart);
  // restart();
});