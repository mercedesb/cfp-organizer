/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { EventRow } from '../components/EventRow'

let subject
let event
let isActive
let onClick

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

  onClick = jest.fn()
  isActive = false

  subject = shallow(<EventRow
    className='EventRow'
    cellClassName='EventRow-cell'
    event={event}
    isActive={isActive}
    onClick={onClick}
    {...props}
  />)
}

describe('when not active', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('when active', () => {
  it('renders properly', () => {
    loadSubject({isActive: true})
    expect(subject).toMatchSnapshot()
  })
})