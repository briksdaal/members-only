var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const verifyRouter = require('./routes/verify');
const verifyAdminRouter = require('./routes/verifyAdmin');
const messagesRouter = require('./routes/messages');

var app = express();

const db = require('./mongooseconnection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Sessions */
const sessionStore = MongoStore.create({
  client: db.getClient(),
  collectionName: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* Passport */
require('./passportConfig');
app.use(passport.initialize());
app.use(passport.session());

/* Set user in locals */
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* Routes */
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/verify', verifyRouter);
app.use('/verify-admin', verifyAdminRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
