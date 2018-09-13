import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import toJS from 'renderer/components/toJS';
import {
  setLanguageEnglish,
  setLanguageKorean,
  toggleOpenAppWhenLogin,
  toggleOpenWidgetWhenStart,
  toggleWidgetDefaultUserAgent,
} from 'actions/setting';
import {
  defaultUserAgentSelector,
  languageSelector,
} from 'store/reducers/share/config/selectors';
import {
  isOpenWidgetWhenStartSelector,
  isLaunchAppWhenLoginSelector,
} from 'store/reducers/share/status/selectors';
import { modalOpen } from 'actions/modal';
import Setting from '../components/Setting';

const mapStateToProps = state => ({
  language: languageSelector(state),
  isOpenWidgetWhenStart: isOpenWidgetWhenStartSelector(state),
  isLaunchAppWhenLogin: isLaunchAppWhenLoginSelector(state),
  defaultUserAgent: defaultUserAgentSelector(state),
});
const mapDispatchToProps = {
  onModalOpen: modalOpen,
  onSetLanguageEnglish: setLanguageEnglish,
  onSetLanguageKorean: setLanguageKorean,
  onToggleOpenWidgetWhenStart: toggleOpenWidgetWhenStart,
  onToggleOpenAppWhenLogin: toggleOpenAppWhenLogin,
  onToggleWidgetDefaultUserAgent: toggleWidgetDefaultUserAgent,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toJS(Setting)));
