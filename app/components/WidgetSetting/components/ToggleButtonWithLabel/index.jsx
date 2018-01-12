import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'components/Button/ToggleButton';
import './ToggleButtonWithLabel.scss';

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
			<span className="InputSet__label">
				{props.label}
			</span>
			<div>
				<ToggleButton
					isCheck={props.isCheck}
					onToggle={props.onToggle}
					{...props}
				/>
			</div>
		</div>
	);
}

ToggleButtonWithLabel.propTypes = propTypes;
ToggleButtonWithLabel.defaultProps = defaultProps;

export default ToggleButtonWithLabel;
