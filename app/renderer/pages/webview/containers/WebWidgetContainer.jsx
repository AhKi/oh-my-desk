import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { getIndividualInfo } from 'store/reducers/share/identification/selectors';
import { defaultUserAgentSelector } from 'store/reducers/share/config/selectors';
import { updateTargetWidgetInfo } from 'actions/widget';
import { openPreference } from 'actions/status';
import WebWidget from '../components/WebWidget';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
  defaultUserAgent: defaultUserAgentSelector(state),
});

const mapDispatchToProps = {
  onUpdateInfo: updateTargetWidgetInfo,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
