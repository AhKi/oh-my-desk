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
			<form className="MakeWebWidget">
				<h5 className="MakeWebWidget__title">Make Web Widget</h5>
				<div className="Card">
					<p className="Card__content">Make web widget.<br />Please enter name and URL</p>
					<p className="Card__content--postscript">
						* URL information is easy to copy / paste from browser address bar.
					</p>
				</div>
				<div className="InputSet">
					<p className="InputSet__label">Widget Name</p>
					<input
						className="InputSet__text-input"
						type="text"
						placeholder="web widget name"
						value={widgetName}
						onChange={this.handleWidgetNameChange}
					/>
				</div>
				<div className="InputSet">
					<p className="InputSet__label">Widget URL</p>
					<input
						className="InputSet__text-input"
						type="text"
						placeholder="ex) https://www.google.com"
						value={widgetUrl}
						onChange={this.handleWidgetUrlChange}
					/>
				</div>
				<div className="MakeWebWidget__button-set">
					<input
						className="Btn Btn--primary Btn-middle"
						type="submit"
						onClick={this.handleCreateWidget}
						value="Make"
					/>
					<button
						className="Btn Btn-middle"
						type="button"

						onClick={onModalClose}
					>
						Close
					</button>
				</div>
			</form>
		);
	}
}

MakeWebWidget.propTypes = propTypes;
MakeWebWidget.defaultProps = defaultProps;

export default MakeWebWidget;
