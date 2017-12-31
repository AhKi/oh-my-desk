import React from 'react';
import PropTypes from 'prop-types';
import * as TYPES from 'store/actionTypes';
import WidgetListBox from 'components/ListBox';
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
	onStoreWidgetInfo: PropTypes.func,
};

const defaultProps = {
	list: [],
	onStoreWidgetInfo() {},
};

class WidgetSetting extends React.Component {
	componentDidMount() {
		window.ipcRenderer.send(TYPES.WIDGET_INFO_REQUEST);
		window.ipcRenderer.on(TYPES.WIDGET_INFO_RESULT,
			(response, result) => this.props.onStoreWidgetInfo(result),
		);
	}

	render() {
		const { list } = this.props;

		return (
			<div>
				<p>위젯 목록</p>
				<WidgetListBox list={list} />
				<p>위젯 설정</p>
			</div>
		);
	}
}

WidgetSetting.propTypes = propTypes;
WidgetSetting.defaultProps = defaultProps;

export default WidgetSetting;