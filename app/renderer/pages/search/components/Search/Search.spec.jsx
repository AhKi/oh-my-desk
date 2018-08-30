import React from 'react';
import { shallow } from 'enzyme';
import Search from './index';

describe('Test Search Component', () => {
  it('should match to snapshot', () => {
    const wrapper = shallow(<Search />);

    expect(wrapper).toMatchSnapshot();
  });
});
