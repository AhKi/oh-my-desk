import { connect } from 'react-redux';
import WidgetList from 'setting/components/WidgetList';
import GNBWrapper from 'setting/components/GlobalNavigationBar/GNBWrapper';
import {
  widgetChangeCurrentPage,
  widgetListInfoStore,
  widgetListSelect,
  widgetInfoUpdateWithIPC,
  widgetSelectFilter,
} from 'setting/store/widget/actions';
import {
  modalOpen,
  modalClose,
} from 'setting/store/modal/actions';
import {
  currentPageSelector,
  filterSelector,
  selectedIdSelector,
  getSelectedWidget,
  getNumberOfItemFilteredList,
  getWidgetFilteredListInPage,
} from 'setting/store/widget/selectors';

const mapStateToProps = state => ({
  currentPage: currentPageSelector(state),
  filter: filterSelector(state),
  list: getWidgetFilteredListInPage(state),
  selectedId: selectedIdSelector(state),
  selectedWidget: getSelectedWidget(state),
  totalNumber: getNumberOfItemFilteredList(state),
});

const mapDispatchToProps = {
  onModalClose: modalClose,
  onModalOpen: modalOpen,
  onSelectFilter: widgetSelectFilter,
  onSelectPage: widgetChangeCurrentPage,
  onStoreWidgetInfo: widgetListInfoStore,
  onSelectItem: widgetListSelect,
  onUpdateInfoWithIPC: widgetInfoUpdateWithIPC,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetList));
