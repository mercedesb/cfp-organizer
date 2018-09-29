var NodeGeocoder = require('node-geocoder');

var continents = require('../data/continents.json');
var countries = require('../data/countries.json');

var options = {
  provider: 'here',
  appId: process.env.NODE_ENV !== 'production' ? require('../hereConfig.json').appId : process.env.HERE_APP_ID,
  appCode: process.env.NODE_ENV !== 'production' ? require('../hereConfig.json').appCode : process.env.HERE_APP_CODE,
  language: 'en'
};

var geocoder = NodeGeocoder(options);

function geocode(data) {
  let i = 0
  let promises = [];
  data.forEach((dataItem) => {
    let promise = geocoder.geocode(dataItem.location)
      .then(function (geocodeResponse) {
        let geoCodeData = { city: '', country: '', countryCode: '' };
        if (geocodeResponse && geocodeResponse.length > 0) {
          geoCodeData = geocodeResponse[0];
        } 
        
        dataItem['lat'] = geoCodeData.latitude || '';
        dataItem['lng'] = geoCodeData.longitude || '';
        dataItem['city'] = geoCodeData.city || '';
        dataItem['state'] = geoCodeData.state || '';
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
