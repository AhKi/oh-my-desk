import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { getIndividualInfo } from 'store/reducers/share/identification/selectors';
import { defaultUserAgentSelector } from 'store/reducers/share/config/selectors';
import { widgetUpdateInfo } from 'actions/widget';
import { preferenceOpen } from 'actions/preference';
import WebWidget from '../components/WebWidget';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
  defaultUserAgent: defaultUserAgentSelector(state),
});

const mapDispatchToProps = {
  onUpdateInfo: widgetUpdateInfo,
  onOpenPreference: preferenceOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WebWidget));
