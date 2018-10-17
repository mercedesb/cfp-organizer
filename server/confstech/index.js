const puppeteer = require('puppeteer');

const parseEvents = require('./modules/parse');

const URL = 'https://confs.tech/cfp/';

function getConfsTechEvents() {
  return puppeteer
    .launch()
    .then(function (browser) {
      return browser.newPage();
    })
    .then(function (page) {
      return page.goto(URL).then(function () {
        return page.content();
      });
    })
    .then(html => parseEvents(html))
    .catch(function (err) {
      console.log(err)
      return [];
    });
}

module.exports = getConfsTechEvents;