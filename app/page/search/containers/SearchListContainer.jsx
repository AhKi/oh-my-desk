import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { getWidgetArray } from 'store/share/widgets/selectors';
import {
  closeTargetWidget,
  showTargetWidget,
} from 'actions/widget';
import SearchList from '../components/SearchList';

const mapStateToProps = state => ({
  list: getWidgetArray(state),
});
const mapDispatchToProps = {
  onCloseWidget: closeTargetWidget,
  onShowWidget: showTargetWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchList));
