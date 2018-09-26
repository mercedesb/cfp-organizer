const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const PAPERCALL_URL = 'https://www.papercall.io/events?open-cfps=true&page=';
const PAPERCALL_DATE_HEADER = 'Event Dates: '
const PAPERCALL_PAGE_NUMBER_SELECTOR = '.pagination li:nth-last-child(2) a';
// const PAPERCALL_PAGINATION_SELECTOR = '.pagination li:not(.prev):not(.next) > *';
const PAPERCALL_EVENT_ROW_SELECTOR = '.panel.panel-default';
const PAPERCALL_DATE_CONTAINER_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4 > strong';
const PAPERCALL_HEADING_SELECTOR = '.event__title a:last-child';
const PAPERCALL_EVENT_URL_SELECTOR = 'h4.hidden-xs a';
const PAPERCALL_CFP_CLOSE_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4 > table tr:first-child td:nth-child(2)';
const PAPERCALL_EVENT_TAGS_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4:last-child';
let pageNumbers;

function scrapePageOfEvents(pageNumber) {
  const url = `${PAPERCALL_URL}${pageNumber}`;

  return requestPromise(url)
    .then(function (html) {
      const $ = cheerio.load(html);
      setPageNumbers($);

      const events = []
      $(PAPERCALL_EVENT_ROW_SELECTOR).each(function (i, el) {
        events[i] = getEvent($, el);
      });
      return events;
    })
    .catch(function (err) {
      console.log(err)
      return [];
    });
}

function setPageNumbers($) {
  // populate the number of pages to fetch from the first page load
  if (!pageNumbers) {
    pageNumbers = parseInt($(PAPERCALL_PAGE_NUMBER_SELECTOR).text());
  }
}

function getEvent($, el) {
  const date = $(el).find(PAPERCALL_DATE_CONTAINER_SELECTOR).parent().text();
  const eventHeading = $(el).find(PAPERCALL_HEADING_SELECTOR).text();
  const eventUrl = $(el).find(PAPERCALL_EVENT_URL_SELECTOR).text();
  const cfpUrl = $(el).find(PAPERCALL_HEADING_SELECTOR).attr('href');
  const cfpClose = $(el).find(PAPERCALL_CFP_CLOSE_SELECTOR).text();

  let tags = []
  $(el).find(PAPERCALL_EVENT_TAGS_SELECTOR).children().each(function (i, elem) {
    tags[i] = $(elem).text();
  });
  const eventTags = tags.join(', ');

  return {
    name: parseName(eventHeading),
    location: parseLocation(eventHeading),
    date: parseDate(date),
    // September 29, 2018 09:09 UTC
    cfpClose: cfpClose || '',
    url: eventUrl || '',
    cfpUrl: cfpUrl || '',
    eventTags: eventTags
  };
}

function parseName(text) {
  const splitName = text.split('-');
  return splitName.length > 0 ? splitName[0].trim() : ''
}

function parseLocation(text) {
  const splitName = text.split('-');
  return splitName.length > 0 ? splitName[splitName.length - 1].trim() : ''
}

function parseDate(text) {
  if (!text) return;

  text = text.replace(PAPERCALL_DATE_HEADER, "").trim();

  const dateRegex = /^[A-Za-z]+ \d{2}, \d{4}/;
  const regexMatch = text.match(dateRegex);
  if (regexMatch && regexMatch.length > 0) {
    text = text.match(dateRegex)[0];
    return text;
  }
}

const getPapercallEvents = function () {
  const promises = [];
  return scrapePageOfEvents(1)
    .then((firstPageOfEvents) => {
      let i = 2;
      while (i <= pageNumbers) {
        promises.push(scrapePageOfEvents(i));
        i += 1;
      }

      return Promise.all(promises)
        .then(function (pagesOfEvents) {
          pagesOfEvents.unshift(firstPageOfEvents);
          return [].concat.apply([], pagesOfEvents); // .flat() is still in Candidate and not avail in Node
        });
    });
}

module.exports = getPapercallEvents;