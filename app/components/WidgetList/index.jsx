import React from 'react';
import PropTypes from 'prop-types';
import * as IPC from 'constants/ipc';
import Header from 'components/Header';
import WidgetListBox from 'components/ListBox';
import * as MODAL from 'constants/modal';
import './WidgetList.scss';

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

class WidgetList extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  componentDidMount() {
    window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
    window.ipcRenderer.on(IPC.WIDGET_INFO_RESULT,
      (response, result) => this.props.onStoreWidgetInfo(result));
  }

  handleOpenModal() {
    this.props.onModalOpen(MODAL.MAKE_WEB_WIDGET);
  }

  handleSelectItem(id) {
    window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
    this.props.onSelectItem(id);
  }

  render() {
    const {
      list,
      selectedId,
    } = this.props;

    return (
      <div className="WidgetList">
        <Header>
          <h1>Widget manage</h1>
        </Header>
        <div className="WidgetList__content">
          <div className="WidgetList__content-header">
            <h4>widget</h4>
          </div>
          <WidgetListBox
            list={list}
            selectedId={selectedId}
            onSelectItem={this.handleSelectItem}
          />
          <button
            className="WidgetList__add-btn"
            type="button"
            onClick={this.handleOpenModal}
          >
            <b><i className="fa fa-plus-square-o fa-lg" /> Add New Widget</b>
          </button>
        </div>
      </div>
    );
  }
}

WidgetList.propTypes = propTypes;
WidgetList.defaultProps = defaultProps;

export default WidgetList;
