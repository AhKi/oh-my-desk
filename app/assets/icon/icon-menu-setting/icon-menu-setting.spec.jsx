import React from 'react';
import { shallow } from 'enzyme';

import SettingIcon from './';

describe('<SettingIcon />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<SettingIcon />);

    expect(wrapper).toMatchSnapshot();
  });
});
