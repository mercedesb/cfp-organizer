const dateformat = require('dateformat');


const filterOutPastEvents = require('../filterEvents');

it('returns an array', () => {
  const data = [{cfpClose: 'December 1, 2030'}]
  expect(filterOutPastEvents(data)).toBeInstanceOf(Array);
})

it('removes events in the past', () => {
  const data = [{ cfpClose: 'December 1, 2000' }]
  expect(filterOutPastEvents(data).length).toEqual(0);
})

it('keeps events for today', () => {
  const today = dateformat(new Date(), 'longDate');
  const data = [{ cfpClose: today }]
  expect(filterOutPastEvents(data).length).toEqual(1);
})

it('keeps events for in the future', () => {
  const data = [{ cfpClose: 'December 1, 2030' }]
  expect(filterOutPastEvents(data).length).toEqual(1);
})