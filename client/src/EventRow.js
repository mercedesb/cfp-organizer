import React from 'react';

export const EventRow = ({ name, url, location, date, cfpClose, cfpUrl }) => (
  <div className="EventRow">
    <div className="EventRow-cell"><a href={url}>{name}</a></div>
    <div className="EventRow-cell">{location}</div>
    <div className="EventRow-cell">{date}</div>
    <div className="EventRow-cell"><a href={cfpUrl}>{cfpClose}</a></div>
  </div>
);