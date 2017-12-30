import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const propTypes = {
	children: PropTypes.element.isRequired,
};

function App(props) {
	return (
		<div className="App__container">
			{props.children}
		</div>
	);
}

App.propTypes = propTypes;

export default App;