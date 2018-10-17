//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const fs = require('fs');

const parseEvents = require('../modules/parse');

let eventFixture;
function loadFixture() {
  eventFixture = fs.readFileSync('server/confstech/test/eventFixture.txt', 'utf8')
}

describe('parseEvents', () => {
  beforeEach(() => {
    loadFixture()
  })

  it('returns an array', () => {
    expect(parseEvents(eventFixture)).toBeInstanceOf(Array);
  });

  it('returns objects with the correct shape', () => {
    const events = parseEvents(eventFixture)
    const actual = events[0]
    expect(actual).toMatchObject({
      name: 'GDG DevFest',
      location: 'Vienna, Austria',
      date: 'November 24, 2018',
      url: 'https://devfest.at',
      cfpClose: 'October 26, 2018',
      cfpUrl: 'https://devfest.at/call',
      eventTags: 'android'
    })
  })
})