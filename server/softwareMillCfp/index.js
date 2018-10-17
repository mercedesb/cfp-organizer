const requestPromise = require('request-promise');

const parseEvents = require('./modules/parse');

const URL = 'https://github.com/softwaremill/it-cfp-list';

function getSoftwareMillEvents() {
  return requestPromise(URL)
  .then(html => parseEvents(html))
  .catch(function (err) {
    console.log(err)
    return [];
  });
}

module.exports = getSoftwareMillEvents;