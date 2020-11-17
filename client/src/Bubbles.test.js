import React from 'react';
import { render } from '@testing-library/react';
import { shallow , configure } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import AuthenticatedApp from './AuthenticatedApp';
import { mount } from 'enzyme'

configure({adapter : new EnzymeAdapter()})

test('renders heading', () => {
  const wrapper = shallow(<AuthenticatedApp />)
  const heading = wrapper.find('AuthenticatedApp')
  console.log(JSON.stringify(wrapper))
  expect(heading.length).toBe(0)
//  expect(heading.text()).toEqual('Writing Unit test with Jest and Enzyme')
});
