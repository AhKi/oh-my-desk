import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import { Link } from 'react-router-dom';

const propTypes = {

};

class GlobalNavigationBar extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li>
						<Link to="/Setting">전체 설정</Link>
					</li>
					<li>
						<Link to="/widget-list">위젯</Link>
					</li>
					<li>
						<Link to="/widget-store">스토어</Link>
					</li>
				</ul>
			</div>
		);
	}
}

GlobalNavigationBar.propTypes = propTypes;

export default GlobalNavigationBar;