require('./Components/CmdArgMan');
const SessionManager = require('./Components/auth/SessionManager');

console.log(`Current Mode : ${process.env.NODE_ENV}`);

if( process.env.NODE_ENV == 'development') {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
app.set('trust proxy', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.session = SessionManager.initSession(app);
//googleOAuth.init(app);

app.use('/', indexRouter);
app.use(require('connect-history-api-fallback')());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
