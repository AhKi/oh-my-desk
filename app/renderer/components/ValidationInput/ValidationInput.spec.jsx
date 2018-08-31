import React from 'react';
import { shallow } from 'enzyme';

import ValidationInput from '.';

describe('<ValidationInput />', () => {
  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <ValidationInput
        error="mock-error"
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
