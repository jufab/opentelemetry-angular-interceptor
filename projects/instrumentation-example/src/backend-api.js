'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;
const backendApp = express();
backendApp.use(express.json());
backendApp.use(express.urlencoded({ extended: false }));

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

backendApp.get('/api/config', (req,res) => {
  return res.status(200).send({
    commonConfig: {
      console: true, // Display trace on console
      production: true, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'instrumentation-example', // Service name send in trace
      probabilitySampler: '0.75', // 75% sampling
      logLevel: 99 //ALL Log, DiagLogLevel is an Enum from @opentelemetry/api
    },
    otelcolConfig: {
      url: 'http://localhost:4318/v1/traces', // URL of opentelemetry collector
    },
    instrumentationConfig: {
      xmlHttpRequest: true,
      fetch: true,
      documentLoad: true,
      longTask: true,
    }
  });
})

backendApp.listen(PORT, () =>
  console.log(`Backend App for example-app listening on port ${PORT}!`),
);
