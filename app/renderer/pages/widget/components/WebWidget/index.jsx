import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import * as NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import url from 'url';
import * as PATH from 'constants/path';
import i18n from 'constants/i18n';
import * as USER_AGENT from 'constants/userAgent';
import widgetContextMenu from 'main/utils/menu/widgetContextMenu';
import WidgetHeaderContainer from '../../containers/WidgetHeaderContainer';
import EditTab from '../EditTab';
import MakeNotice from '../MakeNotice';
import MenuNewWindow from '../MenuNewWindow';
import ReloadTimer from '../ReloadTimer';
import './WebWidget.scss';

const propTypes = {
  widget: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  onCancelEditWidget: PropTypes.func,
  onCheckUrlValidation: PropTypes.func,
  onMakeWidget: PropTypes.func,
  onUpdateInfo: PropTypes.func,
};
const defaultProps = {
  widget: {},
  onCancelEditWidget() {},
  onCheckUrlValidation() {},
  onMakeWidget() {},
  onUpdateInfo() {},
};

const initialPage = 'https://google.com';

class WebWidget extends React.Component {
  state = {
    title: '',
    currentUrl: '',
    isLoading: false,
    isSettingOpen: false,
    isMakeMenuOpen: false,
    newWindowURL: null,
  };
  webViewRef = React.createRef();
  mousePosition = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    this.configureLoader();
    this.configureNavigateEvent();
    this.configureNewWindowEvent();
    this.configureContextMenu();
    this.configureGetMousePosition();
  }

  componentDidUpdate(prevProps) {
    const { currentUrl } = this.state;
    const { widget } = this.props;

    const prevUserAgent = this.getUserAgent(prevProps);
    const currentUserAgent = this.getUserAgent(this.props);

    const isChangeUserAgent = prevUserAgent !== currentUserAgent;
    const isPropsChangeUrl = prevProps.widget.url !== widget.url;

    if (isChangeUserAgent) {
      this.loadPage(currentUrl, currentUserAgent);
    }

    if (isPropsChangeUrl) {
      this.loadPage(widget.url, currentUserAgent);
    }
  }

  /**
   * Configure loading if webview is loading content.
   */
  configureLoader = () => {
    const webView = this.webViewRef.current;

    NProgress.configure({
      easing: 'ease',
      speed: 800,
      minimum: 0.2,
      parent: '.AddressBar__address',
      showSpinner: false,
    });

    webView.addEventListener('did-start-loading', () => {
      NProgress.remove();
      NProgress.start();
      this.setState({ isLoading: true });
    });

    webView.addEventListener('did-stop-loading', () => {
      NProgress.done();
      this.setState({ isLoading: false });
    });

    webView.addEventListener('page-title-updated', ({ title }) => {
      this.setState({ title });
    });
  };

  configureNavigateEvent = () => {
    const webView = this.webViewRef.current;
    const changeUrl = e => this.setState({ currentUrl: e.url });
    const changeUrlInPage = (e) => {
      if (e.isMainFrame) {
        changeUrl(e);
      }
    };

    webView.addEventListener('did-navigate', changeUrl); // for Multi Page Application
    webView.addEventListener('did-navigate-in-page', changeUrlInPage); // for Single Page Application
  };

  configureNewWindowEvent = () => {
    const webView = this.webViewRef.current;
    const changeNewUrl = e => this.setState({ newWindowURL: e.url });

    webView.addEventListener('new-window', changeNewUrl);
  };

  configureContextMenu = () => {
    const webView = this.webViewRef.current;

    window.addEventListener('contextmenu', () => {
      widgetContextMenu(webView);
    });
  };

  /**
   * Need to popup new-window context menu
   */
  configureGetMousePosition = () => {
    window.addEventListener('mousedown', (e) => {
      this.mousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
    });
  };

  getUserAgent = (props) => {
    const { defaultUserAgent, widget } = props;
    const { userAgent } = widget;

    if (userAgent) {
      return USER_AGENT[userAgent];
    }

    return USER_AGENT[defaultUserAgent];
  };

  handleToggleSettingMenu = (bool) => {
    if (typeof bool === 'boolean') {
      this.setState({ isSettingOpen: bool });
    } else {
      this.setState(prevState => ({ isSettingOpen: !prevState.isSettingOpen }));
    }
  };

  handleCloseNewWindowMenu = () => {
    this.setState({ newWindowURL: '' });
  };

  handleCancelEditWidget = () => {
    const { widget, onCancelEditWidget } = this.props;

    this.setState({ isMakeMenuOpen: false });

    if (widget.isEditProgress) {
      onCancelEditWidget(widget.id);
    }
  };

  handleCloseMakeNotice = () => {
    this.setState({ isMakeMenuOpen: true });
  };

  loadPage = (loadUrl, userAgent) => {
    /**
     * When change from mobile to desktop,
     * Some page preserve prefix 'm' of url like https://m.example.com.
     * So, Delete prefix 'm' of url.
     */
    const urlByUserAgent = userAgent === USER_AGENT.DESKTOP ?
      loadUrl.replace('https://m.', 'https://') : loadUrl;

    this.webViewRef.current.loadURL(
      urlByUserAgent,
      { userAgent },
    );
  };

  render() {
    const text = i18n().widget;
    const {
      currentUrl,
      title,
      isLoading,
      isMakeMenuOpen,
      newWindowURL,
    } = this.state;
    const {
      widget,
      onCheckUrlValidation,
      onMakeWidget,
      onUpdateInfo,
    } = this.props;
    const isInfoEdit = widget.isEditProgress || (widget.isMakeProgress && isMakeMenuOpen);

    return (
      <div className="WebWidget">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <WidgetHeaderContainer
          currentUrl={currentUrl}
          webView={this.webViewRef.current}
          isLoading={isLoading}
          onToggleSetting={this.handleToggleSettingMenu}
        />
        {widget.isMakeProgress && !isMakeMenuOpen && (
          <MakeNotice
            onCheckUrlValidation={onCheckUrlValidation}
            onCloseNotice={this.handleCloseMakeNotice}
          />
        )}
        {widget.reloadInterval ? (
          <ReloadTimer
            id={widget.id}
            webView={this.webViewRef.current}
            reloadTimer={widget.reloadInterval}
            onUpdateInfo={onUpdateInfo}
          />
        ) : null}
        {newWindowURL && (
          <MenuNewWindow
            url={newWindowURL}
            widget={this.webViewRef.current}
            x={this.mousePosition.x}
            y={this.mousePosition.y}
            onClose={this.handleCloseNewWindowMenu}
            onMakeWidget={onMakeWidget}
          />
        )}
        <div className="WebWidget__content">
          <webview
            className="WebWidget__webview"
            ref={this.webViewRef}
            src={initialPage}
            preload={url.format({
              pathname: PATH.PRELOAD_SCRIPT_PATH,
              protocol: 'file:',
              slashed: true,
            })}
          />
          {isInfoEdit && (
            <EditTab
              currentUrl={currentUrl}
              id={widget.id}
              name={widget.name}
              title={widget.isEditProgress ? text.editWidget : text.addWidget}
              onCloseTab={this.handleCancelEditWidget}
              onCheckUrlValidation={onCheckUrlValidation}
            />
          )}
        </div>
      </div>
    );
  }
}

WebWidget.propTypes = propTypes;
WebWidget.defaultProps = defaultProps;

export default WebWidget;
