import React from 'react';
import PropTypes from 'prop-types';
import './WebWidgetHeaer.scss';

const propTypes = {
  title: PropTypes.string,
  webView: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
  onToggleIsOnTop: PropTypes.func,
};
const defaultProps = {
  title: '',
  webView: null,
  isLoading: false,
  onToggleIsOnTop() {},
};

class WebWidgetHeader extends React.Component {
  constructor(props) {
    super(props);
    this.widget = window.remote.getCurrentWindow();
    this.handleWidgetMinimize = this.handleWidgetMinimize.bind(this);
    this.handleWidgetToggleMaximize = this.handleWidgetToggleMaximize.bind(this);
    this.handleWidgetClose = this.handleWidgetClose.bind(this);
    this.handleWidgetGoBack = this.handleWidgetGoBack.bind(this);
    this.handleWidgetGoFront = this.handleWidgetGoFront.bind(this);
    this.handleWidgetRefresh = this.handleWidgetRefresh.bind(this);
    this.handleWidgetStopRefresh = this.handleWidgetStopRefresh.bind(this);
  }

  handleWidgetGoBack() {
    this.props.webView.goBack();
  }

  handleWidgetGoFront() {
    this.props.webView.goForward();
  }

  handleWidgetRefresh() {
    this.props.webView.reload();
  }

  handleWidgetStopRefresh() {
    this.props.webView.stop();
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
    const { webView, isLoading, onToggleIsOnTop } = this.props;

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
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--go-back"
            disabled={webView && !webView.canGoBack()}
            onClick={this.handleWidgetGoBack}
          >
            <i className="fas fa-arrow-left" />
          </button>
          <button
            type="button"
            className="WebWidgetHeader__button WebWidgetHeader__button--go-front"
            disabled={webView && !webView.canGoForward()}
            onClick={this.handleWidgetGoFront}
          >
            <i className="fas fa-arrow-right" />
          </button>
          {!isLoading &&
            <button
              type="button"
              className="WebWidgetHeader__button WebWidgetHeader__button--refresh"
              onClick={this.handleWidgetRefresh}
            >
              <i className="fas fa-undo" />
            </button>
          }
          {isLoading &&
            <button
              type="button"
              className="WebWidgetHeader__button WebWidgetHeader__button--refresh"
              onClick={this.handleWidgetStopRefresh}
            >
              <i className="fas fa-times" />
            </button>
          }
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
