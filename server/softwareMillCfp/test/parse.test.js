//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const fs = require('fs');

const parseEvents = require('../modules/parse');

let eventFixture;
function loadFixture() {
  eventFixture = fs.readFileSync('server/softwareMillCfp/test/eventFixture.txt', 'utf8')
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
      name: 'Scala Matsuri',
      location: 'Tokyo, Japan',
      date: 'June 27, 2019',
      url: 'https://2019.scalamatsuri.org',
      cfpClose: 'February 2, 2019',
      cfpUrl: 'https://2019.scalamatsuri.org/en/cfp/',
      eventTags: 'Scala, ...'
    })
  })
})