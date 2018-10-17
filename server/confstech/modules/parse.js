const cheerio = require('cheerio');
const dateformat = require('dateformat');

const EVENT_CONTAINER_SELECTOR = '._77wxq2CqJlAxR_motx3ug';
// "{"@context":"http://schema.org","@type":"Event","location":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":"Warsaw","addressCountry":"Poland"},"name":"Warsaw, Poland"},"name":"ConFrontJS 2018","startDate":"2018-10-29","url":"https://confrontjs.com","endDate":"2018-10-29"}"
const EVENT_CFP_TAGS_CONTAINER_SELELCTOR = '.fFsN5Wluik3Xc_qQgVTP3.MY0Lq_wX1NNKPVse04Yop';
const EVENT_CFP_SELECTOR = '._3tKep-gOBih3iBP93J8fm_';
const EVENT_CFP_HEADER = "CFP closes ";

function parseEvents(html) {
  const $ = cheerio.load(html);

  const events = []
  $(EVENT_CONTAINER_SELECTOR).each(function (i, el) {
    events[i] = parseEvent($, el);
  });
  return events;
}

function parseEvent($, el) {
  const eventJsonData = el.firstChild.firstChild.data; // find('script') doesn't work

  let eventData;
  if (!!eventJsonData) {
    eventData = JSON.parse(eventJsonData)
  }

  let name, location, date, url, cfpClose, cfpUrl, eventTags;

  if (!!eventData) {
    name = eventData.name;
    date = eventData.startDate;
    location = eventData.location.name;
    url = eventData.url;
  }

  const cfpTagsContainer = $(el).find(EVENT_CFP_TAGS_CONTAINER_SELELCTOR);

  const cfpContainer = $(cfpTagsContainer).find(EVENT_CFP_SELECTOR)[0];
  cfpUrl = cfpContainer.attribs.href;
  cfpClose = cfpContainer.firstChild.data;
  cfpClose = cfpClose.replace(EVENT_CFP_HEADER, "").trim(); // needs to  calculate year

  // #javascript –
  const matches = $(cfpTagsContainer).text().match(/#(.+) –/)
  eventTags = !!matches && matches.length > 1 ? matches[1] : ''

  return {
    name: name || '',
    location: location || '',
    // "2018-10-29" -> October, 29, 2018
    date: parseDate(date),
    url: url || '',
    cfpClose: parseDate(addYear(cfpClose)),
    cfpUrl: cfpUrl || '',
    eventTags: eventTags || ''
  };
}

function addYear(text) {
  if (!text) return '';

  const today = new Date();
  let currentYear = today.getFullYear();

  const withWrongYear = parseDate(text);
  let date = new Date(withWrongYear);
  date.setFullYear(currentYear);
  if (date < today) {
    date.setFullYear(currentYear + 1);
  }
  return date;
}

function parseDate(text) {
  // isoDate -> longDate
  if (!text) return '';
  return dateformat(text, 'longDate', true);
}

module.exports = parseEvents;