var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const DatabaseService = require('./services/DatabaseService');
const  EncryptionService = require('./services/EncryptionService');


var indexRouter = require('./routes/index');

var boardRouter = require('./routes/board');
var logoutRouter = require('./routes/logout');
var employeeRouter = require('./routes/employee');
var guestRouter = require('./routes/guest');
var roomRouter = require('./routes/room');
var reserveRouter = require('./routes/reserve');

var app = express();

var dbContext = new DatabaseService();
var encryptionService = new EncryptionService();

app.set('dbContext', dbContext);
app.set('encryptionService', encryptionService);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: false
  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/board', boardRouter);
app.use('/logout', logoutRouter);
app.use('/employee', employeeRouter);
app.use('/guest', guestRouter);
app.use('/room', roomRouter);
app.use('/reserve', reserveRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
