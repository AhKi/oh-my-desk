import React from 'react';
import PropTypes from 'prop-types';
import HistoryGoBackButton from '../Button/HistoryGoBackButton';
import ReloadButton from '../Button/ReloadButton';
import './WebWidgetHeaer.scss';

const propTypes = {
  title: PropTypes.string,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  onToggleIsOnTop: PropTypes.func,
  onGoBack: PropTypes.func,
  onGoForward: PropTypes.func,
  onRefresh: PropTypes.func,
  onStopRefresh: PropTypes.func,
};
const defaultProps = {
  title: '',
  webView: null,
  isLoading: false,
  onToggleIsOnTop() {},
  onGoBack() {},
  onGoForward() {},
  onRefresh() {},
  onStopRefresh() {},
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
      onToggleIsOnTop,
      onGoBack,
      onGoForward,
      onRefresh,
      onStopRefresh,
    } = this.props;

    return (
      <div className="WebWidgetHeader__title-bar">
        <button
          type="button"
          className="WebWidgetHeader__thumbtack"
          onClick={onToggleIsOnTop}
        >
          <i className="fas fa-thumbtack" data-fa-transform="rotate-90" />
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
        <div className="WebWidgetHeader__title">
          {this.props.title}
        </div>
        <div className="WebWidgetHeader__button-set">
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--min"
            onClick={this.handleWidgetMinimize}
          >
            <i className="fas fa-window-minimize" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--max"
            onClick={this.handleWidgetToggleMaximize}
          >
            <i className="fas fa-square" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--close"
            onClick={this.handleWidgetClose}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
}

WebWidgetHeader.propTypes = propTypes;
WebWidgetHeader.defaultProps = defaultProps;

export default WebWidgetHeader;
