import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import {
  getSearchedWidget,
  getSelectedIndex,
} from 'store/share/widgets/selectors';
import { keywordSelector } from 'store/personal/search/selectors';
import {
  closeTargetWidget,
  showTargetWidget,
  updateTargetWidgetInfo,
} from 'actions/widget';
import {
  searchWidgetSelectIncrease,
  searchWidgetSelectDecrease,
  searchWindowHide,
} from 'actions/search';
import SearchList from '../components/SearchList';

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
