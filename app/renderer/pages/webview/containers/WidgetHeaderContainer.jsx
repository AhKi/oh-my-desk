import { connect } from 'react-redux';
import { updateTargetWidgetInfo } from 'actions/widget/index';
import { modalOpen } from 'actions/modal/index';
import WidgetHeader from '../components/WidgetHeader/index';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onUpdateWidgetInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);
