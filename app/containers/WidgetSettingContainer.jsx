import { connect } from 'react-redux';
import WidgetSetting from 'components/WidgetSetting';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';
import {
	widgetListInfoStore,
	widgetListSelect,
} from 'store/widget/actions';
import {
	modalOpen,
	modalClose,
} from 'store/modal/actions';
import {
	selectedIdSelector,
	getWidgetInfo,
} from 'store/widget/selectors';

const mapStateToProps = state => ({
	list: getWidgetInfo(state),
	selectedId: selectedIdSelector(state),
});

const mapDispatchToProps = {
	onModalClose: modalClose,
	onModalOpen: modalOpen,
	onStoreWidgetInfo: widgetListInfoStore,
	onSelectItem: widgetListSelect,
};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));