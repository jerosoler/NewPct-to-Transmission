var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*
var FeedMe = require('feedme');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

http.get('http://www.newpct.com/feed', function(res) {
  var parser = new FeedMe();
  parser.on('title', function(title) {
    //console.log('title of feed is', title);
  });
  parser.on('item', function(item) {


              request(item.link, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                  var $ = cheerio.load(html);
                  var urltorrnet = $("#content-torrent > a").attr("href");
                  console.log('news:', item.title);
                  console.log(item.link);
                  console.log(urltorrnet);
                }
                });

  });
  res.pipe(parser);
});
*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
