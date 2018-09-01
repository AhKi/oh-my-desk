import React from 'react';
import { shallow } from 'enzyme';
import { remote } from 'electron';
import os from 'os';

import PreferenceHeader from '.';

jest.mock('os');
os.platform = () => 'darwin';

describe('<PreferenceHeader />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ config: { language: 'English' } }));

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<PreferenceHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
