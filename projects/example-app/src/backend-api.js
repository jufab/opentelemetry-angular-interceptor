'use strict';
const express = require('express');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const backendApp = express();
backendApp.use(bodyParser.urlencoded({ extended: false }));
backendApp.use(bodyParser.json());

class Result {
  constructor(result) {
    this.result = result;
  }
}

//
backendApp.get('/api', (req, res) => {
  const result = new Result("ok");
  return res.status(200).send(result);
})

backendApp.post('/api', (req, res) => {
  const result = new Result(req.body.result);
  return res.status(201).send(result);
})

backendApp.get('/api/jsonp', (req, res) => {
  const result = new Result("ok");
  return res.jsonp(result);
})

backendApp.listen(PORT, () =>
  console.log(`Backend App for example-app listening on port ${PORT}!`),
);
