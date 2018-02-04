import { connect } from 'react-redux';
import WidgetSetting from 'components/WidgetSetting';
import GNBWrapper from 'components/GlobalNavigationBar/GNBWrapper';

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GNBWrapper(WidgetSetting));
