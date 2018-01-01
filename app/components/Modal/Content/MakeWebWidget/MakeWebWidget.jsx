import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	onModalClose: PropTypes.func,
};

const defaultProps = {
	onModalClose() {},
};

class MakeWebWidget extends React.Component {
	render() {
		const { onModalClose } = this.props;

		return (
			<div>
				<p>웹 위젯 이름</p>
				<input type="text" />
				<p>웹 위젯 URL</p>
				<input type="text" />
				<button
					type="button"
				>
					만들기
				</button>
				<button
					type="button"
					onClick={onModalClose}
				>
					닫기
				</button>
			</div>
		);
	}
}

MakeWebWidget.propTypes = propTypes;
MakeWebWidget.defaultProps = defaultProps;

export default MakeWebWidget;