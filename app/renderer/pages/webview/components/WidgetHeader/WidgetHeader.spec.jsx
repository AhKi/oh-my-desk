import React from 'react';
import { shallow } from 'enzyme';

import WidgetHeader from './index';

describe('<WidgetHeader />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
