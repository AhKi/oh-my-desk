import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'components/Button/ToggleButton';

const propTypes = {
	isCheck: PropTypes.bool,
	label: PropTypes.string,
	onToggle: PropTypes.func,
};
const defaultProps = {
	isCheck: PropTypes.bool,
	label: '',
	onToggle() {},
};

function ToggleButtonWithLabel(props) {
	return (
		<div className="ToggleButtonWithLabel">
			<span>
				{props.label}
			</span>
			<ToggleButton
				isCheck={props.isCheck}
				onToggle={props.onToggle}
				{...props}
			/>
		</div>
	);
}

ToggleButtonWithLabel.propTypes = propTypes;
ToggleButtonWithLabel.defaultProps = defaultProps;

export default ToggleButtonWithLabel;