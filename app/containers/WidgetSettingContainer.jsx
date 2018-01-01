import { connect } from 'react-redux';
import WidgetSetting from 'components/WidgetSetting';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';
import {
	widgetListInfoStore,
	widgetListSelect,
} from 'store/widget/actions';
import {
	selectedIdSelector,
	getWidgetInfo,
} from 'store/widget/selectors';

const mapStateToProps = state => ({
	list: getWidgetInfo(state),
	selectedId: selectedIdSelector(state),
});

const mapDispatchToProps = {
	onStoreWidgetInfo: widgetListInfoStore,
	onSelectItem: widgetListSelect,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));