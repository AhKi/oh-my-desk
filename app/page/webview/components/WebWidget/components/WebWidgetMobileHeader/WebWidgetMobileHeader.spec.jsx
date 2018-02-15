import React from 'react';
import { shallow } from 'enzyme';

import WebWidgetMobileHeader from './';

describe('<WebWidgetMobileHeader />', () => {
  it('should match to snapshot when render default', () => {
    const webView = {
      canGoBack() {},
      canGoForward() {},
    };
    const wrapper = shallow(
      <WebWidgetMobileHeader
        webView={webView}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
