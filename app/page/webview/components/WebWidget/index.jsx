import React from 'react';
import updateWidget from 'utils/updateWidget';
import WebWidgetHeader from './components/WebWidgetHeader';
import './WebWidget.scss';

const propTypes = {};
const defaultProps = {};

class WebWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widget: {},
      isLoading: false,
    };
    this.setKeyEvent = this.setKeyEvent.bind(this);
    this.toggleIsOnTop = this.toggleIsOnTop.bind(this);
  }

  componentWillMount() {
    window.ipcRenderer.on('widget-info', (event, widget) => {
      if (!this.webViewRef.getURL()) {
        this.webViewRef.loadURL(widget.url, {
          // set mobile mode of widget userAgent
          userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36',
        });
      }
      this.webViewRef.addEventListener('dom-ready', () => {
        this.webViewRef.insertCSS('html::-webkit-scrollbar{ display:none }');
      });
      this.setState({ widget });
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

  render() {
    const { widget, isLoading } = this.state;
    return (
      <div className="WebWidget">
        <WebWidgetHeader
          webView={this.webViewRef}
          title={widget.name}
          isLoading={isLoading}
          onToggleIsOnTop={this.toggleIsOnTop}
        />
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
