import React from 'react';
import PropTypes from 'prop-types';
import * as MODAL from 'constants/modal';
import ToggleButtonWithLabel from '../WidgetSetting/components/ToggleButtonWithLabel';
import InputWithLabel from '../WidgetSetting/components/InputWithLabel';
import './WidgetInfo.scss';

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

	handleEditWidget(e) {
		e.preventDefault();
		this.invisibleInput.focus();
		this.props.onUpdateInfoWithIPC(this.props.info.id, this.state.info);
		this.props.onModalOpen('CONFIRM', {
			title: 'Success',
			content: 'Widget Setting is Changed.',
		});
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
			return <div>Select Widget or Make Widget.</div>;
		}

		return (
			<div className="WidgetInfo">
				<div className="WidgetInfo__Toggle-box">
					<div className="WidgetInfo__Card WidgetInfo__content-small">
						<ToggleButtonWithLabel
							isCheck={info.isActive}
							label="Active"
							onToggle={this.handleToggleActive}
						/>
					</div>
					<div className="WidgetInfo__Card WidgetInfo__content-small">
						<ToggleButtonWithLabel
							isCheck={info.isOnTop}
							label="Always Top"
							onToggle={this.handleToggleOnTop}
						/>
					</div>
				</div>
				<input
					type="text"
					ref={(ref) => { this.invisibleInput = ref; }}
					style={{ width: 0, height: 0 }}
				/>
				<form onSubmit={this.handleEditWidget}>
					<div className="WidgetInfo__Card WidgetInfo__content-name">
						<InputWithLabel
							className="WidgetInfo__input"
							label="Name"
							value={this.state.info.name}
							onChange={this.handleChangeName}
						/>
					</div>
					<div className="WidgetInfo__Card WidgetInfo__content-url">
						<InputWithLabel
							className="WidgetInfo__input"
							label="URL"
							value={this.state.info.url}
							onChange={this.handleChangeUrl}
						/>
					</div>
					<div className="WidgetInfo__content-position">
						<h5 className="WidgetInfo__sub-title">Position</h5>
						<div className="WidgetInfo__Card WidgetInfo__Card-center">
							<InputWithLabel
								label="X location"
								type="number"
								value={this.state.info.position.x}
								onChange={this.handleChangePositionX}
							/>
							<InputWithLabel
								label="Y location"
								type="number"
								value={this.state.info.position.y}
								onChange={this.handleChangePositionY}
							/>
						</div>
					</div>
					<div className="WidgetInfo__content-size">
						<h5 className="WidgetInfo__sub-title">Size</h5>
						<div className="WidgetInfo__Card WidgetInfo__Card-center">
							<InputWithLabel
								label="width"
								type="number"
								value={this.state.info.size.width}
								onChange={this.handleChangeSizeWidth}
							/>
							<InputWithLabel
								label="height"
								type="number"
								value={this.state.info.size.height}
								onChange={this.handleChangeSizeHeight}
							/>
						</div>
					</div>
					<div className="WidgetInfo__button-box">
						<input
							className="Btn Btn--primary"
							type="submit"
							value="Edit Widget Info"
						/>
						<button
							className="Btn"
							type="button"
							onClick={this.handleDeleteConfirm}
						>
							Delete Widget
						</button>
					</div>
				</form>
			</div>
		);
	}
}

WidgetInfo.propTypes = propTypes;
WidgetInfo.defaultProps = defaultProps;

export default WidgetInfo;
