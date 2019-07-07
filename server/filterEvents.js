function filterOutPastEvents(data) {
  const today = new Date().setUTCHours(0, 0, 0, 0);

  const events = [];
  data.forEach(dataItem => {
    const cfpCloseDate = new Date(dataItem.cfpClose);
    const eventDate = new Date(dataItem.date);
    if (cfpCloseDate >= today && eventDate >= today) {
      events.push(dataItem);
    }
  });

  return events;
}

function filterOutDuplicates(data) {
  return data.reduce((unique, item) => {
    return unique.find(
      el =>
        el.name === item.name &&
        el.location === item.location &&
        el.date === item.date
    )
      ? unique
      : [...unique, item];
  }, []);
}

module.exports = {
  filterOutPastEvents: filterOutPastEvents,
  filterOutDuplicates: filterOutDuplicates
};
