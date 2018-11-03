import React from 'react';
import PropTypes from 'prop-types';
import os from 'os';
import cx from 'classnames';
import cancelIcon from 'assets/icon/icon-widget-close.svg';
import leftArrowIcon from 'assets/icon/icon-widget-back-arrow.svg';
import rightArrowIcon from 'assets/icon/icon-widget-go-arrow.svg';
import homeIcon from 'assets/icon/icon-home.svg';
import moreIcon from 'assets/icon/icon-more.svg';
import refreshIcon from 'assets/icon/icon-widget-refresh.svg';
import iconPin from 'assets/icon/icon-pin.svg';
import ConfigMenu from '../ConfigMenu';
import './AddressBar.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  id: PropTypes.string,
  isMakeProgress: PropTypes.bool,
  isOnTop: PropTypes.bool,
  isLoading: PropTypes.bool,
  reloadInterval: PropTypes.number,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onEditWidget: PropTypes.func,
  onMakeWidget: PropTypes.func,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};
const defaultProps = {
  currentUrl: '',
  homeUrl: '',
  id: '',
  isMakeProgress: false,
  isOnTop: false,
  isLoading: false,
  reloadInterval: 0,
  webView: null,
  onEditWidget() {},
  onMakeWidget() {},
  onModalOpen() {},
  onUpdateWidgetInfo() {},
};

class AddressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressValue: '',
      isMenuOpen: false,
    };
    this.moreBtnRef = React.createRef();
    this.addressInputRef = React.createRef();
    this.handleAttachReloadHotKey = this.handleAttachReloadHotKey.bind(this);
    this.handleAttachAddressFocusHotKey = this.handleAttachAddressFocusHotKey.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddressEnter = this.handleAddressEnter.bind(this);
    this.handleNavigateReload = this.handleNavigateReload.bind(this);
    this.handleNavigateToHome = this.handleNavigateToHome.bind(this);
    this.handleToggleIsOnTop = this.handleToggleIsOnTop.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }

  componentDidMount() {
    const { webView } = this.props;
    document.addEventListener('keydown', this.handleAttachAddressFocusHotKey);

    if (webView) {
      document.addEventListener('keydown', this.handleAttachReloadHotKey);
    }
  }

  componentDidUpdate(prevProps) {
    const { currentUrl, webView } = this.props; // eslint-disable-line

    /**
     * Need to occur once. but webView is parent DOM element
     * so don't catch in "componentDidMount"
     * Occur addEventListener once when webView is rendered from null to element
     */
    if (!prevProps.webView && webView) {
      document.addEventListener('keydown', this.handleAttachReloadHotKey);
    }

    if (currentUrl !== prevProps.currentUrl) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        addressValue: currentUrl,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleAttachAddressFocusHotKey);
    document.removeEventListener('keydown', this.handleAttachReloadHotKey);
  }

  handleAttachAddressFocusHotKey(e) {
    const additionKey = os.platform() === 'darwin' ? 'metaKey' : 'ctrlKey';

    if (e[additionKey] && (e.key === 'l' || e.key === 'ㅣ')) {
      this.addressInputRef.current.select();
    }
    if (document.activeElement === this.addressInputRef.current &&
      e.key === 'Escape') {
      this.addressInputRef.current.blur();
    }
  }

  handleAttachReloadHotKey(e) {
    const { currentUrl, webView } = this.props;
    let command;
    if (os.platform() === 'darwin') {
      command = e.metaKey;
    } else {
      command = e.altKey;
    }

    if (command && (e.key === 'r' || e.key === 'ㄱ')) {
      webView.reload();
      this.setState({
        addressValue: currentUrl,
      });
    }
  }

  handleAddressChange(e) {
    this.setState({ addressValue: e.target.value });
  }

  handleAddressEnter(e) {
    const { webView } = this.props;
    const { addressValue } = this.state;

    if (e.key === 'Enter') {
      const isUrlFormat = addressValue.indexOf('http://') === 0 || addressValue.indexOf('https://') === 0;
      if (!isUrlFormat) {
        this.setState(prevState => ({
          addressValue: `https://${prevState.addressValue}`,
        }), () => {
          const { addressValue: nextAddressValue } = this.state;
          webView.loadURL(nextAddressValue);
        });
      } else {
        webView.loadURL(addressValue);
      }
    }
  }

  handleNavigateToHome() {
    const { homeUrl, webView } = this.props;

    webView.loadURL(homeUrl);
    this.setState({ addressValue: homeUrl });
  }

  handleNavigateReload() {
    const { currentUrl, webView } = this.props;

    webView.reload();
    this.setState({ addressValue: currentUrl });
  }

  handleToggleIsOnTop() {
    const { id, isOnTop, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(id, {
      isOnTop: !isOnTop,
    });
  }

  handleToggleMenu(value) {
    const { isMakeProgress } = this.props;

    if (isMakeProgress) {
      return;
    }

    if (typeof value === 'boolean') {
      this.setState({ isMenuOpen: value });
    } else {
      this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
    }
  }

  render() {
    const { addressValue, isMenuOpen } = this.state;
    const {
      id,
      currentUrl,
      homeUrl,
      isOnTop,
      isLoading,
      reloadInterval,
      webView,
      onEditWidget,
      onMakeWidget,
      onModalOpen,
      onUpdateWidgetInfo,
    } = this.props;
    const moreClassName = cx('AddressBar__button', 'AddressBar__more-btn', {
      'AddressBar__more-btn--active': isMenuOpen,
    });
    const pinClassName = cx('AddressBar__pin-btn', {
      'AddressBar__pin-btn--active': isOnTop,
    });
    const pinIconClassName = cx('AddressBar__pin', {
      'AddressBar__pin--active': isOnTop,
    });
    const isGoBack = webView && webView.canGoBack();
    const isGoForward = webView && webView.canGoForward();

    return (
      <div className="AddressBar">
        <button
          className="AddressBar__button"
          data-name="go-back-btn"
          type="button"
          disabled={!isGoBack}
          onClick={() => webView.goBack()}
        >
          <img src={leftArrowIcon} alt="" />
        </button>
        <button
          className="AddressBar__button"
          data-name="go-forward-btn"
          type="button"
          disabled={!isGoForward}
          onClick={() => webView.goForward()}
        >
          <img src={rightArrowIcon} alt="" />
        </button>
        {isLoading ? (
          <button
            className="AddressBar__button"
            data-name="stop-btn"
            type="button"
            onClick={() => webView.stop()}
          >
            <img src={cancelIcon} alt="" />
          </button>
        ) : (
          <button
            className="AddressBar__button"
            type="button"
            onClick={this.handleNavigateReload}
          >
            <img src={refreshIcon} alt="" />
          </button>
        )}
        <div className="AddressBar__address">
          <input
            className="AddressBar__address-input"
            type="text"
            ref={this.addressInputRef}
            value={addressValue}
            onChange={this.handleAddressChange}
            onKeyDown={this.handleAddressEnter}
          />
          <button
            className="AddressBar__address-button"
            type="button"
            onClick={this.handleNavigateToHome}
          >
            <img className="AddressBar__home-icon" src={homeIcon} alt="" />
            <span className="AddressBar__home-url">{homeUrl}</span>
          </button>
        </div>
        <button
          className={moreClassName}
          ref={this.moreBtnRef}
          type="button"
          onClick={this.handleToggleMenu}
        >
          <img src={moreIcon} alt="" />
        </button>
        {isMenuOpen && (
          <ConfigMenu
            currentUrl={currentUrl}
            buttonRef={this.moreBtnRef}
            id={id}
            reloadInterval={reloadInterval}
            onClose={this.handleToggleMenu}
            onEditWidget={onEditWidget}
            onMakeWidget={onMakeWidget}
            onModalOpen={onModalOpen}
            onUpdateWidgetInfo={onUpdateWidgetInfo}
          />
        )}
        <button
          className={pinClassName}
          type="button"
          onClick={this.handleToggleIsOnTop}
        >
          <img className={pinIconClassName} src={iconPin} alt="" />
        </button>
      </div>
    );
  }
}

AddressBar.propTypes = propTypes;
AddressBar.defaultProps = defaultProps;

export default AddressBar;
