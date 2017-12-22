var express = require('express');
var router = express.Router();
var request = require("request");
var bodyparser = require('body-parser');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "practo_hack"
});



router.use(bodyparser.urlencoded({ extended: false }));

router.post('/saveEvent',onRequest);


function onRequest(req,res){

	console.log(req.body.category);

	
  var name = req.body.name;
  var date = req.body.date;
  var loc = req.body.loc;
  var des = req.body.des;


   var val = "('"+name+"','"+des+"','"+date+"','"+loc+"','aaa')";
var sql = "INSERT INTO events (name,des,date,loc,tag) VALUES "+val+";";
console.log(sql);
  con.query(sql ,function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");

    res.redirect('events')
/*

    res.writeHead(301,   {Location: 'localhost:3030/events'});
    res.end();*/

  });
	

     
}







module.exports = router;