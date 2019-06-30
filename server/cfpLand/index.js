const requestPromise = require("request-promise");

const parseEvents = require("./modules/parse");

const URL = "https://www.cfpland.com/conferences/";

function getCfpLandEvents() {
  return requestPromise(URL)
    .then(html => parseEvents(html))
    .catch(function(err) {
      console.log(err);
      return [];
    });
}

module.exports = getCfpLandEvents;
