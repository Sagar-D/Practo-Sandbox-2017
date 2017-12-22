var express = require('express');
var router = express.Router();
var request = require("request");
var mysql = require('mysql');
var fscsv = require('fast-csv');
var fs = require('fs');
var csvWriter = require('csv-write-stream');

router.get('/',onRequest);
router.get('/index',onRequest);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "practo_hack"
});


function onRequest(req,res){

	console.log("Got a request for login...");

	con.query("select * from ( select drug_id, count(drug_id) as tmpcount from tab1 group by drug_id) as tmp where tmpcount > 60;", function (err, result, fields) {
        if (err) throw err;
        
        con.query(" select * from ( select drug_id, sum(quantity * mrp) as revenue from tab1 where month like 'December' group by drug_id) as tmp order by revenue desc limit 0, 10;",function(er,result2,fields2){
        	if (er) throw er;

        	console.log(result2);

        	var labellist = "";
        	var valuelist = "";
        	for (var i = 0; i <= result2.length - 1; i++) {
        		labellist += result2[i].drug_id+" ";
        		valuelist += result2[i].revenue +" ";
        	}

        	/*var csvStream = csv.createWriteStream({headers: true}),
		    writableStream = fs.createWriteStream("/my.csv");
	 
			writableStream.on("finish", function(){
			  console.log("DONE!");
			});
			 
			csvStream.pipe(writableStream);
			csvStream.write({a: "a0", b: "b0"});
			csvStream.write({a: "a1", b: "b1"});
			csvStream.write({a: "a2", b: "b2"});
			csvStream.write({a: "a3", b: "b4"});
			csvStream.write({a: "a3", b: "b4"});
			csvStream.end();*/


			/*var fast_csv = fs.createWriteStream();
			var csvStream = fs.createWriteStream("/outputfile.csv");
			fast_csv.pipe(csvStream);

			csvStream.write([1,2]);
			csvStream.write([3,4]);
			csvStream.write([5,6]);
			csvStream.write([2,3]);
			csvStream.end();*/


			/*var writer = csvWriter()
			writer.pipe(fs.createWriteStream('./public/data.csv'))
			for (var i = 0; i <= result2.length - 1; i++) {
				writer.write({"DrugId" : result2[i].drug_id, "Revenue":  Math.ceil(result2[i].revenue)});
			}
			writer.end()*/


             con.query("select * from ( select drug_id, count(drug_id) as tmpcount from tab1 group by drug_id) as tmp where tmpcount > 100;", function (err, result2, fields) {
            if (err) throw err;
            

            con.query("select * from pharma;", function (err, result3, fields) {
            if (err) throw err;
            
           	console.log(result3); 

			res.render('index',{"selectlist" : result, "valuelist" : valuelist, "labellist" : labellist,"druglist":result2,"pharma" : result3},null);
        	});

        	});
        });

console.log(result[0].drug_id);
	


     });



}







module.exports = router;