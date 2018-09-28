/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { EventPopup } from '../components/EventPopup'

let subject
let event

function loadSubject(props = {}) {
  event = {
    name: 'name',
    url: 'http://url.com',
    date: 'September 30, 2018',
    cfpClose: 'September 30, 2018 23:00 UTC',
    cfpUrl: 'http://url.com',
    location: 'Chicago, IL',
    eventTags: 'Javascript, Ruby, Tech',
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    contintent: 'North America',
    lat: 41,
    lng: -55,
  }

  subject = shallow(<EventPopup
    event={event}
    {...props}
  />)
}

describe('render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})