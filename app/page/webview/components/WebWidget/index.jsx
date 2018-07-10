import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { getIndividualInfo } from 'store/share/widgets/selectors';
import { updateTargetWidgetInfo } from 'actions/widget';
import { openPreference } from 'actions/status';
import WebWidget from './WebWidget';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
});

const mapDispatchToProps = {
  onUpdateInfo: updateTargetWidgetInfo,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
