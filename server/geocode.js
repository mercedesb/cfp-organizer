var NodeGeocoder = require('node-geocoder');

var continents = require('../data/continents.json');
var countries = require('../data/countries.json');
var hereConfig = require('../hereConfig.json');

var options = {
  provider: 'here',
  appId: hereConfig.appId,
  appCode: hereConfig.appCode,
  language: 'en'
};

var geocoder = NodeGeocoder(options);

function geocode(data) {
  let promises = [];
  data.forEach((dataItem) => {
    let promise = geocoder.geocode(dataItem.location)
      .then(function (geocodeResponse) {
        let geoCodeData = { city: '', country: '', countryCode: '' };
        if (geocodeResponse && geocodeResponse.length > 0) {
          geoCodeData = geocodeResponse[0];
        } 

        dataItem['city'] = geoCodeData.city || '';
        dataItem['country'] = geoCodeData.country || '';
        dataItem['countryCode'] = geoCodeData.countryCode || '';
        dataItem['continent'] = continents[(countries[geoCodeData.countryCode] || {}).continent] || '';
        return dataItem;
      })
      .catch(function (err) {
        console.log(err);
      })
    promises.push(promise);
  });

  return Promise.all(promises).then((data) => {
    return data;
  })
}

module.exports = geocode;
