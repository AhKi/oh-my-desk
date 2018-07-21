import { connect } from 'react-redux';
import {
  toggleAutoLaunch,
  toggleWidgetMode,
} from 'actions/status';
import {
  autoLaunchSelector,
  widgetModeSelector,
} from 'store/share/status/selectors';
import Setting from '../components/Setting';

const mapStateToProps = state => ({
  isAutoLaunch: autoLaunchSelector(state),
  widgetMode: widgetModeSelector(state),
});
const mapDispatchToProps = {
  onToggleAutoLaunch: toggleAutoLaunch,
  onToggleWidgetMode: toggleWidgetMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
