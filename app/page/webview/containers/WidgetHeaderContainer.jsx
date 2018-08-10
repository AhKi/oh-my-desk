import { connect } from 'react-redux';
import { updateTargetWidgetInfo } from 'actions/widget';
import WidgetHeader from '../components/WidgetHeader';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onUpdateWidgetInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetHeader);
