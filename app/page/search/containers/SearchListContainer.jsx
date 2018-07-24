import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { getSearchedWidget } from 'store/share/widgets/selectors';
import { keywordSelector } from 'store/personal/search/selectors';
import {
  closeTargetWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} from 'actions/widget';
import SearchList from '../components/SearchList';

const mapStateToProps = state => ({
  list: getSearchedWidget(state),
  keyword: keywordSelector(state),
});

const mapDispatchToProps = {
  onCloseWidget: closeTargetWidget,
  onShowWidget: showTargetWidget,
  onUpdateInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchList));
