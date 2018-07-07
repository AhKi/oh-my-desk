import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { getIndividualInfo } from 'store/widgets/selectors';
import { updateTargetWidgetInfo } from 'actions/widget';
import WebWidget from './WebWidget';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
});

const mapDispatchToProps = {
  onUpdateInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
