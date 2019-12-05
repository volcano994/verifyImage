var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

var common = require('./routes/common.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use('/common', common);

app.listen(3000, function () {
  console.log('the server running at http://127.0.0.1:3000......');
});