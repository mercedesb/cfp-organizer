import React from 'react';

export const EventRow = ({ className, cellClassName, event }) => (
  <div className={`${className} EventRow`}>
    <div className={cellClassName}><a href={event.url} target="_blank">{event.name}</a></div>
    <div className={`${cellClassName} Table-cell--location`}>
      {event.location} 
      <span className='u-small'>{event.city}, {event.country}, {event.countryCode}, {event.continent}</span>
    </div>
    <div className={cellClassName}>{event.date}</div>
    <div className={cellClassName}><a href={event.cfpUrl} target="_blank">{event.cfpClose}</a></div>
    <div className={`${cellClassName} u-small`}>{event.eventTags}</div>
  </div>
);