import React from "react";

export const MobileEventRow = ({
  className,
  cellClassName,
  event,
  isActive,
  onClick
}) => (
  <div
    className={`${className} EventRow ${isActive ? "EventRow--active" : ""}`}
    data-testid="MobileEventRow"
  >
    <div
      className={`${cellClassName} EventRow-cell EventRow-cell--header`}
      onClick={onClick}
    >
      <span>
        <a href={event.url} target="_blank">
          {event.name}
        </a>{" "}
        - {event.date}
      </span>
      {isActive && <div className="Arrow Arrow--up" />}
      {!isActive && <div className="Arrow Arrow--down" />}
    </div>
    <div className={`${cellClassName} EventRow-cell EventRow-cell--body`}>
      {event.city}, {event.state}, {event.country} <br />
      <a href={event.cfpUrl} target="_blank">
        CFP Closes on {event.cfpClose}
      </a>
      <div className="u-small">{event.eventTags}</div>
    </div>
  </div>
);
