import { connect } from 'react-redux';
import WidgetSetting from 'components/WidgetSetting/index';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper/index';
import { getSelectedWidget } from 'store/widget/selectors';
import { widgetInfoUpdateWithIPC } from 'store/widget/actions';
import { modalOpen } from 'store/modal/actions';

const mapStateToProps = state => ({
  item: getSelectedWidget(state),
});
const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onStoreWidgetInfo: widgetInfoUpdateWithIPC,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));
