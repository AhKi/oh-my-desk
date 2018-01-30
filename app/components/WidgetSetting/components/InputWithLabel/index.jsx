import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './InputWithLabel.scss';

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};
const defaultProps = {
  className: null,
  disabled: false,
  type: 'text',
  label: '',
  value: '',
  onChange() {},
};

function InputWithLabel(props) {
  return (
    <div className={cx('InputWithLabel', props.className)}>
      <p className="InputSet__label">{props.label}</p>
      <input
        className="InputSet__text-input"
        disabled={props.disabled}
        type={props.type}
        value={props.value || ''}
        onChange={props.onChange}
      />
    </div>
  );
}

InputWithLabel.propTypes = propTypes;
InputWithLabel.defaultProps = defaultProps;

export default InputWithLabel;
