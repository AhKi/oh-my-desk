import React from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import i18n from 'constants/i18n';
import DeleteWidgetConfirmContainer from '../../containers/DeleteWidgetConfirmContainer';
import './ConfigMenu.scss';

const propTypes = {
  id: PropTypes.string,
  currentUrl: PropTypes.string,
  buttonRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  reloadInterval: PropTypes.number,
  onClose: PropTypes.func,
  onMakeWidget: PropTypes.func,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};
const defaultProps = {
  id: '',
  currentUrl: '',
  buttonRef: null,
  reloadInterval: 0,
  onClose() {},
  onMakeWidget() {},
  onModalOpen() {},
  onUpdateWidgetInfo() {},
};

class ConfigMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localSecond: props.reloadInterval || 5,
      isOpenReloadMenu: false,
    };
    this.menuContainerRef = React.createRef();
    this.handleChangeLocalSecond = this.handleChangeLocalSecond.bind(this);
    this.handleDeleteWidget = this.handleDeleteWidget.bind(this);
    this.handleOutSideClick = this.handleOutSideClick.bind(this);
    this.handleMakeWidget = this.handleMakeWidget.bind(this);
    this.handleToggleReloadMenu = this.handleToggleReloadMenu.bind(this);
    this.handleOpenWithBrowser = this.handleOpenWithBrowser.bind(this);
    this.handleSetReloadInterval = this.handleSetReloadInterval.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleOutSideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOutSideClick);
  }

  handleDeleteWidget() {
    const { onClose, onModalOpen } = this.props;

    onModalOpen(DeleteWidgetConfirmContainer);
    onClose();
  }

  handleMakeWidget() {
    const { onClose, onMakeWidget } = this.props;

    onMakeWidget();
    onClose();
  }

  handleOutSideClick(e) {
    const { buttonRef, onClose } = this.props;

    if (
      !this.menuContainerRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      onClose(false);
    }
  }

  handleToggleReloadMenu() {
    this.setState(prevState => ({ isOpenReloadMenu: !prevState.isOpenReloadMenu }));
  }

  handleOpenWithBrowser() {
    const { currentUrl, onClose } = this.props;

    shell.openExternal(currentUrl);
    onClose(false);
  }

  handleSetReloadInterval(value) {
    const { id, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(id, {
      reloadInterval: Number(value),
    });
  }

  handleChangeLocalSecond(e) {
    const { value } = e.target;

    this.setState({ localSecond: value });
    this.handleSetReloadInterval(value);
  }

  render() {
    const { localSecond, isOpenReloadMenu } = this.state;
    const { reloadInterval } = this.props;
    const text = i18n().widget;

    return (
      <ul
        className="ConfigMenu"
        ref={this.menuContainerRef}
      >
        <li className="ConfigMenu__list">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleMakeWidget}
          >
            {text.newWindow}
          </button>
        </li>
        <li className="ConfigMenu__list">{text.editWidget}</li>
        <li className="ConfigMenu__list">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleToggleReloadMenu}
          >
            {text.everySecond}
          </button>
        </li>
        {isOpenReloadMenu && ([
          <li
            className="ConfigMenu__list"
            key="never-menu"
          >
            <button
              className="ConfigMenu__btn"
              data-name="interval-zero-btn"
              type="button"
              disabled={reloadInterval === 0}
              onClick={() => this.handleSetReloadInterval(0)}
            >
              {text.never}
            </button>
          </li>,
          <li
            className="ConfigMenu__list"
            key="reload-every-menu"
          >
            <button
              className="ConfigMenu__btn"
              data-name="set-interval-btn"
              type="button"
              disabled={reloadInterval !== 0}
              onClick={() => this.handleSetReloadInterval(localSecond)}
            >
              {text.reloadEvery(
                <select
                  value={localSecond}
                  onChange={this.handleChangeLocalSecond}
                >
                  <option value={5}>5s</option>
                  <option value={10}>10s</option>
                  <option value={30}>30s</option>
                  <option value={60}>60s</option>
                </select>,
              )}
            </button>
          </li>,
        ])}
        <li
          className="ConfigMenu__list"
        >
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleOpenWithBrowser}
          >
            {text.openBrowser}
          </button>
        </li>
        <li className="ConfigMenu__list">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleDeleteWidget}
          >
            {text.deleteWidget}
          </button>
        </li>
      </ul>
    );
  }
}

ConfigMenu.propTypes = propTypes;
ConfigMenu.defaultProps = defaultProps;

export default ConfigMenu;
