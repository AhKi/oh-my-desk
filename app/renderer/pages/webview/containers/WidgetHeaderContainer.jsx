import { connect } from 'react-redux';
import { widgetUpdateInfo } from 'actions/widget';
import { modalOpen } from 'actions/modal';
import WidgetHeader from '../components/WidgetHeader';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onUpdateWidgetInfo: widgetUpdateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);
