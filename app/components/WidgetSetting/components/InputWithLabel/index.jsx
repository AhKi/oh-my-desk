import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
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
	disabled: false,
	type: 'text',
	label: '',
	value: '',
	onChange() {},
};

function InputWithLabel(props) {
	return (
		<div className="ToggleButtonWithLabel">
			<span>{props.label}</span>
			<input
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