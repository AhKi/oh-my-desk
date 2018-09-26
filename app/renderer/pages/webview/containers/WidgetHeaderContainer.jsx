import { connect } from 'react-redux';
import {
  widgetClose,
  widgetMakeRequest,
  widgetUpdateInfo,
} from 'actions/widget';
import { modalOpen } from 'actions/modal';
import WidgetHeader from '../components/WidgetHeader';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onMakeWidget: widgetMakeRequest,
  onCloseWidget: widgetClose,
  onModalOpen: modalOpen,
  onUpdateWidgetInfo: widgetUpdateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);
