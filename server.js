require('rootpath')();
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var db = require('./services/db')

db.connect('mongodb://battleUser:battlePass2018@ds147180.mlab.com:47180/battlesapi', function(err) {
// db.connect('mongodb://localhost:27017/coursecatalog', function(err) {
  if (err) {
    console.log('Unable to connect to MongoDB.')
    console.log(err);
    process.exit(1)
  }

  console.log("Connected successfully to MongoDB server");

})

app.use('/', require('./controller/battle.controller'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = 2222;
var server = app.listen(process.env.PORT || port, function () {
    console.log('Server listening on port ' + port);
});

console.log('running...');