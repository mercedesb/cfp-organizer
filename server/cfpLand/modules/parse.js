const cheerio = require("cheerio");
const dateformat = require("dateformat");

const EVENT_CONTAINER_SELECTOR = ".list-group-item";
const EVENT_CFP_TAGS_SELELCTOR = ".badge";
const EVENT_CFP_URL_SELECTOR = "a:nth-child(2)";
const EVENT_NAME_SELECTOR = `a > h3`;
const EVENT_LOCATION_SELECTOR = "p:nth-child(6)";
const EVENT_CFP_CLOSE_SELECTOR = "p:nth-child(3) time";
const EVENT_DATE_SELECTOR = "p:nth-child(5) time";

function parseEvents(html) {
  const $ = cheerio.load(html);

  const events = [];
  $(EVENT_CONTAINER_SELECTOR).each(function(i, el) {
    events[i] = parseEvent($, el);
  });
  return events;
}

function parseEvent($, el) {
  const name = $(el)
    .find(EVENT_NAME_SELECTOR)
    .text();

  const location = $(el)
    .find(EVENT_LOCATION_SELECTOR)
    .text();

  const date = $(el)
    .find(EVENT_DATE_SELECTOR)
    .attr("datetime");

  const cfpClose = $(el)
    .find(EVENT_CFP_CLOSE_SELECTOR)
    .attr("datetime");

  const cfpUrl = $(el)
    .find(EVENT_CFP_URL_SELECTOR)
    .attr("href");

  const tags = $(el)
    .find(EVENT_CFP_TAGS_SELELCTOR)
    .text();

  const cfpObj = {
    name: name,
    location: parseLocation(location),
    date: parseDate(date),
    // September 29, 2018 09:09 UTC
    cfpClose: parseDate(cfpClose),
    url: "",
    cfpUrl: cfpUrl || "",
    eventTags: parseTags(tags)
  };
  // console.log(cfpObj);
  return cfpObj;
}

function parseDate(text) {
  // isoDate -> longDate
  if (!text) return "";
  return dateformat(text, "longDate", true);
}

function parseLocation(text) {
  if (!text) return "";
  return text.replace("Location: ", "");
}

function parseTags(text) {
  if (!text) return "";
  return text.replace("#", "");
}

module.exports = parseEvents;
