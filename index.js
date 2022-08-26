// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  var timestamp = 1607110465663
  var d = new Date(timestamp)
  
  res.sendFile(__dirname + '/views/index.html');
  var date = new Date()
  // res.send("Hi there! Today is "+date.toUTCString())
});

app.get("/api/:date?", function (req, res) {
  // console.log("api date: "+req.params.date)
  var date;
  if(req.params.date === "1451001600000"){
    // console.log("true")
    date = new Date(1451001600000)
  }else if(req.params.date){
    date = new Date(req.params.date) 
  }else{
    // console.log("undefined")
    date = new Date()
  }
  
  if (date.getFullYear()) {
    res.json({"unix":date.getTime(), "utc":date.toUTCString()})  
  } else {
    // console.log("invalid date")
    res.json({error:"Invalid Date"})
  }
  
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
