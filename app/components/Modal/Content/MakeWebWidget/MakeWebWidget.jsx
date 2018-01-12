import React from 'react';
import PropTypes from 'prop-types';
import createWidget from 'utils/createWidget';
import './MakeWebWidget.scss';

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
			<div className="MakeWebWidget">
				<h5 className="MakeWebWidget__title">웹 위젯 만들기</h5>
				<div className="Card">
					<p className="Card__content">웹 위젯을 만듭니다.<br />이름, 만들고자하는 URL을 입력하세요.</p>
					<p className="Card__content--postscript">
						* URL정보는 브라우저 주소표시줄에서 <br />복사/붙여넣기 하시는게 간편합니다.
					</p>
				</div>
				<div className="InputSet">
					<p className="InputSet__label">웹 위젯 이름</p>
					<input
						className="InputSet__text-input"
						type="text"
						placeholder="web widget name"
						value={widgetName}
						onChange={this.handleWidgetNameChange}
					/>
				</div>
				<div className="InputSet">
					<p className="InputSet__label">웹 위젯 URL</p>
					<input
						className="InputSet__text-input"
						type="text"
						placeholder="ex) https://www.google.com"
						value={widgetUrl}
						onChange={this.handleWidgetUrlChange}
					/>
				</div>
				<div className="MakeWebWidget__button-set">
					<button
						className="Btn Btn--primary Btn-middle"
						type="button"
						onClick={this.handleCreateWidget}
					>
						만들기
					</button>
					<button
						className="Btn Btn-middle"
						type="button"

						onClick={onModalClose}
					>
						닫기
					</button>
				</div>
			</div>
		);
	}
}

MakeWebWidget.propTypes = propTypes;
MakeWebWidget.defaultProps = defaultProps;

export default MakeWebWidget;
