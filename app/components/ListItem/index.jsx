import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as IPC from 'constants/ipc';
import './ListItem.scss';

const propTypes = {
  item: PropTypes.object, // eslint-disable-line
  selectedId: PropTypes.string,
  onSelectItem: PropTypes.func,
};

const defaultProps = {
  item: {},
  selectedId: '',
  onSelectItem() {},
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleWidgetOpen = this.handleWidgetOpen.bind(this);
  }

  handleSelectList() {
    this.props.onSelectItem(this.props.item.id);
  }

  handleWidgetOpen() {
    window.ipcRenderer.send(IPC.WIDGET_OPEN,
      Object.assign({}, this.props.item, { isActive: true }));
  }

  render() {
    const { item, selectedId } = this.props;
    const itemClassName = cx('ListItem', 'ListItem__button', {
      'ListItem__button-active': item.id === selectedId,
    });

    return (
      <li // eslint-disable-line
        className={itemClassName}
        onClick={this.handleSelectList}
        onDoubleClick={this.handleWidgetOpen}
      >
        {item.name}
      </li>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
