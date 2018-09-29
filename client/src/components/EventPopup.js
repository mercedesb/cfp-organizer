import React from 'react';

export const EventPopup = ({ event }) => (
  <React.Fragment>
    <a href={event.url} target="_blank">{event.name}</a> - {event.date} <br/>
    {event.city}, {event.state}, {event.country} <br/>
    <a href={event.cfpUrl} target="_blank">CFP Closes on {event.cfpClose}</a>
  </React.Fragment>
);