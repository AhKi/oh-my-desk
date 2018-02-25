import React from 'react';
import PropTypes from 'prop-types';
import WidgetSmallIcon from 'assets/icon/icon-widget-small-view';
import WidgetSettingIcon from 'assets/icon/icon-widget-setting';
import WidgetGrowIcon from 'assets/icon/icon-widget-grow-view';
import WidgetCloseIcon from 'assets/icon/icon-widget-close';
import PinIcon from 'assets/icon/icon-pin';
import cx from 'classnames';

import HistoryGoBackButton from '../Button/HistoryGoBackButton';
import ReloadButton from '../Button/ReloadButton';
import './WebWidgetHeaer.scss';

const propTypes = {
  title: PropTypes.string,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  isOnTop: PropTypes.bool,
  onToggleIsOnTop: PropTypes.func,
  onGoBack: PropTypes.func,
  onGoForward: PropTypes.func,
  onRefresh: PropTypes.func,
  onStopRefresh: PropTypes.func,
  onToggleSetting: PropTypes.func,
};
const defaultProps = {
  title: '',
  webView: null,
  isLoading: false,
  isOnTop: false,
  onToggleIsOnTop() {},
  onGoBack() {},
  onGoForward() {},
  onRefresh() {},
  onStopRefresh() {},
  onToggleSetting() {},
};

class WebWidgetHeader extends React.Component {
  constructor(props) {
    super(props);
    this.widget = window.remote.getCurrentWindow();
    this.handleWidgetMinimize = this.handleWidgetMinimize.bind(this);
    this.handleWidgetToggleMaximize = this.handleWidgetToggleMaximize.bind(this);
    this.handleWidgetClose = this.handleWidgetClose.bind(this);
  }

  handleWidgetMinimize() {
    this.widget.minimize();
  }

  handleWidgetToggleMaximize() {
    if (!this.widget.isMaximized()) {
      this.widget.maximize();
    } else {
      this.widget.unmaximize();
    }
  }

  handleWidgetClose() {
    this.widget.close();
  }

  render() {
    const {
      webView,
      isLoading,
      isOnTop,
      onToggleIsOnTop,
      onGoBack,
      onGoForward,
      onRefresh,
      onStopRefresh,
      onToggleSetting,
    } = this.props;
    const thumbtackClassName = cx('WebWidgetHeader__thumbtack', {
      'WebWidgetHeader__thumbtack--active': isOnTop,
    });

    return (
      <div className="WebWidgetHeader__title-bar">
        <div className="WebWidgetHeader__front-btn-set">
          <button
            type="button"
            className={thumbtackClassName}
            onClick={onToggleIsOnTop}
          >
            <PinIcon />
          </button>
          <div
            className="WebWidgetHeader__history-set"
          >
            <HistoryGoBackButton
              isCanGoBack={webView && webView.canGoBack()}
              isCanGoForward={webView && webView.canGoForward()}
              onGoBack={onGoBack}
              onGoForward={onGoForward}
            />
            <ReloadButton
              isLoading={isLoading}
              onRefresh={onRefresh}
              onStopRefresh={onStopRefresh}
            />
          </div>
          <div className="WebWidgetHeader__mobile-title">
            {this.props.title}
          </div>
        </div>
        <div className="WebWidgetHeader__title">
          {this.props.title}
        </div>
        <div className="WebWidgetHeader__button-set">
          <button
            className="WebWidgetHeader__button WebWidgetHeader__button-setting"
            type="button"
            onClick={() => onToggleSetting()}
          >
            <WidgetSettingIcon />
          </button>
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--min"
            onClick={this.handleWidgetMinimize}
          >
            <WidgetSmallIcon />
          </button>
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--max"
            onClick={this.handleWidgetToggleMaximize}
          >
            <WidgetGrowIcon />
          </button>
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--close"
            onClick={this.handleWidgetClose}
          >
            <WidgetCloseIcon />
          </button>
        </div>
      </div>
    );
  }
}

WebWidgetHeader.propTypes = propTypes;
WebWidgetHeader.defaultProps = defaultProps;

export default WebWidgetHeader;
