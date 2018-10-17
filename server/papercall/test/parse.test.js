//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const fs = require('fs');

const parseEvents = require('../modules/parse');

let eventFixture;
function loadFixture() {
  eventFixture = fs.readFileSync('server/papercall/test/eventFixture.txt', 'utf8')
}

describe('parseEvents', () => {
  beforeEach(() => {
    loadFixture()
  })

  it('returns an array', () => {
    expect(parseEvents(eventFixture)).toBeInstanceOf(Array);
  });

  it('returns objects with the correct shape', () => {
    const actual = parseEvents(eventFixture)[0]
    expect(actual).toMatchObject({
      name: expect.any(String),
      location: expect.any(String),
      date: expect.any(String),
      url: expect.any(String),
      cfpClose: expect.any(String),
      cfpUrl: expect.any(String),
      eventTags: expect.any(String)
    })
  })

  it('returns objects with the correct data', () => {
    const actual = parseEvents(eventFixture)[0]
    expect(actual).toMatchObject({
      name: 'SnowCamp',
      location: 'Grenoble, France',
      date: 'January 23, 2019',
      url: 'https://snowcamp.io',
      cfpClose: 'November 4, 2018',
      cfpUrl: 'https://www.papercall.io/snowcamp-2019',
      eventTags: 'Web, Mobile, Iot, I.a. & deep/machine learning, Architecture, Performance, Security, Language & paradigms, Discover, Devops / cloud / container & scaling, English, French'
    })
  })

  it('returns dates in the correct format', () => {
    const actual = parseEvents(eventFixture)[0]
    expect(actual.date).toEqual(expect.stringMatching(/\w \d{1,2}, \d{4}/))
    expect(actual.cfpClose).toEqual(expect.stringMatching(/\w \d{1,2}, \d{4}/))
  })
})