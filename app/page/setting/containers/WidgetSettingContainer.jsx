import { connect } from 'react-redux';
import WidgetSetting from 'setting/components/WidgetSetting';
import GNBWrapper from 'setting/components/GlobalNavigationBar/GNBWrapper';
import { getSelectedWidget } from 'setting/store/widget/selectors';
import { widgetInfoUpdateWithIPC } from 'setting/store/widget/actions';
import { modalOpen } from 'setting/store/modal/actions';

const mapStateToProps = state => ({
  item: getSelectedWidget(state),
});
const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onStoreWidgetInfo: widgetInfoUpdateWithIPC,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));
