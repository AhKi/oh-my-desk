import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import * as CONST from 'constants/index';
import * as FILTER from 'constants/filter';
import * as IPC from 'constants/ipc';
import * as MODAL from 'constants/modal';
import WidgetListBox from './components/WidgetListBox';
import './WidgetList.scss';

const propTypes = {
  currentPage: PropTypes.number,
  filter: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      favicon: PropTypes.string,
      id: PropTypes.string,
      isActive: PropTypes.bool,
      isIcon: PropTypes.bool,
      isOnTop: PropTypes.bool,
      name: PropTypes.string,
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
  onSelectFilter: PropTypes.func,
  onSelectItem: PropTypes.func,
  onUpdateInfoWithIPC: PropTypes.func,
};

const defaultProps = {
  currentPage: 1,
  filter: FILTER.LATEST,
  list: [],
  selectedId: '',
  onModalOpen() {},
  onStoreWidgetInfo() {},
  onSelectFilter() {},
  onSelectItem() {},
  onUpdateInfoWithIPC() {},
};

class WidgetList extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSelectFilter = this.handleSelectFilter.bind(this);
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

  handleSelectFilter(e) {
    this.props.onSelectFilter(e.target.value);
  }

  handleSelectItem(id) {
    window.ipcRenderer.send(IPC.WIDGET_INFO_REQUEST);
    this.props.onSelectItem(id);
  }

  render() {
    const {
      currentPage,
      filter,
      list,
      selectedId,
      onUpdateInfoWithIPC,
      onModalOpen,
    } = this.props;
    const filterList = [FILTER.LATEST, FILTER.OLDEST, FILTER.ACTIVATED];
    const maxPage = Math.ceil(Object.keys(list).length / CONST.NUMBER_PER_PAGE);

    return (
      <div className="WidgetList">
        <Header>
          <h1>Widget manage</h1>
          <Select
            items={filterList}
            value={filter}
            onChange={this.handleSelectFilter}
          />
        </Header>
        <div className="WidgetList__content">
          <div className="WidgetList__content-header">
            <h4>widget</h4>
          </div>
          <WidgetListBox
            list={list}
            selectedId={selectedId}
            onSelectItem={this.handleSelectItem}
            onUpdateInfoWithIPC={onUpdateInfoWithIPC}
            onModalOpen={onModalOpen}
          />
          <button
            className="WidgetList__add-btn"
            type="button"
            onClick={this.handleOpenModal}
          >
            <b>+ Add New Widget</b>
          </button>
        </div>
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
        />
      </div>
    );
  }
}

WidgetList.propTypes = propTypes;
WidgetList.defaultProps = defaultProps;

export default WidgetList;
