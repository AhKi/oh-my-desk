import React from 'react';
import PropTypes from 'prop-types';
import os from 'os';
import cx from 'classnames';
import Svg from 'react-svg-inline';
import isUrl from 'is-url';
import cancelIcon from 'assets/icon/icon-widget-close.svg';
import leftArrowIcon from 'assets/icon/icon-widget-back-arrow.svg';
import rightArrowIcon from 'assets/icon/icon-widget-go-arrow.svg';
import refreshIcon from 'assets/icon/icon-widget-refresh.svg';
import homeIcon from 'assets/page-view_icon/icon_home.svg';
import moreIcon from 'assets/page-view_icon/icon_seemore.svg';
import iconPin from 'assets/page-view_icon/icon_pin.svg';
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
  state = {
    addressValue: '',
    isMenuOpen: false,
  };
  moreBtnRef = React.createRef();
  addressInputRef = React.createRef();

  componentDidMount() {
    document.addEventListener('keydown', this.configureKeyDownEvent);
  }

  componentDidUpdate(prevProps) {
    const { currentUrl } = this.props;

    if (currentUrl !== prevProps.currentUrl) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        addressValue: currentUrl,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.configureKeyDownEvent);
  }

  configureKeyDownEvent = (e) => {
    this.handleAttachAddressFocusHotKey(e);
    this.handleAttachReloadHotKey(e);
  };

  handleAttachAddressFocusHotKey = (e) => {
    const command = os.platform() === 'darwin' ? e.metaKey : e.ctrlKey;
    const isInsertCmdL = command && e.keyCode === 76;
    const isInsertEsc = e.keyCode === 27;

    if (isInsertCmdL) {
      this.addressInputRef.current.select();
    }

    if (isInsertEsc) {
      this.addressInputRef.current.blur();
    }
  };

  handleAttachReloadHotKey = (e) => {
    const { currentUrl, webView } = this.props;
    const command = os.platform() === 'darwin' ? e.metaKey : e.altKey;
    const isInsertCmdR = command && e.keyCode === 82;

    if (isInsertCmdR) {
      webView.reload();
      this.setState({ addressValue: currentUrl });
    }
  };

  handleAddressChange = (e) => {
    this.setState({ addressValue: e.target.value });
  };

  handleAddressEnter = (e) => {
    const { webView } = this.props;
    const { addressValue: address } = this.state;
    let nextUrl = address;

    if (e.key === 'Enter') {
      if (!isUrl(address) && !isUrl(`https://${address}`)) {
        nextUrl = `https://www.google.com/search?q=${address}`;
      } else {
        nextUrl = /^http(s)?:\/\//.test(address) ? address : `http://${address}`;
      }
      webView.loadURL(nextUrl);
    }
  };

  handleNavigateToHome = () => {
    const { homeUrl, webView } = this.props;

    webView.loadURL(homeUrl);
  };

  handleNavigateReload = () => {
    const { webView } = this.props;

    webView.reload();
  };

  handleToggleIsOnTop = () => {
    const { id, isOnTop, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(id, { isOnTop: !isOnTop });
  };

  handleToggleMenu = (value) => {
    const { isMakeProgress } = this.props;

    if (isMakeProgress) {
      return;
    }

    if (typeof value === 'boolean') {
      this.setState({ isMenuOpen: value });
    } else {
      this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
    }
  };

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
        <div className="AddressBar__front-button-box">
          <button
            className="AddressBar__button"
            data-name="go-back-btn"
            type="button"
            disabled={!isGoBack}
            onClick={() => webView.goBack()}
          >
            <Svg svg={leftArrowIcon} />
          </button>
          <button
            className="AddressBar__button"
            data-name="go-forward-btn"
            type="button"
            disabled={!isGoForward}
            onClick={() => webView.goForward()}
          >
            <Svg svg={rightArrowIcon} />
          </button>
          {isLoading ? (
            <button
              className="AddressBar__button"
              data-name="stop-btn"
              type="button"
              onClick={() => webView.stop()}
            >
              <Svg svg={cancelIcon} />
            </button>
          ) : (
            <button
              className="AddressBar__button"
              type="button"
              onClick={this.handleNavigateReload}
            >
              <Svg svg={refreshIcon} />
            </button>
          )}
        </div>
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
            <Svg className="AddressBar__home-icon" svg={homeIcon} />
            <div className="AddressBar__home-url">{homeUrl}</div>
          </button>
        </div>
        <div className="AddressBar__end-button-box">
          <button
            className={moreClassName}
            ref={this.moreBtnRef}
            type="button"
            onClick={this.handleToggleMenu}
          >
            <Svg svg={moreIcon} />
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
            <Svg className={pinIconClassName} svg={iconPin} />
          </button>
        </div>
      </div>
    );
  }
}

AddressBar.propTypes = propTypes;
AddressBar.defaultProps = defaultProps;

export default AddressBar;
