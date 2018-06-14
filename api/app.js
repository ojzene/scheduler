var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var index = require('./routes/index');
const api = require('./routes/api/index');
// var users = require('./routes/users');

var app = express();

mongoose.Promise = global.Promise;

//Adds connection to database using mongoose
//mongoose.connect('mongodb://kanmit:notice2011@ds257470.mlab.com:57470/appointments', {}); // for my remote
mongoose.connect("mongodb://127.0.0.1:27017/appointments", {});

app.all('/*', function(req, res, next) {
   // CORS headers
   res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   // Set custom headers for CORS
   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-KEY');
   if(req.method == 'OPTIONS') {
       res.status(200).end();
   } else {
       next();
   }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
