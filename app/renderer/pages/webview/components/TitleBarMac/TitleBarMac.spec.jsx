import React from 'react';
import { shallow } from 'enzyme';
import os from 'os';

import TitleBarMac from './index';

jest.mock('os');
os.platform = () => 'darwin';

describe('<TitleBarMac />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<TitleBarMac />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when exist userAgent', () => {
    const wrapper = shallow(<TitleBarMac userAgent="DESKTOP" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSetMobileAgent', () => {
    const onUpdateWidgetInfo = jest.fn();
    const wrapper = shallow(
      <TitleBarMac
        id="mock-id"
        onUpdateWidgetInfo={onUpdateWidgetInfo}
      />,
    );

    wrapper.instance().handleSetMobileAgent();

    expect(onUpdateWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onUpdateWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        userAgent: 'MOBILE',
      },
    );
  });

  it('should call handleSetDesktopAgent', () => {
    const onUpdateWidgetInfo = jest.fn();
    const wrapper = shallow(
      <TitleBarMac
        id="mock-id"
        onUpdateWidgetInfo={onUpdateWidgetInfo}
      />,
    );

    wrapper.instance().handleSetDesktopAgent();

    expect(onUpdateWidgetInfo).toHaveBeenCalledTimes(1);
    expect(onUpdateWidgetInfo).toHaveBeenCalledWith(
      'mock-id',
      {
        userAgent: 'DESKTOP',
      },
    );
  });
});
