import React from 'react';
import { shallow } from 'enzyme';

import PinIcon from './';

describe('<PinIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<PinIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
