import React from 'react';
import PropTypes from 'prop-types';
import createWidget from 'utils/createWidget';

const propTypes = {
	onModalClose: PropTypes.func,
};

const defaultProps = {
	onModalClose() {},
};

class MakeWebWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			widgetName: '',
			widgetUrl: '',
		};
		this.handleCreateWidget = this.handleCreateWidget.bind(this);
		this.handleWidgetNameChange = this.handleWidgetNameChange.bind(this);
		this.handleWidgetUrlChange = this.handleWidgetUrlChange.bind(this);
	}

	handleCreateWidget() {
		createWidget('web', {
			name: this.state.widgetName,
			url: this.state.widgetUrl,
		});
		this.props.onModalClose();
	}

	handleWidgetNameChange(e) {
		this.setState({ widgetName: e.target.value });
	}

	handleWidgetUrlChange(e) {
		this.setState({ widgetUrl: e.target.value });
	}

	render() {
		const { onModalClose } = this.props;
		const { widgetName, widgetUrl } = this.state;

		return (
			<div>
				<p>웹 위젯 이름</p>
				<input
					type="text"
					value={widgetName}
					onChange={this.handleWidgetNameChange}
				/>
				<p>웹 위젯 URL</p>
				<input
					type="text"
					value={widgetUrl}
					onChange={this.handleWidgetUrlChange}
				/>
				<button
					type="button"
					onClick={this.handleCreateWidget}
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