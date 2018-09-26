import React from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import i18n from 'constants/i18n';
import './MenuNewWindow.scss';

const propTypes = {
  url: PropTypes.string,
  webview: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  x: PropTypes.number,
  y: PropTypes.number,
  onClose: PropTypes.func,
  onMakeWidget: PropTypes.func,
};

const defaultProps = {
  url: '',
  webview: null,
  x: 0,
  y: 0,
  onClose() {},
  onMakeWidget() {},
};

class MenuNewWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
    };
    this.menuRef = React.createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenBrowser = this.handleOpenBrowser.bind(this);
    this.handleOpenWidget = this.handleOpenWidget.bind(this);
    this.handleMovementPage = this.handleMovementPage.bind(this);
  }

  componentDidMount() {
    const { x, y, webview } = this.props;
    const screenWidth = webview.clientWidth;
    const screenHeight = webview.clientHeight;
    const menuWidth = this.menuRef.current.clientWidth;
    const menuHeight = this.menuRef.current.clientHeight;

    this.setState({
      x: x + menuWidth > screenWidth ? x - menuWidth : x,
      y: y + menuHeight > screenHeight ? y - menuHeight : y,
    });

    window.addEventListener('mouseup', this.handleClose);
    window.addEventListener('resize', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.handleClose);
    window.removeEventListener('resize', this.handleClose);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleOpenBrowser() {
    const { url } = this.props;
    shell.openExternal(url);
  }

  handleMovementPage() {
    const { webview, url } = this.props;
    webview.loadURL(url);
  }

  handleOpenWidget() {
    const { url, onMakeWidget } = this.props;

    onMakeWidget({ url });
  }

  render() {
    const {
      x,
      y,
    } = this.state;
    const text = i18n().contextMenu;

    return (
      <ul
        className="MenuNewWindow"
        ref={this.menuRef}
        style={{ left: x, top: y }}
      >
        <li className="MenuNewWindow__list">
          <button
            className="MenuNewWindow__btn"
            type="button"
            onMouseUp={this.handleOpenBrowser}
          >
            {text.openNewBrowser}
          </button>
        </li>
        <li className="MenuNewWindow__list">
          <button
            className="MenuNewWindow__btn"
            type="button"
            onMouseUp={this.handleMovementPage}
          >
            {text.moveBrowser}
          </button>
        </li>
        <li className="MenuNewWindow__list">
          <button
            className="MenuNewWindow__btn"
            type="button"
            onMouseUp={this.handleOpenWidget}
          >
            {text.openNewWidget}
          </button>
        </li>
      </ul>
    );
  }
}

MenuNewWindow.propTypes = propTypes;
MenuNewWindow.defaultProps = defaultProps;

export default MenuNewWindow;
