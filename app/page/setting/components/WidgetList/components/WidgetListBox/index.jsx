import React from 'react';
import PropTypes from 'prop-types';
import WidgetListItem from '../WidgetListItem';
import './WidgetListBox.scss';

const propTypes = {
  list: PropTypes.array, // eslint-disable-line
  selectedId: PropTypes.string,
  onSelectItem: PropTypes.func,
  onUpdateInfoWithIPC: PropTypes.func,
  onModalOpen: PropTypes.func,
};

const defaultProps = {
  list: [],
  selectedId: '',
  onSelectItem() {},
  onUpdateInfoWithIPC() {},
  onModalOpen() {},
};

class WidgetListBox extends React.Component {
  render() {
    const {
      list,
      selectedId,
      onSelectItem,
      onUpdateInfoWithIPC,
      onModalOpen,
    } = this.props;

    return (
      <div className="WidgetListBox">
        <div className="WidgetListBox__container">
          <ul>
            <li className="WidgetListBox__title WidgetListBox__title-name">Name</li>
            <li className="WidgetListBox__title WidgetListBox__title-url">Url</li>
            <li className="WidgetListBox__title WidgetListBox__title-activated">Activated</li>
            <li className="WidgetListBox__title WidgetListBox__title-always-top">Always top</li>
            <li className="WidgetListBox__title WidgetListBox__title-more">More</li>
          </ul>
          <ul>
            {list.map(item => (<WidgetListItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              onSelectItem={onSelectItem}
              onUpdateInfoWithIPC={onUpdateInfoWithIPC}
              onModalOpen={onModalOpen}
            />))}
          </ul>
        </div>
      </div>
    );
  }
}

WidgetListBox.propTypes = propTypes;
WidgetListBox.defaultProps = defaultProps;

export default WidgetListBox;
