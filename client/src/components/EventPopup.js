import React from 'react';

export const EventPopup = ({ event }) => (
  <React.Fragment>
    <a href={event.url}>{event.name}</a> - { event.date } <br/>
    { event.city }, { event.country } <br/>
    <a href={event.cfpUrl}>CFP Closes on {event.cfpClose}</a>
  </React.Fragment>
);