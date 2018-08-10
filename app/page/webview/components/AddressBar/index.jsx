import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import leftArrowIcon from 'assets/icon/icon-widget-back-arrow.svg';
import rightArrowIcon from 'assets/icon/icon-widget-go-arrow.svg';
import homeIcon from 'assets/icon/icon-widget-small-view.svg';
import moreIcon from 'assets/icon/icon-more.svg';
import refreshIcon from 'assets/icon/icon-widget-refresh.svg';
import iconPin from 'assets/icon/icon-pin.svg';
import './AddressBar.scss';

const propTypes = {
  currentUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  id: PropTypes.string,
  isOnTop: PropTypes.bool,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onUpdateWidgetInfo: PropTypes.func,
};
const defaultProps = {
  currentUrl: '',
  homeUrl: '',
  id: '',
  isOnTop: false,
  webView: null,
  onUpdateWidgetInfo() {},
};

class AddressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressValue: '',
    };
    this.addressInputRef = React.createRef();
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddressEnter = this.handleAddressEnter.bind(this);
    this.handleNavigateToHome = this.handleNavigateToHome.bind(this);
    this.handleToggleIsOnTop = this.handleToggleIsOnTop.bind(this);
  }

  componentDidMount() {
    const additionKey = process.platform === 'darwin' ? 'metaKey' : 'ctrlKey';
    window.addEventListener('keydown', (e) => {
      if (e[additionKey] && e.key === 'l') {
        this.addressInputRef.current.select();
      }
      if (document.activeElement === this.addressInputRef.current &&
        e.key === 'Escape') {
        this.addressInputRef.current.blur();
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { currentUrl } = this.props;

    if (currentUrl !== prevProps.currentUrl) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
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
  }

  handleToggleIsOnTop() {
    const { id, isOnTop, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(id, {
      isOnTop: !isOnTop,
    });
  }

  render() {
    const { addressValue } = this.state;
    const { homeUrl, isOnTop, webView } = this.props;
    const moreClassName = cx('AddressBar__button', 'AddressBar__more-btn', {
      'AddressBar__more-btn--active': true,
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
          type="button"
          disabled={!isGoBack}
          onClick={() => webView.goBack()}
        >
          <img src={leftArrowIcon} alt="" />
        </button>
        <button
          className="AddressBar__button"
          type="button"
          disabled={!isGoForward}
          onClick={() => webView.goForward()}
        >
          <img src={rightArrowIcon} alt="" />
        </button>
        <button
          className="AddressBar__button"
          type="button"
          onClick={() => webView.reload()}
        >
          <img src={refreshIcon} alt="" />
        </button>
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
            <img src={homeIcon} alt="" />
            {homeUrl}
          </button>
        </div>
        <button
          className={moreClassName}
          type="button"
        >
          <img src={moreIcon} alt="" />
        </button>
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
