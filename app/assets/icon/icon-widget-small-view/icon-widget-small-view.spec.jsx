import React from 'react';
import { shallow } from 'enzyme';

import WidgetSmallIcon from '.';

describe('<WidgetSmallIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetSmallIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
