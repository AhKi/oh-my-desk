import React from 'react';
import { shallow } from 'enzyme';

import WidgetRefreshIcon from './';

describe('<WidgetRefreshIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetRefreshIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
