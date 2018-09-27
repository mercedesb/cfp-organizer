import React from 'react';

export const EventRow = ({ className, rowClassName, event }) => (
  <div className={`${className} EventRow`}>
    <div className={rowClassName}><a href={event.url} target="_blank">{event.name}</a></div>
    <div className={`${rowClassName} Table-cell--location`}>
      {event.location} 
      <span className='u-small'>{event.city}, {event.country}, {event.countryCode}, {event.continent}</span>
    </div>
    <div className={rowClassName}>{event.date}</div>
    <div className={rowClassName}><a href={event.cfpUrl} target="_blank">{event.cfpClose}</a></div>
    <div className={`${rowClassName} u-small`}>{event.eventTags}</div>
  </div>
);