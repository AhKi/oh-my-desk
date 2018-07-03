import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import moreIcon from 'assets/icon/icon-more.svg';
import editIcon from 'assets/icon/icon-edit.svg';
import deleteIcon from 'assets/icon/icon-delete.svg';
import pinIcon from 'assets/icon/icon-pin.svg';
import ToggleButton from 'setting/components/Button/ToggleButton';
import OutsideClickHandler from 'components/OutsideClickHandler';
import * as MODAL from 'constants/modal';
import './WidgetListItem.scss';

const propTypes = {
  item: PropTypes.object, // eslint-disable-line
  onCloseWidget: PropTypes.func,
  onOpenWidget: PropTypes.func,
  onSelectItem: PropTypes.func,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};

const defaultProps = {
  item: {},
  onCloseWidget() {},
  onOpenWidget() {},
  onSelectItem() {},
  onModalOpen() {},
  onUpdateWidgetInfo() {},
};

class WidgetListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveMore: false,
    };
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleWidgetOpen = this.handleWidgetOpen.bind(this);
    this.handleToggleIsActive = this.handleToggleIsActive.bind(this);
    this.handleToggleAlwaysTop = this.handleToggleAlwaysTop.bind(this);
    this.handleToggleMore = this.handleToggleMore.bind(this);
    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
  }

  handleSelectItem() {
    const { item, onSelectItem } = this.props;

    onSelectItem(item.id);
  }

  handleWidgetOpen() {
    const { item, onOpenWidget } = this.props;
    onOpenWidget(item.id);
  }

  handleToggleIsActive() {
    const { item, onCloseWidget, onOpenWidget } = this.props;

    if (item.isOpen) {
      onCloseWidget(item.id);
    } else {
      onOpenWidget(item.id);
    }
  }

  handleToggleAlwaysTop() {
    const { item, onUpdateWidgetInfo } = this.props;

    onUpdateWidgetInfo(item.id, { isOnTop: !item.isOnTop });
  }

  handleToggleMore(bool) {
    const { isActiveMore } = this.state;

    if (bool === undefined) {
      this.setState({ isActiveMore: !isActiveMore });
      return;
    }

    if (bool !== isActiveMore) {
      this.setState({ isActiveMore: bool });
    }
  }

  handleOpenDeleteModal() {
    const { item, onModalOpen } = this.props;
    onModalOpen(MODAL.DELETE_CONFIRM_WIDGET, {
      id: item.id,
      name: item.name,
    });
  }

  render() {
    const { item } = this.props;
    const { isActiveMore } = this.state;
    const itemClassName = cx('WidgetListItem', 'WidgetListItem__list-box');
    const pinBtnClassName = cx('WidgetListItem__pin-button', {
      'WidgetListItem__pin-button--active': item.isOnTop,
    });
    const pinClassName = cx('WidgetListItem__pin', {
      'WidgetListItem__pin--active': item.isOnTop,
    });

    return (
      <ul className={itemClassName}>
        <li className="WidgetListItem__list WidgetListItem__list-name">
          {item.name}
        </li>
        <li className="WidgetListItem__list WidgetListItem__list-url">
          <button
            className="WidgetListItem__button"
            type="button"
            onClick={this.handleWidgetOpen}
          >
            {item.url}
          </button>
        </li>
        <li className="WidgetListItem__list WidgetListItem__list-activated">
          <ToggleButton
            checkedValue={null}
            unCheckedValue={null}
            isCheck={item.isOpen}
            onToggle={this.handleToggleIsActive}
          />
        </li>
        <li className="WidgetListItem__list WidgetListItem__list-always-top">
          <button
            className={pinBtnClassName}
            type="button"
            onClick={this.handleToggleAlwaysTop}
          >
            <img src={pinIcon} alt="" className={pinClassName} />
            {item.isOnTop ? 'pin up' : 'unpin'}
          </button>
        </li>
        <li className="WidgetListItem__list WidgetListItem__more">
          {isActiveMore ? (
            <OutsideClickHandler onOutSideClick={() => this.handleToggleMore(false)}>
              <button
                className="WidgetListItem__pin-button-active"
                data-name="outside-inner-more-btn"
                type="button"
                onClick={this.handleToggleMore}
              >
                <img src={moreIcon} alt="" />
              </button>
              <ul className="WidgetListItem__more-menu">
                <Link
                  className="WidgetListItem__more-list-btn"
                  to="/widget-setting"
                  onClick={this.handleSelectItem}
                >
                  edit
                  <img src={editIcon} alt="" />
                </Link>
                <li>
                  <button
                    className="WidgetListItem__more-list-btn"
                    type="button"
                    onClick={this.handleOpenDeleteModal}
                  >
                    remove
                    <img src={deleteIcon} alt="" />
                  </button>
                </li>
              </ul>
            </OutsideClickHandler>) : (
              <button
                className="WidgetListItem__pin-button"
                data-name="more-btn"
                type="button"
                onClick={this.handleToggleMore}
              >
                <img src={moreIcon} alt="" />
              </button>
          )}
        </li>
      </ul>
    );
  }
}

WidgetListItem.propTypes = propTypes;
WidgetListItem.defaultProps = defaultProps;

export default WidgetListItem;
