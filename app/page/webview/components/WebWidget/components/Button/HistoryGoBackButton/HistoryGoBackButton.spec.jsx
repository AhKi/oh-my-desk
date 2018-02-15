import React from 'react';
import { shallow } from 'enzyme';

import HistoryGoBackButton from './';

describe('<HistoryGoBackButton />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<HistoryGoBackButton />);

    expect(wrapper).toMatchSnapshot();
  });
});
