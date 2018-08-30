import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { filterSelector } from 'store/personal/search/selectors';
import { searchSetFilter } from 'actions/search/index';
import { openPreference } from 'actions/status/index';
import SearchMenu from '../components/SearchMenu/index';

const mapStateToProps = state => ({
  filter: filterSelector(state),
});

const mapDispatchToProps = {
  onSetFilter: searchSetFilter,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchMenu));
