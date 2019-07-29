const express = require('express');

const app = express();

const port = '3000';
app.set('port', port);

app.use( (req, res, next) => {
  console.log('first middleware');
  next();
});


app.use( (req, res, next) => {
  res.send('hello from express');
});


module.exports = app;
