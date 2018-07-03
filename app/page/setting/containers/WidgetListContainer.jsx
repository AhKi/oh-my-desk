import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import WidgetList from 'setting/components/WidgetList';
import GNBWrapper from 'setting/components/GlobalNavigationBar/GNBWrapper';
import {
  modalOpen,
  modalClose,
} from 'store/modal/actions';
import {
  currentPageSelector,
  filterSelector,
  selectedIdSelector,
} from 'store/setting/selectors';
import {
  getWidgetArray,
  getSelectedWidget,
} from 'store/widgets/selectors';
import {
  closeTargetWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} from 'actions/widget';
import {
  settingSelectWidget,
} from 'actions/setting';

const mapStateToProps = state => ({
  currentPage: currentPageSelector(state),
  filter: filterSelector(state),
  list: getWidgetArray(state),
  selectedId: selectedIdSelector(state),
  selectedWidget: getSelectedWidget(state),
});

const mapDispatchToProps = {
  onCloseWidget: closeTargetWidget,
  onModalClose: modalClose,
  onModalOpen: modalOpen,
  onOpenWidget: showTargetWidget,
  onSelectItem: settingSelectWidget,
  onUpdateWidgetInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(GNBWrapper(WidgetList)));
