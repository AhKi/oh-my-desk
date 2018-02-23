import React from 'react';
import PropTypes from 'prop-types';
import Header from 'setting/components/Header';
import Pagination from 'setting/components/Pagination';
import Select from 'setting/components/Select';
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
  totalNumber: PropTypes.number,
  onModalOpen: PropTypes.func,
  onStoreWidgetInfo: PropTypes.func,
  onSelectFilter: PropTypes.func,
  onSelectItem: PropTypes.func,
  onSelectPage: PropTypes.func,
  onUpdateInfoWithIPC: PropTypes.func,
};

const defaultProps = {
  currentPage: 1,
  filter: FILTER.LATEST,
  list: [],
  selectedId: '',
  totalNumber: 0,
  onModalOpen() {},
  onStoreWidgetInfo() {},
  onSelectFilter() {},
  onSelectItem() {},
  onSelectPage() {},
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
      totalNumber,
      onSelectPage,
      onUpdateInfoWithIPC,
      onModalOpen,
    } = this.props;
    const filterList = [FILTER.LATEST, FILTER.OLDEST, FILTER.ACTIVATED];
    const maxPage = Math.ceil(totalNumber / CONST.NUMBER_PER_PAGE);

    return (
      <div className="WidgetList">
        <Header>
          <h6>Widget manage</h6>
        </Header>
        <div className="WidgetList__content">
          <div className="WidgetList__content-header space-5x">
            <p>Activated widget</p>
            <Select
              items={filterList}
              value={filter}
              onChange={this.handleSelectFilter}
              className="Select"
            />
          </div>
          <WidgetListBox
            list={list}
            selectedId={selectedId}
            onSelectItem={this.handleSelectItem}
            onUpdateInfoWithIPC={onUpdateInfoWithIPC}
            onModalOpen={onModalOpen}
          />
          <div className="WidgetList__btn-box">
            <button
              className="Btn Btn--primary Btn--md"
              type="button"
              onClick={this.handleOpenModal}
            >
              <b>+ Add New Widget</b>
            </button>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          maxPage={maxPage}
          onPageClick={onSelectPage}
        />
      </div>
    );
  }
}

WidgetList.propTypes = propTypes;
WidgetList.defaultProps = defaultProps;

export default WidgetList;
