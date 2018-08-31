import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { getIndividualInfo } from 'store/share/widgets/selectors';
import { widgetModeSelector } from 'store/share/status/selectors';
import { updateTargetWidgetInfo } from 'actions/widget';
import { openPreference } from 'actions/status';
import WebWidget from '../components/WebWidget';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
  defaultMode: widgetModeSelector(state),
});

const mapDispatchToProps = {
  onUpdateInfo: updateTargetWidgetInfo,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
