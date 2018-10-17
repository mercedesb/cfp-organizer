//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const getCfpsFromData = require('../index');

describe('getCfpsFromData', () => {
  it('returns an array', () => {
    expect(getCfpsFromData()).toBeInstanceOf(Array);
  });

  it('returns objects with the correct shape', () => {
    const events = getCfpsFromData()
    const expected = {
      name: expect.any(String),
      location: expect.any(String),
      date: expect.any(String),
      url: expect.any(String),
      cfpClose: expect.any(String),
      cfpUrl: expect.any(String),
      eventTags: expect.any(String)
    }
    events.forEach(e => expect(e).toMatchObject(expected))
  })

  it('returns dates in the correct format', () => {
    const events = getCfpsFromData()
    events.forEach((e) => {
      expect(e.date).toEqual(expect.stringMatching(/\w \d{1,2}, \d{4}/))
      expect(e.cfpClose).toEqual(expect.stringMatching(/\w \d{1,2}, \d{4}/))
    })
  })
})