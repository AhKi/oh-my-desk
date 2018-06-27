import React from 'react';
import { shallow } from 'enzyme';

import ArrowIcon from '.';

describe('<ArrowIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ArrowIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
