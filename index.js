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
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  console.log("req params: " + req.params.date)
  let date;
  if(!isNaN(req.params.date)){
    //is a number --> assuming its a unix timestap value
    date = new Date(parseInt(req.params.date))
  } else {
    //not a number
    if(req.params.date === undefined){
      // empty --> use current date
      date = new Date()
    } else {
      date = new Date(req.params.date)
    }
  }

  if(date.toString() === 'Invalid Date'){
    console.log("Error: Invalid Date")
    res.json({ error: "Invalid Date" })
  }

  if(!isNaN(date) && date.toString() != "Invalid Date"){
    //date is not NaN or invalid --> send result
    console.log("unix: " + date.getTime() +  ", utc: " + date.toUTCString())
    res.json({ "unix" : date.getTime() , "utc" : date.toUTCString() })
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
