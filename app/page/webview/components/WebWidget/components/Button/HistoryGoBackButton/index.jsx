import React from 'react';
import PropTypes from 'prop-types';
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
        className="HistoryGoBackButton__btn HistoryGoBackButton__btn--go-back"
        disabled={!isCanGoBack}
        onClick={onGoBack}
      >
        <i className="fas fa-arrow-left" />
      </button>
      <button
        type="button"
        className="HistoryGoBackButton__btn HistoryGoBackButton__btn--go-front"
        disabled={!isCanGoForward}
        onClick={onGoForward}
      >
        <i className="fas fa-arrow-right" />
      </button>
    </div>
  );
}

HistoryGoBackButton.propTypes = propTypes;
HistoryGoBackButton.defaultProps = defaultProps;

export default HistoryGoBackButton;
