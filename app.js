var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var cors = require('cors');
var corsWhiteList = (process.env.CORS_WHITE_LIST || "").split(",");
var corsOptions = {
  origin: (origin, callback)=>{
    if(corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  }
}
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/api', cors(corsOptions), apiRouter);
//app.use('/users', usersRouter);

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
