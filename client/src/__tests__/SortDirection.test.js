/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { SortDirection } from '../components/SortDirection'

let subject
let name
let sort

function loadSubject(props = {}) {
  name = 'name'
  sort = { field: 'location', direction: 'asc' } 

  subject = shallow(<SortDirection
    name={name}
    sort={sort}
    {...props}
  />)
}

describe('unsorted', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('sort asc', () => {
  it('renders properly', () => {
    loadSubject({name: 'location'})
    expect(subject).toMatchSnapshot()
  })
})

describe('sort desc', () => {
  it('renders properly', () => {
    loadSubject({ name: 'location', sort: { field: 'location', direction: 'desc' } })
    expect(subject).toMatchSnapshot()
  })
})