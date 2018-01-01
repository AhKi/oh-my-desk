import React from 'react';
import PropTypes from 'prop-types';
import deleteWidget from 'utils/deleteWidget';

const propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	onClose: PropTypes.func,
};

const defaultProps = {
	id: '',
	name: '',
	onClose() {},
};

class DeleteConfirmWidget extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteWidget = this.handleDeleteWidget.bind(this);
	}

	handleDeleteWidget() {
		deleteWidget(this.props.id);
		this.props.onClose();
	}

	render() {
		const { name, onClose } = this.props;

		return (
			<div>
				<h5>삭제 확인</h5>
				<p>정말로 {'"'}{name}{'"'} 위젯을 삭제하시겠습니까?</p>
				<button
					type="button"
					onClick={this.handleDeleteWidget}
				>
					삭제
				</button>
				<button
					type="button"
					onClick={onClose}
				>
					닫기
				</button>
			</div>
		);
	}
}

DeleteConfirmWidget.propTypes = propTypes;
DeleteConfirmWidget.defaultProps = defaultProps;

export default DeleteConfirmWidget;