import React from 'react';
import PropTypes from 'prop-types';
import WidgetBackIcon from 'assets/icon/icon-widget-back-arrow';
import WidgetGoIcon from 'assets/icon/icon-widget-go-arrow';
import cx from 'classnames';
import './HistoryGoBackButton.scss';

const propTypes = {
  className: PropTypes.string,
  isCanGoBack: PropTypes.bool,
  isCanGoForward: PropTypes.bool,
  onGoBack: PropTypes.func,
  onGoForward: PropTypes.func,
};
const defaultProps = {
  className: '',
  isCanGoBack: false,
  isCanGoForward: false,
  onGoBack() {},
  onGoForward() {},
};

function HistoryGoBackButton(props) {
  const {
    className,
    isCanGoBack,
    isCanGoForward,
    onGoBack,
    onGoForward,
  } = props;
  return (
    <div
      className={cx('HistoryGoBackButton', className)}
    >
      <button
        type="button"
        className="WidgetHeader__button HistoryGoBackButton__btn--go-back"
        disabled={!isCanGoBack}
        onClick={onGoBack}
      >
        <WidgetBackIcon />
      </button>
      <button
        type="button"
        className="WidgetHeader__button HistoryGoBackButton__btn--go-front"
        disabled={!isCanGoForward}
        onClick={onGoForward}
      >
        <WidgetGoIcon />
      </button>
    </div>
  );
}

HistoryGoBackButton.propTypes = propTypes;
HistoryGoBackButton.defaultProps = defaultProps;

export default HistoryGoBackButton;
