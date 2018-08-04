import React from 'react';
import { shallow } from 'enzyme';

import WebWidgetMobileHeader from '.';

describe('<WebWidgetMobileHeader />', () => {
  const webView = {
    canGoBack() {},
    canGoForward() {},
  };

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(
      <WebWidgetMobileHeader
        webView={webView}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should call onToggleSetting when click .WebWidgetMobileHeader__setting', () => {
    const onToggleSetting = jest.fn();
    const wrapper = shallow(
      <WebWidgetMobileHeader
        webView={webView}
        onToggleSetting={onToggleSetting}
      />,
    );
    const button = wrapper.find('.WebWidgetMobileHeader__setting');

    button.simulate('click');

    expect(onToggleSetting).toHaveBeenCalledTimes(1);
    expect(onToggleSetting).toHaveBeenCalledWith();
  });
});
