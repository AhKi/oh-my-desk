import React from 'react';
import PropTypes from 'prop-types';
import * as IPC from 'constants/ipc';
import WidgetListBox from 'components/ListBox';
import WidgetInfo from 'components/WidgetInfo';
import * as MODAL from 'constants/modal';
import './WidgetSetting.scss';

const propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
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
	),
	selectedId: PropTypes.string,
	selectedWidget: PropTypes.shape({
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
	onStoreWidgetInfo: PropTypes.func,
	onSelectItem: PropTypes.func,
	onUpdateInfoWithIPC: PropTypes.func,
};

const defaultProps = {
	list: [],
	selectedId: '',
	selectedWidget: {},
	onModalOpen() {},
	onStoreWidgetInfo() {},
	onSelectItem() {},
	onUpdateInfoWithIPC() {},
};

class WidgetSetting extends React.Component {
	constructor(props) {
		super(props);
		this.handleOpenModal = this.handleOpenModal.bind(this);
	}

	componentDidMount() {
		window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
		window.ipcRenderer.on(IPC.WIDGET_INFO_RESULT,
			(response, result) => this.props.onStoreWidgetInfo(result),
		);
	}

	handleOpenModal() {
		this.props.onModalOpen(MODAL.MAKE_WEB_WIDGET);
	}

	render() {
		const {
			list,
			selectedId,
			selectedWidget,
			onModalOpen,
			onSelectItem,
			onUpdateInfoWithIPC,
		} = this.props;

		return (
			<div className="WidgetSetting">
				<div className="WidgetSetting__list">
					<h4>위젯 목록</h4>
					<WidgetListBox
						list={list}
						selectedId={selectedId}
						onSelectItem={onSelectItem}
					/>
					<button
						className="WidgetSetting__add-btn"
						type="button"
						onClick={this.handleOpenModal}
					>
						<b><i className="fa fa-plus-square-o fa-lg" /> 새 위젯 추가하기</b>
					</button>
				</div>
				<div className="WidgetSetting__box">
					<h3 className="WidgetSetting__title">
						{selectedWidget && selectedWidget.type.toUpperCase()} 위젯 설정
					</h3>
					<WidgetInfo
						info={selectedWidget}
						onModalOpen={onModalOpen}
						onUpdateInfoWithIPC={onUpdateInfoWithIPC}
					/>
				</div>
			</div>
		);
	}
}

WidgetSetting.propTypes = propTypes;
WidgetSetting.defaultProps = defaultProps;

export default WidgetSetting;
