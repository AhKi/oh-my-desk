import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import {
  getSearchedWidget,
  getSelectedIndex,
} from 'store/share/widgets/selectors';
import { keywordSelector } from 'store/personal/search/selectors';
import {
  closeTargetWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} from 'actions/widget/index';
import {
  searchWidgetSelectIncrease,
  searchWidgetSelectDecrease,
  searchWindowHide,
} from 'actions/search/index';
import SearchList from '../components/SearchList/index';

const mapStateToProps = state => ({
  list: getSearchedWidget(state),
  keyword: keywordSelector(state),
  selectedIndex: getSelectedIndex(state),
});

const mapDispatchToProps = {
  onCloseWidget: closeTargetWidget,
  onHideWindow: searchWindowHide,
  onSelectIncrease: searchWidgetSelectIncrease,
  onSelectDecrease: searchWidgetSelectDecrease,
  onShowWidget: showTargetWidget,
  onUpdateInfo: updateTargetWidgetInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchList));
