import React from 'react';
import { shallow } from 'enzyme';

import ReloadButton from './';

describe('<ReloadButton />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<ReloadButton />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when props.isLoading === true', () => {
    const wrapper = shallow(<ReloadButton isLoading />);

    expect(wrapper).toMatchSnapshot();
  });
});
