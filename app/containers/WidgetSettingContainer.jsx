import { connect } from 'react-redux';
import WidgetSetting from 'components/WidgetSetting';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';
import {
  widgetListInfoStore,
  widgetListSelect,
  widgetInfoUpdateWithIPC,
} from 'store/widget/actions';
import {
  modalOpen,
  modalClose,
} from 'store/modal/actions';

import {
  selectedIdSelector,
  getSelectedWidget,
  getWidgetInfo,
} from 'store/widget/selectors';

const mapStateToProps = state => ({
  list: getWidgetInfo(state),
  selectedId: selectedIdSelector(state),
  selectedWidget: getSelectedWidget(state),
});

const mapDispatchToProps = {
  onModalClose: modalClose,
  onModalOpen: modalOpen,
  onStoreWidgetInfo: widgetListInfoStore,
  onSelectItem: widgetListSelect,
  onUpdateInfoWithIPC: widgetInfoUpdateWithIPC,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));
