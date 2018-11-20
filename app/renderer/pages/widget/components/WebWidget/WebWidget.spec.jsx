import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import NProgress from 'nprogress';
import * as USER_AGENT from 'constants/userAgent';
import widgetContextMenu from 'main/utils/menu/widgetContextMenu';
import storeMock from 'app/__mocks__/storeMock';

import WebWidget from '.';

jest.mock('nprogress');
jest.mock('main/utils/menu/widgetContextMenu');

function getComponent(props) {
  const mockStore = configureStore([])(storeMock);

  const container = mount(
    <Provider store={mockStore}>
      <WebWidget {...props} />
    </Provider>,
  );

  return container.find(WebWidget);
}

describe('test WebWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should match to snapshot when default render', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  describe('test react lifesycle', () => {
    it('should test componentDidMount', () => {
      const wrapper = getComponent();
      const componentDidMount = jest.spyOn(WebWidget.prototype, 'componentDidMount');
      const configureLoader = jest.fn();
      const configureNavigateEvent = jest.fn();
      const configureNewWindowEvent = jest.fn();
      const configureContextMenu = jest.fn();
      wrapper.instance().configureLoader = configureLoader;
      wrapper.instance().configureNavigateEvent = configureNavigateEvent;
      wrapper.instance().configureNewWindowEvent = configureNewWindowEvent;
      wrapper.instance().configureContextMenu = configureContextMenu;

      wrapper.instance().componentDidMount();

      expect(componentDidMount).toHaveBeenCalledTimes(1);
      expect(configureLoader).toHaveBeenCalledTimes(1);
      expect(configureNavigateEvent).toHaveBeenCalledTimes(1);
      expect(configureNewWindowEvent).toHaveBeenCalledTimes(1);
      expect(configureContextMenu).toHaveBeenCalledTimes(1);
    });

    describe('should test componentDidUpdate', () => {
      const componentDidUpdate = jest.spyOn(WebWidget.prototype, 'componentDidUpdate');
      const loadPage = jest.fn(() => {});
      const props = {
        widget: {
          url: 'current-url',
          userAgent: 'current-ua',
        },
      };
      const wrapper = getComponent(props);
      wrapper.instance().loadPage = loadPage;
      wrapper.instance().getUserAgent = nextProps => nextProps.widget.userAgent;

      it('when isChargeUrl === true', () => {
        const prevProps = {
          widget: {
            url: 'prev-url',
            userAgent: 'current-ua',
          },
        };
        wrapper.instance().componentDidUpdate(prevProps);

        expect(componentDidUpdate).toHaveBeenCalledTimes(1);
        expect(loadPage).toHaveBeenNthCalledWith(1, 'current-url', 'current-ua');
      });

      it('when isChangeUserAgent === true', () => {
        const prevProps = {
          widget: {
            url: 'current-url',
            userAgent: 'prev-ua',
          },
        };
        wrapper.instance().componentDidUpdate(prevProps);

        expect(componentDidUpdate).toHaveBeenCalledTimes(1);
        expect(loadPage).toHaveBeenNthCalledWith(1, 'current-url', 'current-ua');
      });

      it('when isChargeUrl === false and isChangeUserAgent === false ', () => {
        const prevProps = {
          widget: {
            url: 'current-url',
            userAgent: 'current-ua',
          },
        };
        wrapper.instance().componentDidUpdate(prevProps);

        expect(componentDidUpdate).toHaveBeenCalledTimes(1);
        expect(loadPage).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('test instance method', () => {
    const wrapper = getComponent();
    const webView = wrapper.instance().webViewRef.current;
    const addEventListener = jest.spyOn(webView, 'addEventListener');
    const setState = jest.fn();
    wrapper.instance().setState = setState;

    describe('test configureLoader', () => {
      const { configureLoader } = wrapper.instance();

      it('should match NProgress.configure', () => {
        const configure = jest.spyOn(NProgress, 'configure');

        configureLoader();

        expect(configure).toHaveBeenCalledTimes(1);
        expect(configure.mock.calls[0][0]).toMatchSnapshot();
      });

      describe('test webView add event', () => {
        it('match times handling event', () => {
          configureLoader();

          expect(addEventListener).toHaveBeenCalledTimes(2);
        });

        describe('match each handled event ', () => {
          configureLoader();

          addEventListener.mock.calls.forEach((mock) => {
            switch (mock[0]) {
              case 'did-start-loading': {
                it('when did-start-loading', () => {
                  const remove = jest.spyOn(NProgress, 'remove');
                  const start = jest.spyOn(NProgress, 'start');

                  mock[1]();

                  expect(remove).toHaveBeenCalledTimes(1);
                  expect(start).toHaveBeenCalledTimes(1);
                  expect(setState).toHaveBeenNthCalledWith(1, {
                    isLoading: true,
                  });
                });
                break;
              }
              case 'did-stop-loading': {
                it('when did-stop-loading', () => {
                  const done = jest.spyOn(NProgress, 'done');
                  wrapper.instance().setState = setState;

                  mock[1]();

                  expect(done).toHaveBeenCalledTimes(1);
                  expect(setState).toHaveBeenNthCalledWith(1, {
                    isLoading: false,
                  });
                });
                break;
              }
              default: {
                throw new Error('Need to add new test case');
              }
            }
          });
        });
      });
    });

    describe('test configureNavigateEvent', () => {
      const { configureNavigateEvent } = wrapper.instance();

      it('should match times handling event', () => {
        configureNavigateEvent();

        expect(addEventListener).toHaveBeenCalledTimes(2);
      });

      describe('match each handled event', () => {
        configureNavigateEvent();

        addEventListener.mock.calls.forEach((mock) => {
          switch (mock[0]) { // eslint-disable-line default-case
            case 'did-navigate': {
              it('when did-navigate', () => {
                mock[1]({ url: 'mock-url' });

                expect(setState).toHaveBeenNthCalledWith(1, {
                  currentUrl: 'mock-url',
                });
              });
              break;
            }
            case 'did-navigate-in-page': {
              it('when did-navigate-in-page', () => {
                mock[1]({ url: 'mock-url' });

                expect(setState).toHaveBeenNthCalledWith(1, {
                  currentUrl: 'mock-url',
                });
              });
              break;
            }
          }
        });
      });
    });

    it('test configureNewWindowEvent', () => {
      const { configureNewWindowEvent } = wrapper.instance();

      configureNewWindowEvent();

      expect(addEventListener).toHaveBeenNthCalledWith(1,
        'new-window', expect.any(Function));

      const cb = addEventListener.mock.calls[0][1];

      cb({ url: 'new-url' });

      expect(setState).toHaveBeenNthCalledWith(1, { newWindowURL: 'new-url' });
    });

    it('test configureContextMenu', () => {
      const { configureContextMenu } = wrapper.instance();
      const windowAddEventListener = jest.spyOn(window, 'addEventListener');
      widgetContextMenu.mockImplementation = jest.fn();

      configureContextMenu();

      expect(windowAddEventListener).toHaveBeenNthCalledWith(1, 'contextmenu', expect.any(Function));

      const cb = windowAddEventListener.mock.calls[0][1];
      cb();

      expect(widgetContextMenu).toHaveBeenCalledTimes(1);
    });

    it('test getUserAgent', () => {
      const { getUserAgent } = wrapper.instance();

      expect(getUserAgent({
        widget: {
          userAgent: 'MOBILE',
        },
      })).toBe(USER_AGENT.MOBILE);

      expect(getUserAgent({
        widget: {},
        defaultUserAgent: 'DESKTOP',
      })).toBe(USER_AGENT.DESKTOP);
    });

    it('test handleToggleSettingMenu', () => {
      const { handleToggleSettingMenu } = wrapper.instance();

      handleToggleSettingMenu(true);

      expect(setState).toHaveBeenNthCalledWith(1, { isSettingOpen: true });

      handleToggleSettingMenu();
      expect(setState).toHaveBeenNthCalledWith(2, expect.any(Function));
      expect(setState.mock.calls[1][0]({ isSettingOpen: false })).toEqual({ isSettingOpen: true });
      expect(setState.mock.calls[1][0]({ isSettingOpen: true })).toEqual({ isSettingOpen: false });
    });

    it('test handleCloseNewWindowMenu', () => {
      const { handleCloseNewWindowMenu } = wrapper.instance();

      handleCloseNewWindowMenu();

      expect(setState).toHaveBeenNthCalledWith(1, { newWindowURL: '' });
    });

    it('test handleCloseNewWindowMenu', () => {
      const widget = { id: 'mock-id' };
      const onCancelEditWidget = jest.fn();
      const component = getComponent({
        widget,
        onCancelEditWidget,
      });
      const { handleCancelEditWidget } = component.instance();

      handleCancelEditWidget();

      expect(onCancelEditWidget).toHaveBeenNthCalledWith(1, 'mock-id');
    });

    describe('test loadPage', () => {
      const { loadPage } = wrapper.instance();
      const loadURL = jest.fn();
      webView.loadURL = loadURL;

      it('from mobile to desktop', () => {
        loadPage('https://m.youtube.com', USER_AGENT.DESKTOP);

        expect(loadURL).toHaveBeenNthCalledWith(1, 'https://youtube.com', {
          userAgent: USER_AGENT.DESKTOP,
        });
      });

      it('from desktop to mobile', () => {
        loadPage('https://m.youtube.com', USER_AGENT.MOBILE);

        expect(loadURL).toHaveBeenNthCalledWith(1, 'https://m.youtube.com', {
          userAgent: USER_AGENT.MOBILE,
        });
      });
    });
  });
});
