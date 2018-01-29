import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ListItem from 'components/ListItem';
import './ListBox.scss';

const propTypes = {
	list: PropTypes.array, // eslint-disable-line
	selectedId: PropTypes.string,
	onSelectItem: PropTypes.func,
};

const defaultProps = {
	list: [],
	selectedId: '',
	onSelectItem() {},
};

class ListBox extends React.Component {
	render() {
		const { list, selectedId, onSelectItem } = this.props;
		const listBoxClassName = cx('ListBox');

		return (
			<ul className={listBoxClassName}>
				{list.map(item => (<ListItem
					key={item.id}
					item={item}
					selectedId={selectedId}
					onSelectItem={onSelectItem}
				/>))}
			</ul>
		);
	}
}

ListBox.propTypes = propTypes;
ListBox.defaultProps = defaultProps;

export default ListBox;
