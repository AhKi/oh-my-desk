import { connect } from 'react-redux';
import WidgetList from 'components/WidgetList/index';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper/index';
import {
  widgetChangeCurrentPage,
  widgetListInfoStore,
  widgetListSelect,
  widgetInfoUpdateWithIPC,
  widgetSelectFilter,
} from 'store/widget/actions';
import {
  modalOpen,
  modalClose,
} from 'store/modal/actions';
import {
  currentPageSelector,
  filterSelector,
  selectedIdSelector,
  getSelectedWidget,
  getNumberOfItemFilteredList,
  getWidgetFilteredListInPage,
} from 'store/widget/selectors';

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
