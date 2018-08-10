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
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
const defaultProps = {
  currentUrl: '',
  homeUrl: '',
  webView: null,
};

class AddressBar extends React.Component {
  componentDidMount() {
    const { webView } = this.props;
    console.log(webView);
  }

  componentDidUpdate(prevProps) {
    const { webView } = this.props;
    console.log(prevProps.webView === webView);

    webView.addEventListener('did-navigate', (e) => {
      console.log(e);
    });
  }

  render() {
    const moreClassName = cx('AddressBar__button', 'AddressBar__more-btn', {
      'AddressBar__more-btn--active': true,
    });
    const pinClassName = cx('AddressBar__pin-btn', {
      'AddressBar__pin-btn--active': true,
    });
    const { currentUrl, homeUrl } = this.props;

    console.log('render');

    return (
      <div className="AddressBar">
        <button
          className="AddressBar__button"
          type="button"
        >
          <img src={leftArrowIcon} alt="" />
        </button>
        <button
          className="AddressBar__button"
          type="button"
        >
          <img src={rightArrowIcon} alt="" />
        </button>
        <button
          className="AddressBar__button"
          type="button"
        >
          <img src={refreshIcon} alt="" />
        </button>
        <div className="AddressBar__address">
          <input
            className="AddressBar__address-input"
            type="text"
            value={currentUrl}
          />
          <button
            className="AddressBar__address-button"
            type="button"
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
        >
          <img src={iconPin} alt="" />
        </button>
      </div>
    );
  }
}

AddressBar.propTypes = propTypes;
AddressBar.defaultProps = defaultProps;

export default AddressBar;
