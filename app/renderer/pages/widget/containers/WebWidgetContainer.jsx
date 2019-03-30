import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { getIndividualInfo } from 'store/reducers/share/identification/selectors';
import { defaultUserAgentSelector } from 'store/reducers/share/config/selectors';
import {
  widgetEditCancel,
  widgetMakeRequest,
  widgetUpdateInfo,
  widgetUrlValidCheck,
} from 'actions/widget';
import WebWidget from '../components/WebWidget';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
  defaultUserAgent: defaultUserAgentSelector(state),
});

const mapDispatchToProps = {
  onCancelEditWidget: widgetEditCancel,
  onCheckUrlValidation: widgetUrlValidCheck,
  onMakeWidget: widgetMakeRequest,
  onUpdateInfo: widgetUpdateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
