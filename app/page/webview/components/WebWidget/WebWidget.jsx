import React from 'react';
import PropTypes from 'prop-types';
import * as USER_AGENT from 'constants/userAgent';
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
    this.setKeyEvent = this.setKeyEvent.bind(this);
    this.toggleIsOnTop = this.toggleIsOnTop.bind(this);
    this.handleWidgetGoBack = this.handleWidgetGoBack.bind(this);
    this.handleWidgetGoForward = this.handleWidgetGoForward.bind(this);
    this.handleWidgetRefresh = this.handleWidgetRefresh.bind(this);
    this.handleWidgetStopRefresh = this.handleWidgetStopRefresh.bind(this);
    this.handleToggleSettingMenu = this.handleToggleSettingMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.setKeyEvent);
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
    // Communicate webview tag and BrowserWindow
    // TODO fix communication logic
    this.webViewRef.current.addEventListener('console-message', (res) => {
      const scrollY = Number(res.message);
      if (typeof scrollY !== 'number') {
        return;
      }

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
    });
    this.webViewRef.current.addEventListener('dom-ready', () => {
      this.webViewRef.current.executeJavaScript(`
        window.addEventListener('scroll', () => {
          console.log(window.scrollY);
        });
      `, true);
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

  setKeyEvent(e) {
    if ((e.metaKey || e.altKey) && e.keyCode === 37) {
      // cmd + arrowLeft (mac)
      // alt + arrowLeft (window)
      this.webViewRef.current.goBack();
    } else if ((e.metaKey || e.altKey) && e.keyCode === 39) {
      // cmd + arrowRight (mac)
      // alt + arrowRight (window)
      this.webViewRef.current.goForward();
    } else if ((e.metaKey || e.altKey) && e.keyCode === 82) {
      // cmd + R (mac)
      // alt + R (window)
      this.webViewRef.current.reload();
    }
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
        />
      </div>
    );
  }
}

WebWidget.propTypes = propTypes;
WebWidget.defaultProps = defaultProps;

export default WebWidget;
