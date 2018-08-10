import React from 'react';
import PropTypes from 'prop-types';
import WidgetRefreshIcon from 'assets/icon/icon-widget-refresh';
import WidgetCloseIcon from 'assets/icon/icon-widget-close';
import cx from 'classnames';
import './ReloadButton.scss';

const propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onStopRefresh: PropTypes.func,
};
const defaultProps = {
  className: 'ReloadButton',
  isLoading: false,
  onRefresh() {},
  onStopRefresh() {},
};

function ReloadButton(props) {
  const {
    className,
    isLoading,
    onRefresh,
    onStopRefresh,
  } = props;

  return (
    <div
      className={cx('ReloadButton', { className })}
    >
      {!isLoading && (
        <button
          type="button"
          className="WidgetHeader__button ReloadButton__btn"
          onClick={onRefresh}
        >
          <WidgetRefreshIcon />
        </button>
      )}
      {isLoading && (
        <button
          type="button"
          className="WidgetHeader__button ReloadButton__btn"
          onClick={onStopRefresh}
        >
          <WidgetCloseIcon />
        </button>
      )}
    </div>
  );
}

ReloadButton.propTypes = propTypes;
ReloadButton.defaultProps = defaultProps;

export default ReloadButton;
