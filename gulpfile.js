var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync').create();
var exec = require('child_process').exec;

// gulp.task('mongo', function (cb) {
//   // exec('mongod --config /usr/local/etc/mongod.conf', function (err, stdout, stderr) {
//   //   console.log(stdout);
//   //   console.log(stderr);
//   //   cb(err);
//   // });
// });

// our browser-sync config + nodemon chain
gulp.task('browser-sync', ['nodemon'], function() {
	bs.init(null, {
		proxy: "http://localhost:3000",
		port: 4000,
	});
});

// give nodemon time to restart
gulp.task('bs-delay', function () {
  setTimeout(function () {
    bs.reload({ stream: false });
  }, 1000);
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www',
		ext: 'js',
		ignore: ['public/**/*.js'],
		env: {
			'NODE_ENV': 'development',
			'DEBUG': 'fullstackjs:*'
	 }
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	})
	.on('crash', function() {
		console.log('nodemon.crash');
	})
	.on('restart', function() {
		//console.log('nodemon.restart');
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});

// the real stuff
gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./views/**/*.hbs', bs.reload);
	gulp.watch('./public/**/*.js', bs.reload);
	gulp.watch('./public/**/*.css', bs.reload);
	gulp.watch(['./routes/**/*.js', './app.js', './bin/www'], ['bs-delay']);
});
