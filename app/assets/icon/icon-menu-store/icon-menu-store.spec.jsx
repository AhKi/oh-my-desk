import React from 'react';
import { shallow } from 'enzyme';

import StoreIcon from './';

describe('<StoreIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<StoreIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
