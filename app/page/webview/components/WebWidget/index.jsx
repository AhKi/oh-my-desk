import React from 'react';
import updateWidget from 'utils/updateWidget';
import WebWidgetHeader from './components/WebWidgetHeader';
import WebWidgetMobileHeader from './components/WebWidgetMobileHeader';
import WebWidgetSetting from './components/WebWidgetSetting';
import './WebWidget.scss';

const propTypes = {};
const defaultProps = {};

class WebWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widget: {},
      isLoading: false,
      isSettingOpen: false,
      isMobileHeaderOpen: true,
    };
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

  componentWillMount() {
    window.ipcRenderer.on('widget-info', (event, nextWidget) => {
      const { widget } = this.state;
      const currentURL = widget.url;
      const nextURL = nextWidget.url;

      if (!currentURL || currentURL !== nextURL) {
        this.webViewRef.loadURL(nextWidget.url, {
          // set mobile mode of widget userAgent
          userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36',
        });
      }
      this.webViewRef.addEventListener('dom-ready', () => {
        this.webViewRef.insertCSS('html::-webkit-scrollbar{ display:none }');
      });
      this.setState({ widget: nextWidget });
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.setKeyEvent);
    // add event when webview page loading
    this.webViewRef.addEventListener('did-start-loading', () => {
      this.setState({ isLoading: true });
    });
    this.webViewRef.addEventListener('did-finish-load', () => {
      this.setState({ isLoading: false });
    });
    this.webViewRef.addEventListener('did-stop-loading', () => {
      this.setState({ isLoading: false });
    });
    // Communicate webview tag and BrowserWindow
    // TODO fix communication logic
    this.webViewRef.addEventListener('console-message', (res) => {
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
    this.webViewRef.addEventListener('dom-ready', () => {
      this.webViewRef.executeJavaScript(`
        window.addEventListener('scroll', () => {
          console.log(window.scrollY);
        });
      `, true);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.setKeyEvent);
  }

  setKeyEvent(e) {
    if ((e.metaKey || e.altKey) && e.keyCode === 37) {
      // cmd + arrowLeft (mac)
      // alt + arrowLeft (window)
      this.webViewRef.goBack();
    } else if ((e.metaKey || e.altKey) && e.keyCode === 39) {
      // cmd + arrowRight (mac)
      // alt + arrowRight (window)
      this.webViewRef.goForward();
    } else if ((e.metaKey || e.altKey) && e.keyCode === 82) {
      // cmd + R (mac)
      // alt + R (window)
      this.webViewRef.reload();
    }
  }

  toggleIsOnTop() {
    const { widget } = this.state;
    const nextWidget = Object.assign({}, widget, { isOnTop: !widget.isOnTop });
    this.setState({
      widget: nextWidget,
    });
    updateWidget('web', nextWidget);
  }

  handleWidgetGoBack() {
    this.webViewRef.goBack();
  }

  handleWidgetGoForward() {
    this.webViewRef.goForward();
  }

  handleWidgetRefresh() {
    this.webViewRef.reload();
  }

  handleWidgetStopRefresh() {
    this.webViewRef.stop();
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
      widget,
      isLoading,
      isSettingOpen,
      isMobileHeaderOpen,
    } = this.state;

    return (
      <div className="WebWidget">
        <WebWidgetHeader
          webView={this.webViewRef}
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
          webView={this.webViewRef}
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
          />
        )}
        <webview
          ref={(ref) => { this.webViewRef = ref; }}
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
