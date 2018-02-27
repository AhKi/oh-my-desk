import React from 'react';
import { shallow } from 'enzyme';

import GoIcon from './';

describe('<GoIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<GoIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
