import React from 'react';
import { shallow } from 'enzyme';

import TitleBar from '.';

describe('<TitleBar />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when render default', () => {
    const wrapper = shallow(<TitleBar />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot when exist userAgent', () => {
    const wrapper = shallow(<TitleBar userAgent="DESKTOP" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSetMobileAgent', () => {
    const onUpdateWidgetInfo = jest.fn();
    const wrapper = shallow(
      <TitleBar
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

  it('should call handleSetMobileAgent', () => {
    const onCloseWidget = jest.fn();
    const wrapper = shallow(
      <TitleBar
        id="mock-id"
        onCloseWidget={onCloseWidget}
      />,
    );

    wrapper.instance().handleCloseWidget();

    expect(onCloseWidget).toHaveBeenCalledTimes(1);
    expect(onCloseWidget).toHaveBeenCalledWith('mock-id');
  });

  it('should call handleSetDesktopAgent', () => {
    const onUpdateWidgetInfo = jest.fn();
    const wrapper = shallow(
      <TitleBar
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
