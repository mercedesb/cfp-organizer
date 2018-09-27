# CFP Organizer

This is a super simple React app with an Express backend for sorting and filtering Papercall CFPs.

## Background

Papercall's UI doesn't allow for sorting or filtering the event name, location, date, or CFP close date of the listed events. And there isn't an API to use for getting this data. This app is meant to make those activities easier.

## Installation
```
git clone https://github.com/mercedesb/cfp-organizer.git
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

## Credits
- [Loading spinner](https://loading.io/css/)
- [Map](https://github.com/PaulLeCam/react-leaflet)

## React README
The boilerplate create-react-app README can be found [here](client/README.md).
