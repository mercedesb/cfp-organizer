const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const parseEvents = require('./modules/parse');

const PAPERCALL_URL = 'https://www.papercall.io/events?open-cfps=true&page=';
const PAPERCALL_PAGE_NUMBER_SELECTOR = '.pagination li:nth-last-child(2) a';
// const PAPERCALL_PAGINATION_SELECTOR = '.pagination li:not(.prev):not(.next) > *';

let pageNumbers;

function scrapePageOfEvents(pageNumber) {
  const url = `${PAPERCALL_URL}${pageNumber}`;

  return requestPromise(url)
    .then(function (html) {
      const $ = cheerio.load(html);
      setPageNumbers($);
      return parseEvents(html);
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