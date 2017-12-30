import React from 'react';
import PropTypes from 'prop-types';
import GlobalNavigationBarContainer from 'containers/GloablNavigationBarContainer';
import './style.scss';

const propTypes = {
	children: PropTypes.element.isRequired,
};

function App(props) {
	return (
		<div className="App__container">
			<GlobalNavigationBarContainer />
			{props.children}
		</div>
	);
}

App.propTypes = propTypes;

export default App;