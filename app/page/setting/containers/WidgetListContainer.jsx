import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import WidgetList from 'setting/components/WidgetList';
import GNBWrapper from 'setting/components/GlobalNavigationBar/GNBWrapper';
import {
  modalOpen,
  modalClose,
} from 'actions/modal';
import {
  selectedIdSelector,
} from 'store/personal/setting/selectors';
import {
  getWidgetArray,
  getSelectedWidget,
} from 'store/share/widgets/selectors';
import {
  closeTargetWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} from 'actions/widget';
import {
  settingSelectWidget,
} from 'actions/setting';

const mapStateToProps = state => ({
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
