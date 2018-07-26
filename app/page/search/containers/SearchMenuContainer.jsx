import { connect } from 'react-redux';
import toJS from 'utils/toJS';
import { filterSelector } from 'store/personal/search/selectors';
import { searchSetFilter } from 'actions/search';
import { openPreference } from 'actions/status';
import SearchMenu from '../components/SearchMenu';

const mapStateToProps = state => ({
  filter: filterSelector(state),
});

const mapDispatchToProps = {
  onSetFilter: searchSetFilter,
  onOpenPreference: openPreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SearchMenu));
