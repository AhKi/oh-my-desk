import React from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron';
import cx from 'classnames';
import Svg from 'react-svg-inline';
import i18n from 'constants/i18n';
import plusIcon from 'assets/icon/icon-plus-white.svg';
import editIcon from 'assets/icon/icon-edit.svg';
import reloadIcon from 'assets/icon/icon-widget-refresh.svg';
import checkIcon from 'assets/icon/icon-checked.svg';
import outIcon from 'assets/icon/icon-out.svg';
import deleteIcon from 'assets/icon/icon-delete.svg';
import DeleteWidgetConfirmContainer from '../../containers/DeleteWidgetConfirmContainer';
import './ConfigMenu.scss';

const propTypes = {
  id: PropTypes.string,
  currentUrl: PropTypes.string,
  buttonRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  reloadInterval: PropTypes.number,
  onClose: PropTypes.func,
  onEditWidget: PropTypes.func,
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
  onEditWidget() {},
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
    this.handleEditWidget = this.handleEditWidget.bind(this);
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

  handleEditWidget() {
    const { id, onClose, onEditWidget } = this.props;

    onEditWidget(id);
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
    const timerBtnClassName = cx('ConfigMenu__btn', 'ConfigMenu__arrow', {
      'ConfigMenu__arrow-up': isOpenReloadMenu,
      'ConfigMenu__arrow-down': !isOpenReloadMenu,
    });
    const neverRefreshIconClassName = cx('ConfigMenu__check-icon', {
      'ConfigMenu__check-icon--active': reloadInterval === 0,
    });
    const refreshIconClassName = cx('ConfigMenu__check-icon', {
      'ConfigMenu__check-icon--active': reloadInterval !== 0,
    });

    return (
      <ul
        className="ConfigMenu"
        ref={this.menuContainerRef}
      >
        <li className="ConfigMenu__list ConfigMenu__bottom-line">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleMakeWidget}
          >
            <Svg className="ConfigMenu__icon" svg={plusIcon} />
            <span className="ConfigMenu__text">{text.newWindow}</span>
          </button>
        </li>
        <li className="ConfigMenu__list">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleEditWidget}
          >
            <Svg className="ConfigMenu__icon" svg={editIcon} />
            <span className="ConfigMenu__text">{text.editWidget}</span>
          </button>
        </li>
        <li className="ConfigMenu__list">
          <button
            className={timerBtnClassName}
            type="button"
            onClick={this.handleToggleReloadMenu}
          >
            <Svg className="ConfigMenu__icon" svg={reloadIcon} />
            <span className="ConfigMenu__text">{text.everySecond}</span>
          </button>
        </li>
        {isOpenReloadMenu && ([
          <li
            className="ConfigMenu__list"
            key="never-menu"
          >
            <button
              className="ConfigMenu__btn ConfigMenu__dropdown-btn"
              data-name="interval-zero-btn"
              type="button"
              disabled={reloadInterval === 0}
              onClick={() => this.handleSetReloadInterval(0)}
            >
              <Svg className={neverRefreshIconClassName} svg={checkIcon} />
              <span className="ConfigMenu__text">{text.never}</span>
            </button>
          </li>,
          <li
            className="ConfigMenu__list"
            key="reload-every-menu"
          >
            <button
              className="ConfigMenu__btn ConfigMenu__dropdown-btn"
              data-name="set-interval-btn"
              type="button"
              disabled={reloadInterval !== 0}
              onClick={() => this.handleSetReloadInterval(localSecond)}
            >
              <Svg className={refreshIconClassName} svg={checkIcon} />
              {text.reloadEvery([
                <select
                  className="ConfigMenu__select"
                  key="select"
                  value={localSecond}
                  onChange={this.handleChangeLocalSecond}
                >
                  <option value={5}>5s</option>
                  <option value={10}>10s</option>
                  <option value={30}>30s</option>
                  <option value={60}>60s</option>
                </select>,
                <span className="ConfigMenu__select-arrow" key="arrow" />,
              ])}
            </button>
          </li>,
        ])}
        <li className="ConfigMenu__list ConfigMenu__bottom-line">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleOpenWithBrowser}
          >
            <Svg className="ConfigMenu__icon" svg={outIcon} />
            <span className="ConfigMenu__text">{text.openBrowser}</span>
          </button>
        </li>
        <li className="ConfigMenu__list">
          <button
            className="ConfigMenu__btn"
            type="button"
            onClick={this.handleDeleteWidget}
          >
            <Svg className="ConfigMenu__icon" svg={deleteIcon} />
            <span className="ConfigMenu__text">{text.deleteWidget}</span>
          </button>
        </li>
      </ul>
    );
  }
}

ConfigMenu.propTypes = propTypes;
ConfigMenu.defaultProps = defaultProps;

export default ConfigMenu;
