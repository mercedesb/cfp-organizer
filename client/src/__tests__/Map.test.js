/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { Map } from '../components/Map'

let subject
let data

function loadSubject(props = {}) {
  data = [{
    name: 'name',
    url: 'http://url.com',
    date: 'September 30, 2018',
    cfpClose: 'September 30, 2018',
    cfpUrl: 'http://url.com',
    location: 'Chicago, IL',
    eventTags: 'Javascript, Ruby, Tech',
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    contintent: 'North America',
    lat: 41,
    lng: -55,
  }]

  subject = shallow(<Map
    data={data}
    popupComponent={jest.fn()}
    {...props}
  />)
}

describe('render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})