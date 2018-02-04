import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem/index';
import './WidgetListBox.scss';

const propTypes = {
  list: PropTypes.array, // eslint-disable-line
  selectedId: PropTypes.string,
  onSelectItem: PropTypes.func,
};

const defaultProps = {
  list: [],
  selectedId: '',
  onSelectItem() {},
};

class WidgetListBox extends React.Component {
  render() {
    const { list, selectedId, onSelectItem } = this.props;

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
            {list.map(item => (<ListItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              onSelectItem={onSelectItem}
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
