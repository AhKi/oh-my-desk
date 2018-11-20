import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import {
  widgetClose,
  widgetEditRequest,
  widgetMakeRequest,
  widgetUpdateInfo,
} from 'actions/widget';
import { getIndividualInfo } from 'store/reducers/share/identification/selectors';
import { defaultUserAgentSelector } from 'store/reducers/share/config/selectors';
import { modalOpen } from 'actions/modal';
import WidgetHeader from '../components/WidgetHeader';

const mapStateToProps = state => ({
  widget: getIndividualInfo(state),
  defaultUserAgent: defaultUserAgentSelector(state),
});

const mapDispatchToProps = {
  onEditWidget: widgetEditRequest,
  onMakeWidget: widgetMakeRequest,
  onCloseWidget: widgetClose,
  onModalOpen: modalOpen,
  onUpdateWidgetInfo: widgetUpdateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(WidgetHeader));
