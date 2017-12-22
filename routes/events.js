var regression = require('regression');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "practo_hack"
});

var months = {
    "January" : 1,
    "February" : 2,
    "March" : 3,
    "April" : 4,
    "May" : 5,
    "June" : 6,
    "July" : 7,
    "August" : 8,
    "September" : 9,
    "October" : 10,
    "November" : 11,
    "December" : 12
}

router.get('/events',onRequest);


function onRequest(req,res){

            console.log("I Am In EvenTs");
    
            con.query("Select * from events;", function (err, result, fields) {
            if (err) throw err;
            
            con.query("Select category from stats;", function (err, result1, fields) {
            if (err) throw err;
           
            
            console.log(result1);

            res.render('events',{"events" : result,"categories":result1},null);


     });

            


     });

   
	
}







module.exports = router;