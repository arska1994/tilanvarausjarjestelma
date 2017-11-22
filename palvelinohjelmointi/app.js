var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

var index = require('./routes/indexRoute');
var varausjarjestelma = require('./routes/varausjarjestelmaRoute');

var app = express();

// Sequelize yhteysasetukset
const Sequelize = require('sequelize');
const sequelize = new Sequelize('tilanvaraus_ryhma_e', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize.authenticate().then(() => {
  console.log('Tietokantayhteys onnistui.');
}).catch(err => {
  console.error('Ei voitu yhdistää tietokantaan:', err);
});

// view engine asetukset
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1) // trust first proxy

// poista kommentti kun favicon on laitettu kansioon /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
var vanhenemisPvm = new Date(Date.now() + 60 * 60 * 1000) // 1 tunti
app.use(session({
  name: 'sessio',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    expires: vanhenemisPvm
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/varausjarjestelma', varausjarjestelma);

// kerää 404 ja lähetä virhekäsittelijälle
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// virhekäsittelijä
app.use(function (err, req, res, next) {
  // aseta paikalliset, tarjoaa virhet ainostaan kehitysvaiheessa
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // tulosta virhesivu
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
