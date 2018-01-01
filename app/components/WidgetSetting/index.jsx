import React from 'react';
import PropTypes from 'prop-types';
import * as TYPES from 'store/actionTypes';
import WidgetListBox from 'components/ListBox';
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
	onModalOpen: PropTypes.func,
	onStoreWidgetInfo: PropTypes.func,
	onSelectItem: PropTypes.func,
};

const defaultProps = {
	list: [],
	selectedId: '',
	onModalOpen() {},
	onStoreWidgetInfo() {},
	onSelectItem() {},
};

class WidgetSetting extends React.Component {
	constructor(props) {
		super(props);
		this.handleOpenModal = this.handleOpenModal.bind(this);
	}

	componentDidMount() {
		window.ipcRenderer.send(TYPES.WIDGET_INFO_REQUEST);
		window.ipcRenderer.on(TYPES.WIDGET_INFO_RESULT,
			(response, result) => this.props.onStoreWidgetInfo(result),
		);
	}

	handleOpenModal() {
		this.props.onModalOpen(MODAL.MAKE_WEB_WIDGET);
	}

	render() {
		const { list, selectedId, onSelectItem } = this.props;

		return (
			<div>
				<p>위젯 목록</p>
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
					+ 새 위젯 추가하기
				</button>
				<p>위젯 설정</p>
			</div>
		);
	}
}

WidgetSetting.propTypes = propTypes;
WidgetSetting.defaultProps = defaultProps;

export default WidgetSetting;