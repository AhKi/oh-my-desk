import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './ListItem.scss';

const propTypes = {
	item: PropTypes.object, // eslint-disable-line
	selectedId: PropTypes.string,
	onSelectItem: PropTypes.func,
};

const defaultProps = {
	item: {},
	selectedId: '',
	onSelectItem() {},
};

class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelectList = this.handleSelectList.bind(this);
	}

	handleSelectList() {
		this.props.onSelectItem(this.props.item.id);
	}

	render() {
		const { item, selectedId } = this.props;
		const itemClassName = cx('list-group-item-dark', 'ListItem', {
			active: item.id === selectedId,
		});

		return (
			<li className={itemClassName}>
				<button
					className="ListItem__button"
					type="button"
					onClick={this.handleSelectList}
				>
					{item.name}
				</button>
			</li>
		);
	}
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;