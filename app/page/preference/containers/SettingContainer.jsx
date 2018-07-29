import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toJS from 'utils/toJS';
import {
  setLanguageEnglish,
  setLanguageKorean,
  toggleAutoLaunch,
  toggleWidgetMode,
} from 'actions/status';
import {
  autoLaunchSelector,
  langSelector,
  widgetModeSelector,
} from 'store/share/status/selectors';
import Setting from '../components/Setting';

const mapStateToProps = state => ({
  lang: langSelector(state),
  isAutoLaunch: autoLaunchSelector(state),
  widgetMode: widgetModeSelector(state),
});
const mapDispatchToProps = {
  onSetLanguageEnglish: setLanguageEnglish,
  onSetLanguageKorean: setLanguageKorean,
  onToggleAutoLaunch: toggleAutoLaunch,
  onToggleWidgetMode: toggleWidgetMode,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(Setting)));
