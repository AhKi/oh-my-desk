import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toJS from 'renderer/components/toJS';
import {
  setLanguageEnglish,
  setLanguageKorean,
  toggleAutoActiveWidget,
  toggleAutoLaunch,
  toggleWidgetMode,
} from 'actions/status';
import {
  autoActiveWidgetSelector,
  autoLaunchSelector,
  langSelector,
  widgetModeSelector,
} from 'store/share/status/selectors';
import { modalOpen } from 'actions/modal';
import Setting from '../components/Setting';

const mapStateToProps = state => ({
  lang: langSelector(state),
  isAutoActiveWidget: autoActiveWidgetSelector(state),
  isAutoLaunch: autoLaunchSelector(state),
  widgetMode: widgetModeSelector(state),
});
const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onSetLanguageEnglish: setLanguageEnglish,
  onSetLanguageKorean: setLanguageKorean,
  onToggleAutoActiveWidget: toggleAutoActiveWidget,
  onToggleAutoLaunch: toggleAutoLaunch,
  onToggleWidgetMode: toggleWidgetMode,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(Setting)));
