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

var arr = ["kannur","wayanad","kozhikode","malappura","palakkad","thrissur","ernakulam","idukki","kottayam","pathanam","kollam ","thiruvananthapuram "];


router.use(bodyparser.urlencoded({ extended: false }));

router.post('/addEvent',onRequest);


function onRequest(req,res){

	console.log(req.body.category);

	if(req.body.category == ""){
		res.render('addEvent',{},null);
	}else{

		con.query("Select * from stats where id like '"+req.body.category+"';", function (err, result, fields) {
            if (err) throw err;
            
            console.log(result[0]);
           var values = "";
           var labels = "";

           for(var i=0;i<arr.length;i++){

           		labels += arr[i] +" ";

           }         

            values += result[0].kannur+ " " ;
            values += result[0].wayanad+ " " ;
            values += result[0].kozhikode+ " " ;
            values += result[0].malappura+ " " ;
            values += result[0].palakkad+ " " ;
            values += result[0].thrissur+ " " ;
            values += result[0].ernakulam+ " " ;
            values += result[0].idukki+ " " ;
            values += result[0].kottayam+ " " ;
            values += result[0].pathanam+ " " ;
            values += result[0].kollam+ " ";
            values += result[0].thiruvananthapuram + " " ;


           console.log(values);
           console.log(labels);  


           		res.render('addEvent',{"values" : values,"labels" : labels},null);

     });



	}

	
     
}







module.exports = router;