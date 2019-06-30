# CFP Organizer [![Build Status](https://travis-ci.com/mercedesb/cfp-organizer.svg?branch=master)](https://travis-ci.com/mercedesb/cfp-organizer)

This is a super simple React app with an Express backend for sorting and filtering Papercall CFPs.

## Background

Papercall's UI doesn't allow for sorting or filtering the event name, location, date, or CFP close date of the listed events. And there isn't an API to use for getting this data. This app is meant to make those activities easier.

## Want to add a CFP?

Make a PR! I have a manually curated list of CFPs [here](./data/cfps.json) for CFPs that I find via other sources, like Twitter, that are not curated elsewhere.

`cfps/json` is a simple JSON array of events. The json format is as follows
```
 {
    "name": "Event Name",
    "location": "City, State, Country",
    "date": "MMMM DD, YYYY",
    "cfpClose": "MMMM DD, YYYY",
    "url": "https://url.com/",
    "cfpUrl": "https://url.com/",
    "eventTags": "comma, separated, list, of, tags"
  }
```

## Installation
```
git clone https://github.com/mercedesb/cfp-organizer.git
cd cfp-organizer
yarn
cd client && yarn
```

This project depends on [node-geocoder](https://github.com/nchaulet/node-geocoder) and requires  a free account with [Here](https://developer.here.com/) to use their Geocoder API. If you would prefer to use one of the other supported services such as Google, you can change that in the geocoder options in `geocode.js`.

To use Here, create an account, then create a project and generate an App Id and App Code for JavaScript/REST APIs.

Put this info in a file in the root directory called `hereConfig.json`. 

It should look like this
```
{
  "appId": "appIdHere",
  "appCode": "app_code_here"
}
```

When running locally the code looks for this json file. In production, use environment variables.

## To Run
To run in a dev environment

```
yarn dev
```

To run the client and server separately

`yarn server` and `yarn client`

## CFP Sources
- [Papercall](https://www.papercall.io/)
- [Confs.tech](https://confs.tech)
- [CFP Land](https://cfpland.com)
- [SoftwareMill's it-cfp-list](https://github.com/softwaremill/it-cfp-list)
- [Manually curated via cfps.json](./data/cfps.json)

## Credits
- [Loading spinner](https://loading.io/css/)

## Dependencies
- [React](https://github.com/facebook/react)
- [Express](https://github.com/expressjs/express)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [node-geocoder](https://github.com/nchaulet/node-geocoder)
- [Leaflet](https://github.com/Leaflet/Leaflet)
- [React-Leaflet](https://github.com/PaulLeCam/react-leaflet)

## React README
The boilerplate create-react-app README can be found [here](client/README.md).
