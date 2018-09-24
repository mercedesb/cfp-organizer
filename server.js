const express = require('express');
var mcache = require('memory-cache');
const requestPromise = require('request-promise');
const cheerio = require('cheerio');

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

const PAPERCALL_URL = 'https://www.papercall.io/events?open-cfps=true&page=';
const PAPERCALL_DATE_HEADER = 'Event Dates: '
const PAPERCALL_PAGE_NUMBER_SELECTOR = '.pagination li:nth-last-child(2) a';
// const PAPERCALL_PAGINATION_SELECTOR = '.pagination li:not(.prev):not(.next) > *';
const PAPERCALL_EVENT_ROW_SELECTOR = '.panel.panel-default';
const PAPERCALL_DATE_CONTAINER_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4 > strong';
const PAPERCALL_HEADING_SELECTOR = '.event__title a';
const PAPERCALL_CFP_CLOSE_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4 > table tr:first-child td:nth-child(2)';

let pageNumbers;

app.get('/api/openCfps', cache(ONE_DAY), (req, res) => {
  let events = [];
  const promises = [];
  scrapePageOfEvents(1).then((firstPageOfEvents) => {
    events = events.concat(firstPageOfEvents);

    let i = 2;
    while (i <= pageNumbers) {
      promises.push(scrapePageOfEvents(i));
      i += 1;
    }

    Promise.all(promises).then(function (pagesOfEvents) {
      pagesOfEvents.forEach((pageOfEvents) => {
        events = events.concat(pageOfEvents);
      })
      res.send({ events: events })
    });
  });
});

function scrapePageOfEvents(pageNumber) {
  const url = `${PAPERCALL_URL}${pageNumber}`;

  return requestPromise(url)
    .then(function (html) {
      const $ = cheerio.load(html);

      // populate the number of pages to fetch from the first page load
      if (!pageNumbers) {
        pageNumbers = parseInt($(PAPERCALL_PAGE_NUMBER_SELECTOR).text());
      }

      const events = []
      $(PAPERCALL_EVENT_ROW_SELECTOR).each(function (i, el) {
        let date = $(el).find(PAPERCALL_DATE_CONTAINER_SELECTOR).parent().text();
        date = parseDate(date);

        const eventHeading = $(el).find(PAPERCALL_HEADING_SELECTOR).last().text();
        const splitName = eventHeading.split('-');

        events[i] = {
          name: splitName[0].trim(),
          location: splitName[splitName.length - 1].trim(),
          date: date,
          // September 29, 2018 09:09 UTC
          cfpClose: $(el).find(PAPERCALL_CFP_CLOSE_SELECTOR).text()
        };
      });
      return events;
    })
    .catch(function (err) {
      console.log(err)
      return [];
    });
};

function parseDate(dateText) {
  if (!dateText) return;

  dateText = dateText.replace(PAPERCALL_DATE_HEADER, "").trim();

  const dateRegex = /^[A-Za-z]+ \d{2}, \d{4}/;
  const regexMatch = dateText.match(dateRegex);
  if (regexMatch && regexMatch.length > 0) {
    dateText = dateText.match(dateRegex)[0];
    return dateText;
  }
}

app.listen(port, () => console.log(`Listening on port ${port}`));