import React from 'react';
import PropTypes from 'prop-types';
import * as MODAL from 'constants/modal';

const propTypes = {
	info: PropTypes.shape({
		favicon: PropTypes.string,
		id: PropTypes.string,
		isActive: PropTypes.bool,
		isIcon: PropTypes.bool,
		isOnTop: PropTypes.bool,
		name: PropTypes.string,
		position: PropTypes.shape({
			x: PropTypes.number,
			y: PropTypes.number,
		}),
		size: PropTypes.shape({
			height: PropTypes.number,
			width: PropTypes.number,
		}),
		transparency: PropTypes.number,
		type: PropTypes.string,
		url: PropTypes.string,
	}),
	onModalOpen: PropTypes.func,
};

const defaultProps = {
	info: {},
	onModalOpen() {},
};

class WidgetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: props.info, // eslint-disable-line
		};
		this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
	}

	handleDeleteConfirm() {
		const { info, onModalOpen } = this.props;

		onModalOpen(MODAL.DELETE_CONFIRM_WIDGET, {
			id: info.id,
			name: info.name,
		});
	}

	render() {
		const { info } = this.props;
		console.log(info);
		if (!info) {
			return <div>위젯을 선택해 주세요.</div>;
		}

		return (
			<div>
				<p>활성화</p>
				<p>항상 위</p>
				<p>이름</p>
				<p>타입</p>
				<p>URL</p>
				<div>
					<p>위치</p>
					<p>X 좌표</p>
					<p>Y 좌표</p>
				</div>
				<div>
					<p>크기</p>
					<p>너비</p>
					<p>높이</p>
				</div>
				<button
					type="button"
				>
					수정하기
				</button>
				<button
					type="button"
					onClick={this.handleDeleteConfirm}
				>
					삭제하기
				</button>
			</div>
		);
	}
}

WidgetInfo.propTypes = propTypes;
WidgetInfo.defaultProps = defaultProps;

export default WidgetInfo;