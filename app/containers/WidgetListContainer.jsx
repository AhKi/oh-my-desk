import { connect } from 'react-redux';
import WidgetList from 'components/WidgetList';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';
import {
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
  filterSelector,
  selectedIdSelector,
  getSelectedWidget,
  getWidgetFilteredListInPage,
} from 'store/widget/selectors';

const mapStateToProps = state => ({
  filter: filterSelector(state),
  list: getWidgetFilteredListInPage(state),
  selectedId: selectedIdSelector(state),
  selectedWidget: getSelectedWidget(state),
});

const mapDispatchToProps = {
  onModalClose: modalClose,
  onModalOpen: modalOpen,
  onSelectFilter: widgetSelectFilter,
  onStoreWidgetInfo: widgetListInfoStore,
  onSelectItem: widgetListSelect,
  onUpdateInfoWithIPC: widgetInfoUpdateWithIPC,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetList));
