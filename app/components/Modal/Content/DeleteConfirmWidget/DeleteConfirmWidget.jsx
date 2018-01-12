import React from 'react';
import PropTypes from 'prop-types';
import deleteWidget from 'utils/deleteWidget';
import './DeleteConfirmWidget.scss';

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
			<div className="DeleteConfirmWidget">
				<h5 className="DeleteConfirmWidget__title">삭제 확인</h5>
				<p className="DeleteConfirmWidget__content">
					정말로 <b>{'"'}{name}{'"'}</b> 위젯을 삭제하시겠습니까?
				</p>
				<div className="DeleteConfirmWidget__button-set">
					<button
						className="Btn Btn--primary Btn-middle"
						type="button"
						onClick={this.handleDeleteWidget}
					>
						삭제
					</button>
					<button
						className="Btn Btn-middle"
						type="button"
						onClick={onClose}
					>
						닫기
					</button>
				</div>
			</div>
		);
	}
}

DeleteConfirmWidget.propTypes = propTypes;
DeleteConfirmWidget.defaultProps = defaultProps;

export default DeleteConfirmWidget;
