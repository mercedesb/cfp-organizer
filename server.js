const express = require('express');
var mcache = require('memory-cache');

const getPapercallEvents = require('./server/papercallScraper');
const geocode = require('./server/geocode');

const app = express();
const port = process.env.PORT || 5000;

const ONE_DAY = 60 * 60 * 24;

const cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.get('/api/openCfps', cache(ONE_DAY), (req, res) => {
  getPapercallEvents()
  .then(events => geocode(events))
  .then(events => res.send({ events: events }));
});


app.listen(port, () => console.log(`Listening on port ${port}`));