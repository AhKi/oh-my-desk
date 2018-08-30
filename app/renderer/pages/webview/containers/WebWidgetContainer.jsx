import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { getIndividualInfo } from 'store/share/widgets/selectors';
import { widgetModeSelector } from 'store/share/status/selectors';
import { updateTargetWidgetInfo } from 'actions/widget/index';
import { openPreference } from 'actions/status/index';
import WebWidget from '../components/WebWidget/index';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
  defaultMode: widgetModeSelector(state),
});

const mapDispatchToProps = {
  onUpdateInfo: updateTargetWidgetInfo,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
