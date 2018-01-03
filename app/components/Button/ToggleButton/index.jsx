import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './ToggleButton.scss';

const propTypes = {
	checkedValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	isCheck: PropTypes.bool,
	unCheckedValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	width: PropTypes.number,
	onToggle: PropTypes.func,
};
const defaultProps = {
	checkedValue: <i className="fa fa-check" />,
	isCheck: false,
	unCheckedValue: <i className="fa fa-times" />,
	width: 50,
	onToggle() {},
};


function ToggleButton(props) {
	const {
		checkedValue,
		isCheck,
		unCheckedValue,
		width,
		onToggle,
	} = props;
	const halfWidth = width / 2;
	const wrapperClassName = cx('ToggleButton__wrapper', {
		'ToggleButton__wrapper-active': isCheck,
	});
	const buttonClassName = cx('ToggleButton__btn', {
		'ToggleButton__btn-active': isCheck,
	});

	return (
		<div // eslint-disable-line
			className={wrapperClassName}
			style={{ width, height: halfWidth }}
			onClick={onToggle}
		>
			<span className="ToggleButton__value ToggleButton__value-checked">
				{checkedValue}
			</span>
			<span className="ToggleButton__value ToggleButton__value-un-checked">
				{unCheckedValue}
			</span>
			<div
				className={buttonClassName}
				style={{
					width: halfWidth - 2,
					height: halfWidth - 2,
					left: isCheck ? halfWidth : 0,
				}}
			/>
		</div>
	);
}

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

export default ToggleButton;