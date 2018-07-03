import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import WidgetSetting from 'setting/components/WidgetSetting';
import GNBWrapper from 'setting/components/GlobalNavigationBar/GNBWrapper';
import { getSelectedWidget } from 'store/widgets/selectors';
import {
  showTargetWidget,
  closeTargetWidget,
  updateTargetWidgetInfo,
} from 'actions/widget';
import { modalOpen } from 'store/modal/actions';

const mapStateToProps = state => ({
  item: getSelectedWidget(state),
});
const mapDispatchToProps = {
  onCloseWidget: closeTargetWidget,
  onModalOpen: modalOpen,
  onOpenWidget: showTargetWidget,
  onUpdateWidgetInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(GNBWrapper(WidgetSetting)));
