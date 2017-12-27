import React from 'react';

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleDecrement = this.handleDecrement.bind(this);
	}

	handleIncrement() {
		this.setState({ value: this.state.value + 1 });
	}

	handleDecrement() {
		this.setState({ value: this.state.value - 1 });
	}

	render() {
		return (
			<div>
				{this.state.value}
				<button
					type="button"
				  onClick={this.handleIncrement}
				>
					Increment
				</button>
				<button
					type="button"
				  onClick={this.handleDecrement}
				>
					Decrement
				</button>
			</div>
		);
	}
}

export default Counter;