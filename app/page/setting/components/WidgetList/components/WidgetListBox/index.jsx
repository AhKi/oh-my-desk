import React from 'react';
import PropTypes from 'prop-types';
import WidgetListItem from '../WidgetListItem';
import './WidgetListBox.scss';

const propTypes = {
  list: PropTypes.array, // eslint-disable-line
  selectedId: PropTypes.string,
  onCloseWidget: PropTypes.func,
  onOpenWidget: PropTypes.func,
  onSelectItem: PropTypes.func,
  onModalOpen: PropTypes.func,
  onUpdateWidgetInfo: PropTypes.func,
};

const defaultProps = {
  list: [],
  selectedId: '',
  onCloseWidget() {},
  onOpenWidget() {},
  onSelectItem() {},
  onModalOpen() {},
  onUpdateWidgetInfo() {},
};

class WidgetListBox extends React.Component {
  render() {
    const {
      list,
      selectedId,
      onCloseWidget,
      onOpenWidget,
      onSelectItem,
      onModalOpen,
      onUpdateWidgetInfo,
    } = this.props;

    return (
      <div className="WidgetListBox">
        <div className="WidgetListBox__container">
          <div className="WidgetListBox__title-box">
            <ul className="WidgetListBox__label-box">
              <li className="WidgetListBox__title WidgetListBox__title-name">
                Name
              </li>
              <li className="WidgetListBox__title WidgetListBox__title-url">
                Url
              </li>
              <li className="WidgetListBox__title WidgetListBox__title-activated">
                Activated
              </li>
              <li className="WidgetListBox__title WidgetListBox__title-always-top">
                Always top
              </li>
              <li className="WidgetListBox__title WidgetListBox__title-more">
                More
              </li>
            </ul>
          </div>
          <ul>
            {list.map(item => (
              <WidgetListItem
                key={item.id}
                item={item}
                selectedId={selectedId}
                onCloseWidget={onCloseWidget}
                onOpenWidget={onOpenWidget}
                onSelectItem={onSelectItem}
                onModalOpen={onModalOpen}
                onUpdateWidgetInfo={onUpdateWidgetInfo}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

WidgetListBox.propTypes = propTypes;
WidgetListBox.defaultProps = defaultProps;

export default WidgetListBox;
