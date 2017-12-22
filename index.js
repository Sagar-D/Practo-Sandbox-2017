var express = require('express');
var http = require('http');
var request = require("request");
var wordpos = require("wordpos");


var path = require('path');

var login = require('./routes/index');
var predict = require('./routes/predict');
var events = require('./routes/events');
var addEvent = require('./routes/addEvent');
var saveEvent = require('./routes/saveEvent');

var app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(3030);
console.log("Server is running....");


app.get('/',login);
app.get('/login/',login);

app.post('/predict',predict)
app.get('/events',events);
app.post('/addEvent',addEvent);
app.post('/saveEvent',saveEvent);



