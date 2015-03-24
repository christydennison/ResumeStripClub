var gulp = require('gulp');
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var serve = serveStatic('./');

gulp.task('server', function() {
    var server = http.createServer(function(req, res){
      var done = finalhandler(req, res)
      serve(req, res, done)
    });

    server.listen(8000);
});