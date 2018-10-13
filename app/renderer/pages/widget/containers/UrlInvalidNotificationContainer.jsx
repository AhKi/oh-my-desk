import { connect } from 'react-redux';
import { widgetUpdateInfo } from 'actions/widget';
import UrlInvalidNotification from '../components/UrlInvalidNotification';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onMakeWidget: widgetUpdateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlInvalidNotification);
