/* eslint-env jest */
import * as React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import { Table } from '../components/Table'

let subject
let data

function loadSubject(props = {}) {
  data = [
  {
    name: 'name',
    url: 'http://url.com',
    date: 'September 30, 2018',
    momentDate: moment('September 30, 2018', 'MMMM DD, YYYY'),
    cfpClose: 'September 30, 2018',
    cfpUrl: 'http://url.com',
    location: 'Chicago, IL',
    eventTags: 'Javascript, Ruby, Tech',
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    lat: 41,
    lng: -55,
  },
  {
    name: 'a name',
    url: 'http://url.com',
    date: 'October 30, 2018',
    momentDate: moment('October 30, 2018', 'MMMM DD, YYYY'),
    cfpClose: 'October 30, 2018',
    cfpUrl: 'http://url.com',
    location: 'Philadelphia, PA',
    eventTags: 'Python, React',
    city: 'Philadelphia',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    lat: 41,
    lng: -40,
  }]

  subject = shallow(<Table
    data={data}
    headers={[]}
    rowComponent={jest.fn()}
    {...props}
  />)
}

describe('render', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('compareBy', () => {
  loadSubject()
  expect(subject.instance().compareBy('name', true)).toBeInstanceOf(Function)
})

describe('sortBy', () => {
  describe('when name asc', () => {
    it('sorts \'a name\' before \'name\'', () => {
      loadSubject()
      subject.instance().sortBy('name')
      expect(subject.state('filteredData')[0]).toEqual(data[1])
      expect(subject.state('filteredData')[1]).toEqual(data[0])
      expect(subject.state('sort')).toMatchObject({
        field: 'name',
        direction: 'asc'
      })
    })
  })

  describe('when name desc', () => {
    it('sorts \'name\' before \'a name\'', () => {
      loadSubject()
      subject.instance().setState({ sort: { field: 'name', direction: 'asc'} })
      subject.update()
      subject.instance().sortBy('name')
      expect(subject.state('filteredData')[0]).toEqual(data[0])
      expect(subject.state('filteredData')[1]).toEqual(data[1])
      expect(subject.state('sort')).toMatchObject({
        field: 'name',
        direction: 'desc'
      })
    })
  })

  describe('when momentDate asc', () => {
    it('sorts Sept 30 before Oct 30', () => {
      loadSubject()
      subject.instance().sortBy('momentDate')
      expect(subject.state('filteredData')[0]).toEqual(data[0])
      expect(subject.state('filteredData')[1]).toEqual(data[1])
      expect(subject.state('sort')).toMatchObject({
        field: 'momentDate',
        direction: 'asc'
      })
    })
  })
})

describe('filterBy', () => {
  describe('filter by location', () => {
    it('returns events in Europe', () => {
      loadSubject()
      subject.instance().filterBy({ target: { value: 'Europe' } }, ['location', 'country', 'continent', 'city', 'countryCode'])
      expect(subject.state('filteredData').length).toEqual(0)
      expect(subject.state('filter').length).toEqual(1)
      expect(subject.state('filter')[0].fields).toEqual(expect.arrayContaining(['location', 'country', 'continent', 'city', 'countryCode']))
    })
  })

  describe('filter by location and tags', () => {
    it('returns events in United States and tagged with Javscript', () => {
      loadSubject()
      subject.instance().filterBy({ target: { value: 'united states' } }, ['location', 'country', 'continent', 'city', 'countryCode'])
      subject.instance().filterBy({ target: { value: 'javascript' } }, ['eventTags'])
      expect(subject.state('filteredData').length).toEqual(1)
      expect(subject.state('filteredData')[0]).toEqual(data[0])
      expect(subject.state('filter').length).toEqual(2)
      expect(subject.state('filter')[1].fields).toEqual(expect.arrayContaining(['eventTags']))

    })
  })
})