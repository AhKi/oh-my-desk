import React from 'react';
import { shallow } from 'enzyme';

import WidgetSettingIcon from '.';

describe('<WidgetSettingIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<WidgetSettingIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
