import React from 'react';
import { shallow } from 'enzyme';

import WidgetGrowIcon from '.';

describe('<WidgetGrowIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetGrowIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
