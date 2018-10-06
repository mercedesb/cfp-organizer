function filterOutPastEvents(data) {
  const today = new Date().setUTCHours(0, 0, 0, 0);
  
  const events = [];
  data.forEach((dataItem) => {
    const cfpCloseDate = new Date(dataItem.cfpClose);
    if (cfpCloseDate >= today) {
      events.push(dataItem);
    }
  });

  return events;
}

module.exports = filterOutPastEvents;
