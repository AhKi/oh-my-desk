import React from 'react';
import { shallow } from 'enzyme';

import WidgetBackIcon from './';

describe('<WidgetBackIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetBackIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
