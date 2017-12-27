import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="container">
				Hello world
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
);