import React from 'react';
import { shallow } from 'enzyme';

import WidgetStore from '.';

describe('<WidgetStore />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetStore />);

    expect(wrapper).toMatchSnapshot();
  });
});
