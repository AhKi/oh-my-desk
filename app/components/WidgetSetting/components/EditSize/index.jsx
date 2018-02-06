import React from 'react';
import PropTypes from 'prop-types';

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
      <div className="EditSize">
        <h4 className="EditSize__header">Edit setting</h4>
        <h5 className="EditSize__sub-header">
          The size is preserved when the widget is switched off and on.
        </h5>
        <div>
          <label htmlFor="width-input">
            Width
            <input
              id="width-input"
              type="number"
              value={item.size.width || ''}
              onChange={onChangeWidth}
            />
            px
          </label>
          <label htmlFor="height-input">
            Height
            <input
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
