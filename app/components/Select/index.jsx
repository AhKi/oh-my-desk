import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
};
const defaultProps = {
  items: [],
  value: '',
  onChange() {},
};

class Select extends React.Component {
  render() {
    const { items, value, onChange } = this.props;
    return (
      <select value={value} onChange={onChange}>
        {items.map(item => (
          <option
            key={item}
            value={item}
          >
            {item.toLowerCase()}
          </option>))
        }
      </select>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
