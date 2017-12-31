import React from 'react';
import GlobalNavigationBar from '../';
import './GNBWrapper.scss';

function GNBWrapper(WrappedComponent) {
	return function WrappedFunction(props) {
		return (
			<div className="GNBWrapper">
				<GlobalNavigationBar {...props} />
				<WrappedComponent {...props} />
			</div>
		);
	};
}

export default GNBWrapper;