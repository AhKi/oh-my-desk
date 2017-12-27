import React from 'react';
import './style.scss';

function App(props) {
	return (
		<div className="App__container">
			{props.children}
		</div>
	);
}

export default App;