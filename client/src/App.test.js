import React from 'react';
import { shallow } from 'enzyme'
import App from './App';

let subject

function loadSubject(props = {}) {
  subject = shallow(<App />);
  subject.instance().callApi = jest.fn({ events: [] });
  subject.update();
}

it('renders', () => {
  let subject = shallow(<App />);
  subject.instance().callApi = jest.fn({events: []});
  subject.update();
  expect(subject).toMatchSnapshot()
})

describe('setActiveView', () => {
  it('sets the state', () => {
    loadSubject()
    subject.instance().setActiveView('map')
    expect(subject.state('activeView')).toEqual('map')
  })
})

describe('setActiveDataItem', () => {
  describe('when the dataItemKey does not match state', () => {
    it('sets the state', () => {
      loadSubject()
      subject.instance().setActiveDataItem(0)
      expect(subject.state('activeDataItem')).toEqual(0)
    })
  })

  describe('when the dataItemKey matches state', () => {
    it('sets the state to null', () => {
      loadSubject()
      subject.instance().setState({ activeDataItem: 0 })
      subject.update()
      subject.instance().setActiveDataItem(0)
      expect(subject.state('activeDataItem')).toBeNull()
    })
  })
})