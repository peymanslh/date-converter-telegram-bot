const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', router);

/*
 * Debug mode
 * Log in console
 */
app.use(logger('dev'));

// catch 404 and send to error handler
// app.use(function(err, req, res, next) {
//   let error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.send('error');
  console.log(err);
});

module.exports = app;
