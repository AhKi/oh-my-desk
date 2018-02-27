import React from 'react';
import { shallow } from 'enzyme';

import WidgetIcon from './';

describe('<WidgetIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
