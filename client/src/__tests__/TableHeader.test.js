/* eslint-env jest */
import * as React from 'react'
import { shallow } from 'enzyme'
import { TableHeader } from '../components/TableHeader'

let subject
let header
let onSort
let onFilter
let currentSort

function loadSubject(props = {}) {
  header = {
    name: 'name',
    label: 'Label',
    sortable: false,
    filterable: false
  }
  onSort = onFilter = jest.fn()
  currentSort = { field: 'name', direction: 'asc' }
  
  subject = shallow(<TableHeader
    header={header}
    onSort={onSort}
    onFilter={onFilter}
    currentSort={currentSort}
    {...props}
  />)
}

describe('when neither sortable nor filterable', () => {
  it('renders properly', () => {
    loadSubject()
    expect(subject).toMatchSnapshot()
  })
})

describe('when sortable', () => {
  it('renders properly', () => {
    loadSubject({ header: { ...header, sortable: true } })
    expect(subject).toMatchSnapshot()
  })
})

describe('when filterable', () => {
  it('renders properly', () => {
    loadSubject({ header: { ...header, filterable: true } })
    expect(subject).toMatchSnapshot()
  })
})

describe('when both sortable and filterable', () => {
  it('renders properly', () => {
    loadSubject({ header: { ...header, sortable: true, filterable: true }})
    expect(subject).toMatchSnapshot()
  })
})