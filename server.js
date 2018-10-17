const express = require('express');
const path = require('path');
var mcache = require('memory-cache');

const getPapercallEvents = require('./server/papercall');
const getConfsTechEvents = require('./server/confstechScraper');
const getSoftwareMillEvents = require('./server/softwareMillCfpScraper');
const getCfpsFromData = require('./server/dataFetcher');
const filterOutPastEvents = require('./server/filterEvents');
const geocode = require('./server/geocode');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const CACHE_DURATION = 60 * 60 * 24;

const cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody && process.env.NODE_ENV !== 'development') {
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

app.get('/api/openCfps', cache(CACHE_DURATION), (req, res) => {
  const promises = [];
  promises.push(getPapercallEvents());
  promises.push(getConfsTechEvents());
  promises.push(getSoftwareMillEvents());
  promises.push(getCfpsFromData());

  return Promise.all(promises)
    .then((arrReturnedEvents) => {
      return [].concat.apply([], arrReturnedEvents); // .flat() is still in Candidate and not avail in Node
    })
    .then(events => filterOutPastEvents(events))
    .then(events => geocode(events))
    .then(events => res.send({ events: events }));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));