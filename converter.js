// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const port = 3090;
const app = express();

app.use(express.static(__dirname + "/assets"));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  var amount = String(req.body.amount);
    var firstImput = String(req.body.crypto);
    var secondImput = String(req.body.fiat);
  var options = { // "options, url, method, qs" comes from express.com, "from, to, amount" from bitcoinaverage
    url: "https://apiv2.bitcoinaverage.com/convert/global?",
    method: "GET",
    qs: {
      from: firstImput,
      to: secondImput,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    var time = data.time;

    res.write("<p>The current date is " + time + " (GMT).</p>");
    res.write("<h1>The price for " + amount + " " + firstImput + " is rightnow: " + price + " " + secondImput + ".</h1>");
    res.send();

  });

  // request("https://apiv2.bitcoinaverage.com/indices/global/ticker/" + firstImput + secondImput, function(error, response, body) {
  //   var data = JSON.parse(body);
  //   var weeklyAverage = data.averages.week;
  // console.log(weeklyAverage);
  //   res.write("<p>The weekly average for 1 " + firstImput + " is " + weeklyAverage + " " + secondImput + ".</p>");
  //   res.send();
  // });

});





app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
