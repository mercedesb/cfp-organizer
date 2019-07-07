import React, { useState, useEffect } from "react";
import "./EventRow.css";

export const EventRow = ({ className, cellClassName, event }) => {
  const [liked, setLiked] = useState(getFromLocalStorage());

  function getFromLocalStorage() {
    const likedEvents =
      JSON.parse(localStorage.getItem("cfpOrganizer-likedEvents")) || {};
    return likedEvents[event.name] || false;
  }

  useEffect(() => {
    debugger;
    const likedEvents = {
      ...JSON.parse(localStorage.getItem("cfpOrganizer-likedEvents"))
    };
    likedEvents[event.name] = liked;
    localStorage.setItem(
      "cfpOrganizer-likedEvents",
      JSON.stringify(likedEvents)
    );
  }, [liked]);

  return (
    <div className={`${className} EventRow`}>
      <div className={`${cellClassName} EventRow-name`}>
        <button className="SvgButton" onClick={() => setLiked(!liked)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            tabIndex="0"
          >
            <path
              fill={liked ? "#0074d9" : "none"}
              stroke="#0074d9"
              stroke-width="2"
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            />
          </svg>
          <span class="u-srOnly">Click to like and save this event</span>
        </button>
        {event.url && (
          <a href={event.url} target="_blank">
            {event.name}
          </a>
        )}
        {!event.url && <span>{event.name}</span>}
      </div>
      <div className={`${cellClassName} EventRow-location`}>
        {event.location}
        <span className="u-small">
          {event.city}, {event.state}, {event.country}, {event.continent}
        </span>
      </div>
      <div className={cellClassName}>{event.date}</div>
      <div className={cellClassName}>
        {event.cfpUrl && (
          <a href={event.cfpUrl} target="_blank">
            {event.cfpClose}
          </a>
        )}
        {!event.cfpUrl && <span>{event.cfpClose}</span>}
      </div>
      <div className={`${cellClassName} u-small`}>{event.eventTags}</div>
    </div>
  );
};
