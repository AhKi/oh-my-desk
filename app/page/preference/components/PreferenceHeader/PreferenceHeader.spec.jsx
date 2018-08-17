import React from 'react';
import { shallow } from 'enzyme';
import { remote } from 'electron';

import PreferenceHeader from '.';

describe('<PreferenceHeader />', () => {
  remote.getGlobal = jest.fn(() => () => JSON.stringify({ status: { lang: 'English' } }));
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<PreferenceHeader />);

    expect(wrapper).toMatchSnapshot();
  });
});
