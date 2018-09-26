import React from 'react';

export const EventRow = ({ name, url, location, city, country, countryCode, date, cfpClose, cfpUrl, eventTags }) => (
  <div className="EventRow">
    <div className="EventRow-cell"><a href={url}>{name}</a></div>
    <div className="EventRow-cell EventRow-cell--location">{location} <span className='u-small'>{city}, {country}, {countryCode}</span></div>
    <div className="EventRow-cell">{date}</div>
    <div className="EventRow-cell"><a href={cfpUrl}>{cfpClose}</a></div>
    <div className="EventRow-cell">{eventTags}</div>
  </div>
);