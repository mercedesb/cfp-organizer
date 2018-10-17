const cheerio = require('cheerio');
const dateformat = require('dateformat');

const EVENT_TABLE_CONTAINER_SELECTOR = '.markdown-body.entry-content table';
const EVENT_CONTAINER_SELECTOR = 'tbody tr';

function parseEvents(html) {
  try {
    const $ = cheerio.load(html);
  
    const events = []
    const eventTable = $(EVENT_TABLE_CONTAINER_SELECTOR)[0]
    $(eventTable).find(EVENT_CONTAINER_SELECTOR).each(function (i, el) {
      events[i] = parseEvent($, el);
    });
    return events;
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

function parseEvent($, el) {
  const eventDataItems = $(el).find('td')
  let name, location, date, url, cfpClose, cfpUrl, eventTags;

  name = $(eventDataItems[3]).text();
  date = $(eventDataItems[1]).text();
  location = $(eventDataItems[2]).text();
  url = $(eventDataItems[3]).children().attr('href');
  cfpClose = $(eventDataItems[0]).text();
  cfpUrl = $(eventDataItems[4]).children().attr('href');
  eventTags = $(eventDataItems[5]).text();

  return {
    name: name || '',
    location: location || '',
    // "2018-10-29" -> October, 29, 2018
    date: parseDate(date),
    url: url || '',
    cfpClose: parseDate(cfpClose),
    cfpUrl: cfpUrl || '',
    eventTags: eventTags || ''
  };
}

function parseDate(text) {
  // isoDate -> longDate
  if (!text) return '';

  const matches = text.match(/\d{4}\.\d{2}.\d{2}/)
  if (!!matches && matches.length > 0)
    return dateformat(matches[0], 'longDate');
  else
    return ''
}

module.exports = parseEvents;