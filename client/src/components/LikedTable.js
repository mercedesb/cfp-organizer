import React from "react";
import { Table } from "./Table.js";

export const LikedTable = props => {
  const likedEventsFromStorage = localStorage.getItem(
    "cfpOrganizer-likedEvents"
  );
  let likedEvents = {};
  if (likedEventsFromStorage) {
    likedEvents = {
      ...JSON.parse(localStorage.getItem("cfpOrganizer-likedEvents"))
    };
  }

  const data = props.data.filter(event => likedEvents[event.name]);

  return <Table {...props} data={data} />;
};
