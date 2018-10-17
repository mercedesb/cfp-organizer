const cheerio = require('cheerio');
const dateformat = require('dateformat');

const PAPERCALL_EVENT_ROW_SELECTOR = '.panel.panel-default';
const PAPERCALL_DATE_HEADER = 'Event Dates: '
const PAPERCALL_DATE_CONTAINER_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4 > strong';
const PAPERCALL_HEADING_SELECTOR = '.event__title a:last-child';
const PAPERCALL_EVENT_URL_SELECTOR = 'h4.hidden-xs a';
const PAPERCALL_CFP_CLOSE_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4 > table tr:first-child td:nth-child(2)';
const PAPERCALL_EVENT_TAGS_SELECTOR = '.panel-body .row .col-md-11.col-sm-12 h4:last-child';

function parseEvents(html) {
  try {
    const $ = cheerio.load(html);
    const events = []
    $(PAPERCALL_EVENT_ROW_SELECTOR).each(function (i, el) {
      events[i] = parseEventRow($, el);
    });
    return events;
  }
  catch(err) {
    console.log(err)
    return [];
  }
}

function parseEventRow($, el) {
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
    cfpClose: parseDate(cfpClose),
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
  if (!text) return '';

  text = text.replace(PAPERCALL_DATE_HEADER, "").trim();

  const dateRegex = /^[A-Za-z]+ \d{2}, \d{4}/;
  const regexMatch = text.match(dateRegex);
  if (regexMatch && regexMatch.length > 0) {
    text = text.match(dateRegex)[0];
    return dateformat(text, 'longDate', true);
  }

  return '';
}

module.exports = parseEvents;
