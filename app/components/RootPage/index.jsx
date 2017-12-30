import React from 'react';
import { Link } from 'react-router-dom';

function RootPage() {
	return (
		<div>
			<h2>HomePage</h2>
			<Link to="/counter">to Counter</Link>
		</div>
	);
}

export default RootPage;