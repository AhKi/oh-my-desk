import React from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import url from 'url';
import * as PATH from 'constants/path';
import * as USER_AGENT from 'constants/userAgent';
import widgetContextMenu from 'utils/process/widgetContextMenu';
import WebWidgetHeader from './components/WebWidgetHeader';
import WebWidgetMobileHeader from './components/WebWidgetMobileHeader';
import WebWidgetSetting from './components/WebWidgetSetting';
import './WebWidget.scss';

const propTypes = {
  widget: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  onOpenPreference: PropTypes.func,
  onUpdateInfo: PropTypes.func, // eslint-disable-line
};
const defaultProps = {
  widget: {},
  onOpenPreference() {},
  onUpdateInfo() {},
};

class WebWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSettingOpen: false,
      isMobileHeaderOpen: true,
    };
    this.webViewRef = React.createRef();
    this.prevScrollY = 0;
    this.tick = null;
    this.toggleIsOnTop = this.toggleIsOnTop.bind(this);
    this.handleWidgetGoBack = this.handleWidgetGoBack.bind(this);
    this.handleWidgetGoForward = this.handleWidgetGoForward.bind(this);
    this.handleWidgetRefresh = this.handleWidgetRefresh.bind(this);
    this.handleWidgetStopRefresh = this.handleWidgetStopRefresh.bind(this);
    this.handleToggleSettingMenu = this.handleToggleSettingMenu.bind(this);
  }

  componentDidMount() {
    // add event when webview page loading
    this.webViewRef.current.addEventListener('did-start-loading', () => {
      this.setState({ isLoading: true });
    });
    this.webViewRef.current.addEventListener('did-finish-load', () => {
      this.setState({ isLoading: false });
    });
    this.webViewRef.current.addEventListener('did-stop-loading', () => {
      this.setState({ isLoading: false });
    });
    this.webViewRef.current.addEventListener('new-window', (e) => {
      shell.openExternal(e.url);
    });

    this.webViewRef.current.addEventListener('dom-ready', () => {
      window.addEventListener('contextmenu', () => {
        widgetContextMenu(this.webViewRef.current);
      });
      this.webViewRef.current.openDevTools();
    });

    // Communicate webview tag and BrowserWindow
    this.webViewRef.current.addEventListener('ipc-message', (e) => {
      if (e.channel === 'scroll') {
        const scrollY = e.args[0];

        if (scrollY === 0 || this.prevScrollY === 0) {
          clearTimeout(this.tick);
          this.tick = null;
          this.setState({ isMobileHeaderOpen: true });
        } else if (Math.abs(scrollY - this.prevScrollY) > 30) {
          clearTimeout(this.tick);
          this.setState({ isMobileHeaderOpen: true });
          this.tick = setTimeout(() => this.setState({ isMobileHeaderOpen: false }), 2000);
        } else if (!this.tick) {
          this.setState({ isMobileHeaderOpen: false });
        }
        this.prevScrollY = scrollY;
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { widget } = this.props;
    const userAgent = widget.isMobile ? USER_AGENT.MOBILE : USER_AGENT.DESKTOP;

    if (prevProps.widget.url !== widget.url) {
      this.webViewRef.current.loadURL(widget.url, { userAgent });
    }

    if (prevProps.widget.isMobile !== widget.isMobile) {
      this.webViewRef.current.setUserAgent(userAgent);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.setKeyEvent);
  }

  toggleIsOnTop() {
    const { widget, onUpdateInfo } = this.props;

    onUpdateInfo(widget.id, { isOnTop: !widget.isOnTop });
  }

  handleWidgetGoBack() {
    this.webViewRef.current.goBack();
  }

  handleWidgetGoForward() {
    this.webViewRef.current.goForward();
  }

  handleWidgetRefresh() {
    this.webViewRef.current.reload();
  }

  handleWidgetStopRefresh() {
    this.webViewRef.current.stop();
  }

  handleToggleSettingMenu(bool) {
    if (typeof bool === 'boolean') {
      this.setState({ isSettingOpen: bool });
    } else {
      this.setState(nextState => ({ isSettingOpen: !nextState.isSettingOpen }));
    }
  }

  render() {
    const {
      isLoading,
      isSettingOpen,
      isMobileHeaderOpen,
    } = this.state;
    const {
      widget,
      onUpdateInfo,
      onOpenPreference,
    } = this.props;

    return (
      <div className="WebWidget">
        <WebWidgetHeader
          webView={this.webViewRef.current}
          title={widget.name}
          isLoading={isLoading}
          isOnTop={widget.isOnTop}
          onToggleIsOnTop={this.toggleIsOnTop}
          onGoBack={this.handleWidgetGoBack}
          onGoForward={this.handleWidgetGoForward}
          onRefresh={this.handleWidgetRefresh}
          onStopRefresh={this.handleWidgetStopRefresh}
          onToggleSetting={this.handleToggleSettingMenu}
        />
        <WebWidgetMobileHeader
          webView={this.webViewRef.current}
          isLoading={isLoading}
          isOpen={isMobileHeaderOpen || isSettingOpen}
          onGoBack={this.handleWidgetGoBack}
          onGoForward={this.handleWidgetGoForward}
          onRefresh={this.handleWidgetRefresh}
          onStopRefresh={this.handleWidgetStopRefresh}
          onToggleSetting={this.handleToggleSettingMenu}
        />
        {isSettingOpen && (
          <WebWidgetSetting
            name={widget.name}
            widget={widget}
            url={widget.url}
            onToggleSetting={this.handleToggleSettingMenu}
            onUpdateInfo={onUpdateInfo}
            onOpenPreference={onOpenPreference}
          />
        )}
        <webview
          ref={this.webViewRef}
          src="https://www.github.com"
          style={{
            display: 'inline-flex',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            overflowY: 'hidden',
          }}
          preload={url.format({
            pathname: PATH.PRELOAD_SCRIPT_PATH,
            protocol: 'file:',
            slashed: true,
          })}
        />
      </div>
    );
  }
}

WebWidget.propTypes = propTypes;
WebWidget.defaultProps = defaultProps;

export default WebWidget;
