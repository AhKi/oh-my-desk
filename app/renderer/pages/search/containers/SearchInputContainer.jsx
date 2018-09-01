import { connect } from 'react-redux';
import toJS from 'renderer/components/toJS';
import { isTrayOpenSelector } from 'store/reducers/share/status/selectors';
import { filterSelector, keywordSelector } from 'store/reducers/personal/search/selectors';
import { searchChangeKeyword } from 'actions/search';
import SearchInput from '../components/SearchInput';

const mapStateToProps = state => ({
  filter: filterSelector(state),
  isTrayOpen: isTrayOpenSelector(state),
  keyword: keywordSelector(state),
});
const mapDispatchToProps = {
  onChangeKeyword: searchChangeKeyword,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchInput));
