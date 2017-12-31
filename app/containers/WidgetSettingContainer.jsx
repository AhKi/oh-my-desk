import { connect } from 'react-redux';
import WidgetSetting from 'components/WidgetSetting';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';
import { widgetListInfoStore } from 'store/widget/actions';
import { getWidgetInfo } from 'store/widget/selectors';

const mapStateToProps = state => ({
	list: getWidgetInfo(state),
});

const mapDispatchToProps = {
	onStoreWidgetInfo: widgetListInfoStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));