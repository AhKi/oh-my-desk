import { connect } from 'react-redux';
import { updateTargetWidgetInfo } from 'actions/widget';
import { modalOpen } from 'actions/modal';
import WidgetHeader from '../components/WidgetHeader';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onUpdateWidgetInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);
