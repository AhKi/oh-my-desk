import React from 'react';
import { shallow } from 'enzyme';

import WidgetShrinkIcon from '.';

describe('<WidgetShrinkIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetShrinkIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
