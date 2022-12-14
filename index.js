var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello GET' });
});

app.get("/api/:date?", function(req, res) {
  let tunix,tutc;
  let regn = new RegExp(/^\d+$/);
  let dt = req.params.date;
  console.log(`request date:${dt}`);
  if (regn.test(dt)) {
    tunix = dt;
    tutc = new Date(Number(dt)).toUTCString();
  } else if (dt===undefined){
    let now = Date.now();
    tunix = now;
    tutc = new Date(now).toUTCString();
  } else if (Date.parse(dt)){
    tunix = new Date(dt).getTime();
    tutc = new Date(dt).toUTCString();
  }  
  if (!Date.parse(dt)&&dt!==undefined&&!regn.test(dt)){
    res.json({ error : "Invalid Date"});
  } else {
  res.json({ 
    unix: Number(tunix),
    utc: tutc
  });
  }
});

if(require.main === module ) {

  app.listen(port, 
      () => 
          console.log( `Express started on http://localhost:${port}` +
          '; press Ctrl-C to terminate.')
  );
  
  } else {
      module.exports = app
  }