import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	value: PropTypes.number,
	onIncrement: PropTypes.func,
	onDecrement: PropTypes.func,
};

const defaultProps = {
	value: 0,
	onIncrement() {},
	onDecrement() {},
};

function Counter(props) {
	const { value, onIncrement, onDecrement } = props;

	return (
		<div>
			{value}
			<button
				type="button"
				onClick={onIncrement}
			>
				Increment
			</button>
			<button
				type="button"
				onClick={onDecrement}
			>
				Decrement
			</button>
		</div>
	);
}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default Counter;