import React from 'react';
import { shallow } from 'enzyme';

import GNBWrapper from './';

describe('<GNBWrapper />', () => {
  it('should match to snapshot when render default', () => {
    const Component = () => <div>mock</div>;
    const GNBInner = GNBWrapper(Component);
    const wrapper = shallow(<GNBInner />);

    expect(wrapper).toMatchSnapshot();
  });
});
