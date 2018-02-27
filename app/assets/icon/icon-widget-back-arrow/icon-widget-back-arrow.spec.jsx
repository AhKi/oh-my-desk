import React from 'react';
import { shallow } from 'enzyme';

import BackIcon from './';

describe('<BackIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<BackIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
