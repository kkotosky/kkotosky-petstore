const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

const bodyParser = require('body-parser');

var pets = require('./routes/pets');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/pets', pets);

app.listen(port, () => {
  console.log('listening on port', port);
})