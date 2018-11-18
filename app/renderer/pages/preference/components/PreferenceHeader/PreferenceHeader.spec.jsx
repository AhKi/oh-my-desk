import React from 'react';
import { shallow } from 'enzyme';
import os from 'os';

import PreferenceHeader from '.';

jest.mock('os');
os.platform = () => 'darwin';

describe('<PreferenceHeader />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<PreferenceHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
