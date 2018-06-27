import React from 'react';
import PropTypes from 'prop-types';
import './EditSize.scss';

const propTypes = {
  item: PropTypes.shape({
    size: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
    }),
  }),
  onChangeHeight: PropTypes.func,
  onChangeWidth: PropTypes.func,
};
const defaultProps = {
  item: {},
  onChangeHeight() {},
  onChangeWidth() {},
};

class EditSize extends React.Component {
  render() {
    const { item, onChangeHeight, onChangeWidth } = this.props;

    return (
      <div className="EditSize space-6x">
        <p className="EditSize__header space-1x">
          <strong>
            Web widget size
          </strong>
        </p>
        <span className="EditSize-description space-4x">
          The size is preserved when the widget is switched off and on.
        </span>
        <div className="EditSize__content">
          <label htmlFor="width-input" className="InputSet__label">
            <span className="InputSet__label-text">
              Width
            </span>
            <input
              className="EditSize__text-input"
              id="width-input"
              type="number"
              value={item.size.width || ''}
              onChange={onChangeWidth}
            />
            px
          </label>
          <label htmlFor="height-input" className="InputSet__label">
            <span className="InputSet__label-text">
              Height
            </span>
            <input
              className="EditSize__text-input"
              id="height-input"
              type="number"
              value={item.size.height || ''}
              onChange={onChangeHeight}
            />
            px
          </label>
        </div>
      </div>
    );
  }
}

EditSize.propTypes = propTypes;
EditSize.defaultProps = defaultProps;

export default EditSize;
