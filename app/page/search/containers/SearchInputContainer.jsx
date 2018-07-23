import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { isTrayOpenSelector } from 'store/share/status/selectors';
import { filterSelector, keywordSelector } from 'store/personal/search/selectors';
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
