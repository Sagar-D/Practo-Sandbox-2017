var regression = require('regression');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyparser = require('body-parser');


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

router.use(bodyparser.urlencoded({ extended: false }));

router.post('/predict',onRequest);


function onRequest(req,res){

    var id = req.body.drug_id;

    
            con.query("SELECT sum(quantity) as c1, month FROM tab1 where drug_id = "+id+" group by month;", function (err, result, fields) {
        if (err) throw err;
            console.log(result[0].month);
            var dataPoints = [];
            var regdp = [];
            var xpoints ="";
            var ypoints ="";
            for (var i = result.length - 1; i >= 0; i--) {
                var point = [result[i].c1,months[result[i].month]];
                var rp = [months[result[i].month],result[i].c1];
                xpoints += months[result[i].month]+" ";
                ypoints += result[i].c1 + " ";
                dataPoints.push(point);
                regdp.push(rp);
            }

            console.log(dataPoints);


            const reg = regression.linear(regdp);
            const gradient = reg.equation[0];
            const yIntercept = reg.equation[1];

            var x = 13;
            var y = Math.ceil(gradient*x+yIntercept);
            var point = [y,x];
            dataPoints.push(point);
            xpoints += x +" ";
            ypoints += y+" ";
            console.log(point);

            console.log("xpoints : "+xpoints);
            console.log("ypoints : "+ypoints);


            res.render('predict',{"xp" : xpoints,"yp" : ypoints},null);


     });

   
	
}







module.exports = router;