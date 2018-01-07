import React from 'react';
import PropTypes from 'prop-types';
import * as MODAL from 'constants/modal';
import ToggleButtonWithLabel from '../WidgetSetting/components/ToggleButtonWithLabel';
import InputWithLabel from '../WidgetSetting/components/InputWithLabel';

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
	onUpdateInfoWithIPC: PropTypes.func,
};

const defaultProps = {
	info: {},
	onModalOpen() {},
	onUpdateInfoWithIPC() {},
};

class WidgetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info: props.info,
		};
		this.setStateInfo = this.setStateInfo.bind(this);
		this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
		this.handleToggleActive = this.handleToggleActive.bind(this);
		this.handleToggleOnTop = this.handleToggleOnTop.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeUrl = this.handleChangeUrl.bind(this);
		this.handleChangePositionX = this.handleChangePositionX.bind(this);
		this.handleChangePositionY = this.handleChangePositionY.bind(this);
		this.handleChangeSizeWidth = this.handleChangeSizeWidth.bind(this);
		this.handleChangeSizeHeight = this.handleChangeSizeHeight.bind(this);
		this.handleEditWidget = this.handleEditWidget.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ info: nextProps.info });
	}

	setStateInfo(key, value) {
		this.setState({
			info: Object.assign({}, this.state.info, {
				[key]: value,
			}),
		});
	}

	handleChangeName(e) {
		this.setStateInfo('name', e.target.value);
	}

	handleChangeUrl(e) {
		this.setStateInfo('url', e.target.value);
	}

	handleChangePositionX(e) {
		this.setState({
			info: Object.assign({}, this.state.info, {
				position: {
					x: Number(e.target.value),
					y: this.state.info.position.y,
				},
			}),
		});
	}

	handleChangePositionY(e) {
		this.setState({
			info: Object.assign({}, this.state.info, {
				position: {
					x: this.state.info.position.x,
					y: Number(e.target.value),
				},
			}),
		});
	}

	handleChangeSizeWidth(e) {
		this.setState({
			info: Object.assign({}, this.state.info, {
				size: {
					width: Number(e.target.value),
					height: this.state.info.size.height,
				},
			}),
		});
	}

	handleChangeSizeHeight(e) {
		this.setState({
			info: Object.assign({}, this.state.info, {
				size: {
					width: this.state.info.size.width,
					height: Number(e.target.value),
				},
			}),
		});
	}

	handleEditWidget() {
		this.props.onUpdateInfoWithIPC(this.props.info.id, this.state.info);
	}

	handleToggleActive() {
		const { info, onUpdateInfoWithIPC } = this.props;

		onUpdateInfoWithIPC(info.id, {
			isActive: !info.isActive,
		});
	}

	handleToggleOnTop() {
		const { info, onUpdateInfoWithIPC } = this.props;

		onUpdateInfoWithIPC(info.id, {
			isOnTop: !info.isOnTop,
		});
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

		if (!info) {
			return <div>위젯을 선택해 주세요.</div>;
		}

		return (
			<div>
				<ToggleButtonWithLabel
					isCheck={info.isActive}
					label="활성화"
					onToggle={this.handleToggleActive}
				/>
				<ToggleButtonWithLabel
					isCheck={info.isOnTop}
					label="항상 위"
					onToggle={this.handleToggleOnTop}
				/>
				<InputWithLabel
					label="이름"
					value={this.state.info.name}
					onChange={this.handleChangeName}
				/>
				<InputWithLabel
					disabled
					label="타입"
					value={info.type}
				/>
				<InputWithLabel
					label="URL"
					value={this.state.info.url}
					onChange={this.handleChangeUrl}
				/>
				<div>
					<p>위치</p>
					<InputWithLabel
						label="X 좌표"
						type="number"
						value={this.state.info.position.x}
						onChange={this.handleChangePositionX}
					/>
					<InputWithLabel
						label="Y 좌표"
						type="number"
						value={this.state.info.position.y}
						onChange={this.handleChangePositionY}
					/>
				</div>
				<div>
					<p>크기</p>
					<InputWithLabel
						label="너비"
						type="number"
						value={this.state.info.size.width}
						onChange={this.handleChangeSizeWidth}
					/>
					<InputWithLabel
						label="높이"
						type="number"
						value={this.state.info.size.height}
						onChange={this.handleChangeSizeHeight}
					/>
				</div>
				<button
					type="button"
					onClick={this.handleEditWidget}
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