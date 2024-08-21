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

app.get("/api",function (req, res) {
  let data={unix:Date.now(), utc:null};
  data.utc = new Date(Number(data.unix)).toUTCString()
  res.json(data)
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const regex = /^\d+$/
  const date = req.params.date==""? Number(Date.now()) : req.params.date;
  let data={unix:null, utc:null};
  if(regex.test(date)){
     data.utc = new Date(Number(date)).toUTCString()
     data.unix = Number(date)
  }else{
     data.unix = Date.parse(date)
     data.utc = new Date(Number(data.unix)).toUTCString()
  }
  res.json(data.utc!="Invalid Date"? data:{error:"Invalid Date"})
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
