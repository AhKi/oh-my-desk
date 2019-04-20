import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import {
  getSearchedWidget,
  getSelectedIndex,
} from 'store/reducers/share/identification/selectors';
import { keywordSelector } from 'store/reducers/personal/search/selectors';
import {
  widgetClose,
  widgetMakeRequest,
  widgetOpen,
  widgetUpdateInfo,
} from 'actions/widget';
import {
  searchWidgetSelectIncrease,
  searchWidgetSelectDecrease,
} from 'actions/search';
import { modalOpen } from 'actions/modal';
import SearchList from '../components/SearchList';

const mapStateToProps = state => ({
  list: getSearchedWidget(state),
  keyword: keywordSelector(state),
  selectedIndex: getSelectedIndex(state),
});

const mapDispatchToProps = {
  onCloseWidget: widgetClose,
  onMakeWidget: widgetMakeRequest,
  onModalOpen: modalOpen,
  onSelectIncrease: searchWidgetSelectIncrease,
  onSelectDecrease: searchWidgetSelectDecrease,
  onShowWidget: widgetOpen,
  onUpdateInfo: widgetUpdateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchList));
