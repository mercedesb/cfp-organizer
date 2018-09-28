import React from 'react';
import { shallow } from 'enzyme'
import App from './App';


it('renders', () => {
  let subject = shallow(<App />);
  subject.instance().callApi = jest.fn({events: []});
  subject.update();
  expect(subject).toMatchSnapshot()
})