import React from 'react';

export const EventRow = ({ name, location, date, cfpClose }) => (
  <div className="EventRow">
    <div className="EventRow-cell">{name}</div>
    <div className="EventRow-cell">{location}</div>
    <div className="EventRow-cell">{date}</div>
    <div className="EventRow-cell">{cfpClose}</div>
  </div>
);